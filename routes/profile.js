var express = require('express');
var usersData = require('../data/users');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('profile', { title: 'User Profile' });
});

module.exports = router;
