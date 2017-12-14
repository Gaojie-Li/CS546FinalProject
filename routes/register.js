var express = require('express');
var bodyParser = require('body-parser');
var usersData = require('../data/users');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('contents/register', { title: 'Register new account' });
});

// POST method
router.post('/', async (req, res) => {
    // to get content: req.body.email/username/password
    var newUser = await usersData.registerNewUser(req.body.username, req.body.email, req.body.password);
    res.redirect('/login');
});

module.exports = router;