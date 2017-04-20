module.exports = function(app, passport) {
    app.get('/loginhomepage', function(req, res) {
        res.render('loginhomepage.ejs')
    })

    app.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage') });
    })

    app.post('/login', passport.authenticate('local-login', {
          successRedirect : '/favourite',
          failureRedirect : '/login',
          failureFlash : true
      }))

    app.get('/signup', function(req, res) {

        res.render('signup.ejs', { message: req.flash('signupMessage') })
    })

      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/favourite',
          failureRedirect : '/signup',
          failureFlash : true
      }))

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/loginhomepage');
    })
}

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next()
    res.redirect('/loginhomepage')
}
