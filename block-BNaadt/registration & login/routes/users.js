var express = require('express');
var router = express.Router();

var User = require('../model/Users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users');
});

router.get('/register', (req, res, next) => {
  var error = req.flash('error')[0];
  console.log(error);
  res.render('register', { error });
});

router.post('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (!email || !password) {
      req.flash('error', 'Email must be unique');
      return res.redirect('/users/register');
    }else{
      return next();
    }
  })
});

router.get('/login', (req, res, next) => {
  var error = req.flash('error')[0];
  console.log(error);
  res.render('login', { error });
});

router.post('/login', (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    req.flash('error', 'Email is not registered');
    return res.redirect('/users/login')
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    // no user
    if (!user) {
      return res.redirect('/users/login');
    }
    // compare password
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        req.flash('error', 'password is wrong');
        return res.redirect('/users/login')
      }
      // persist logged in user information
      req.session.userId = user.id;
      res.redirect('/users');
    })
  })
})
module.exports = router;
