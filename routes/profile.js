var express = require('express');
var usersData = require('../data/users');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('contents/profile', { title: 'User Profile' , userInfo: req.user});
});

module.exports = router;
