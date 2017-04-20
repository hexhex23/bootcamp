module.exports = function(app, passport) {
    app.get('/admin/adauthhome', function(req, res) {
        res.render('adauthhome.ejs')
    })

    app.get('/admin/adlogin', function(req, res) {

        res.render('adlogin.ejs', { message: req.flash('loginMessage') })
    })

    app.post('/admin/adlogin', passport.authenticate('local-adminlogin', {
          successRedirect : '/admin/adprofile',
          failureRedirect : '/admin/adlogin',
          failureFlash : true
      }))

    app.get('/admin/adsignup', function(req, res) {

        res.render('adsignup.ejs', { message: req.flash('signupMessage') })
    })

      app.post('/admin/adsignup', passport.authenticate('local-adminsignup', {
          successRedirect : '/admin/adprofile',
          failureRedirect : '/admin/adlogin',
          failureFlash : true
      }))

    app.get('/admin/adprofile', isLoggedInAdmin, function(req, res) {
        res.render('adprofile.ejs', {
            user : req.user
        })
    })

    app.get('/admin/logout', function(req, res) {
        req.logout();
        res.redirect('/admin/adauthhome');
    })
}

function isLoggedInAdmin(req, res, next) {

    if (req.isAuthenticated())
        return next()
    res.redirect('/admin/adauthhome')
}
