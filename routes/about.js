var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.user)
        res.redirect('/');
    
    res.render('contents/about', { title: 'About' });
});

module.exports = router;
