var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.user){
        res.render('contents/login', {
            title: 'Please Login to your account'
        });
    }
    else{
        console.log(req.user);
        res.render('contents/home', {
            title: 'Flashcards Plus',
            userinfo: req.user
        });
    }
});

module.exports = router;