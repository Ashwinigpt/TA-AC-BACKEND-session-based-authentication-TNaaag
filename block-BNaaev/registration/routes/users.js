var express = require('express');
var router = express.Router();

var User = require('../model/Users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.get('/register', (req, res, next) => {
  User.create(req.body, (err, user) => {
    if(err) return next(err);
    res.redirect('/users/login');
  })
})

module.exports = router;
