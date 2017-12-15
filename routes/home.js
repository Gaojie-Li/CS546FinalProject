var express = require('express');
var router = express.Router();
const data = require("../data");
const listsData = data.lists;

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.user) {
        res.render('contents/login', {
            title: 'Please Login to your account'
        });
    } else {

        listsData.getAllLists().then((lists) => {
            console.log(lists);
            res.render('contents/home', {
                title: 'Flashcards Plus',
                userinfo: req.user,
                listsInfo: lists
            });
        }).catch((err) => {
            console.log(err.message);
            res.status(404).json({
                error: 'List not found'
            });
        });

    }
});

module.exports = router;