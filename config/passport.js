var LocalStrategy   = require('passport-local').Strategy;

var User = require('../models/user');
var Admin = require('../models/admin');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    })

    passport.serializeUser(function(admin, done) {
        done(null, admin.id);
    })

    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, admin) {
            done(err, admin);
        })
    })

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {

        process.nextTick(function() {

        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                var newUser = new User();

                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                })
            }

        })

        })

    }))

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},

function(req, email, password, done) {
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err)
            return done(err)

        if (!user)
            return done(null, false, req.flash('loginMessage', 'No user found.'))

        if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))

        return done(null, user)
      })
}

))

passport.use('local-adminsignup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
},
function(req, email, password, done) {

    process.nextTick(function() {

    Admin.findOne({ 'local.email' :  email }, function(err, admin) {
        if (err)
            return done(err)

        if (admin) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

            var newAdmin = new Admin();

            newAdmin.local.email = email;
            newAdmin.local.password = newAdmin.generateHash(password);

            newAdmin.save(function(err) {
                if (err)
                    throw err;
                return done(null, newAdmin);
            })
        }

    })

    })

}))

passport.use('local-adminlogin', new LocalStrategy({
usernameField : 'email',
passwordField : 'password',
passReqToCallback : true
},

function(req, email, password, done) {
  Admin.findOne({ 'local.email' :  email }, function(err, admin) {
    if (err)
        return done(err)

    if (!admin)
        return done(null, false, req.flash('loginMessage', 'No user found.'))

    if (!admin.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'))

    return done(null, admin)
  })
}

))


}