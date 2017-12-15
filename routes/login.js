var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var usersData = require('../data/users');

var router = express.Router();

passport.use(new Strategy(
    async function (username, password, cb) {
        console.log('patpat');
        try {
            record = await usersData.validateUser(username, password);
            return cb(null, record);
        } catch (error) {
            return cb(null, false, {
                message: 'Incorrect Login info'
            });
        }
    }));

passport.serializeUser(function (user, callback) {
    callback(null, user.username)
});

passport.deserializeUser(function (username, callback) {
    usersData.getUserByUsername(username).then((user) => {
        callback(null, user);
    }, (reject) => {
        return callback(null, false, 'User not found');
    });
});

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.user)
        res.redirect('/home');
    else
        res.render('contents/login', {
            title: 'Please Login to your account'
        });
});

router.post('/', function (req, res, next) {
    console.log('in post');
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.redirect('login')
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('home');
        });
    })(req, res, next);
});

module.exports = router;