var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var methodOverride = require('method-override')
var path = require('path')
var debug = require("debug")
var logger = require('morgan')
var helpers = require('express-helpers')
var app = express()
var router = express.Router()
var port = process.env.PORT || 4000
var MongoClient = require('mongodb').MongoClient
var passport = require('passport')
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var session = require('express-session')

var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/bootcampsearch'
mongoose.connect(dbURI)

var Course = require('./models/course')
var User = require('./models/user')

require('./config/passport')(passport);

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected')
})

app.use(express.static('public'))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(cookieParser())
helpers(app)

//required for passport
app.use(session({ secret: 'michaelfassbender' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require('./routes/routes.js')(app, passport)
require('./routes/adminroutes.js')(app, passport)

mongoose.Promise = global.Promise

var allCourse;

// NON RESTRICTED ROUTES //
//-- Get and post for homepage; non-restricted access --//
app.get('/', function(req, res){
 res.render('index.ejs', {
 course: ''})
})

app.post('/', function(req, res){
  console.log(req.body)
  Course.find({
    'subjectarea': req.body.subjectarea,
    'format': req.body.format,
    'deliverymode': req.body.deliverymode,
    'experiencelevel': req.body.experiencelevel
  }, function(err, course) {
    if (err) console.log(err)
    allCourse = course;
    console.log('allCourse = ' + course)
    res.redirect('/results')
    })
})

//-- Display short-view verion of search results according to parameters; non-restricted access --//

app.get('/results', function(req, res){
  res.render('results.ejs', {
    course: allCourse
    })
})

//-- Display full-view version of individual search result; non-restricted access --//

app.get('/results/:course_id', function(req, res) {
  Course.findById(req.params.course_id, function(err, course) {
    if (err)
      res.send(err)
      res.render('individualresults.ejs', {
        course: course
        })
  })
})

// ADMIN RESTRICTED ROUTES //
//-- Display full-view version of all records --//

app.get('/viewall', isLoggedIn, function(req, res){

  Course.find({}, function(err, course){
    if (err) console.log(err);
    allCourse = course;
    console.log('allCourse = ' + course)
    res.render('viewall.ejs', {
      course: allCourse
      })
    })
})


app.get('/addcourse', isLoggedIn, function(req, res){

  Course.find({}, function(err, course){
    if (err) console.log(err);
    allCourse = course;
    console.log('allCourse = ' + course)
    res.render('new.ejs', {
      course: allCourse
      })
    })
})

app.post('/addcourse', function(req, res) {
  console.log(req.body)

  Course.create(req.body, function (err, course) {
  if (err) console.log(err);
  console.log(course.title + ' created')
  course.save(function(err, course){
    if(err) console.log(err);
  })
  res.redirect('/viewall')
  })
})

app.post('/favourite/:course_id', function(req, res) {
  console.log(req.body)
  User.findByIdAndUpdate(req.user.id, {$push: {favourites: req.body.favourite}}, {new: true},function (err, favUser) {
       if (err) res.send(err)
       console.log('high')
       console.log('push fav course', favUser)
       res.render('favourite.ejs', {
         favUser: favUser
       })
     })
})


app.get('/update/:course_id', function(req, res){
Course.findById(req.params.course_id, function(err, course) {
   if (err)
     res.send(err)
     res.render('update.ejs', {
       course: course,
       course_id: req.params.course_id
       })
 })
 })

 app.put('/update/:course_id', function(req,res) {
   Course.findOneAndUpdate({
     _id: req.params.course_id
   }, {$set: {title: req.body.title}},
   {upsert: true},
   function(err, newCourse) {
     if(err) {
       console.log(err)
     } else {
       console.log(newCourse)
       res.redirect('/viewall')
     }
   }
 )
 })

app.get('/delete/:course_id', function(req, res){
Course.findByIdAndRemove(req.params.course_id, function(err, course) {
   if (err)
     res.send(err)
     res.render('delete.ejs', {
       course: course,
       course_id: req.params.course_id
       })
 })
 })

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next()
    res.redirect('/admin/adauthhome')}

app.listen(port, function () {
  console.log('app is running at ' + port)
})
