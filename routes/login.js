var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
var session = require('express-session');

var usersData = require('../data/users');

var router = express.Router();

router.use(flash());
router.use(session({ secret: "tada", resave: false, saveUninitialized: false }));

/******************** PASSPORT FUNCTIONALITIES ******************/
passport.use(new LocalStrategy(
    { passReqToCallback: true },
    function (req, username, password, done) {
        usersData.validateUser(username, password).then((user) => {
            return done(null, user);
        }, (reject) => {
            return done(null, false, 'Invalid username or password.');
        });
    }
));

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
    res.render('login', { title: 'Please Login to your account' });
});

/* POST submit login info */
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = router;
