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

var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/bootcampsearch'
mongoose.connect(dbURI)

var Course = require('./models/course')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log('really really connected')
})

app.use(express.static('public'))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
helpers(app)

mongoose.Promise = global.Promise

var allCourse;

app.get('/addcourse', function(req, res){

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
  res.redirect('/addcourse')
  })
})

app.get('/', function(req, res){
 res.render('index.ejs', {
 course: ''})
})

app.post('/', function(req, res){
  console.log(req.body)
  Course.find({
    'deliverymode': req.body.deliverymode
  }, function(err, course) {
    if (err) console.log(err)
    allCourse = course;
    console.log('allCourse = ' + course)
    res.render('results.ejs', {
      course: allCourse
      })
    })
})

app.get('/test', function(req, res){
 res.render('test.ejs')
})

// app.get('/', function(req, res){
//   Course.find({ 'deliverymode': 'Online'}, function(err, course){
//     if (err) console.log(err)
//     allCourse = course;
//     console.log('allCourse = ' + course)
//     res.render('index.ejs', {
//       course: allCourse
//       })
//     })
// })


app.listen(port, function () {
  console.log('app is running at ' + port)
})
