var express = require('express');
var router = express.Router();
const data = require("../data");
const listsData = data.lists;
const cardsData = data.cards;

router.get('/', function (req, res, next) {
    listsData.getAllLists().then((lists) => {
        res.status(200).json(lists);
    }).catch((err) => {
        console.log(err.message);
        res.status(404).json({ error: 'List not found' });
    });
    // if (!req.user)
    //     res.redirect('/');

    // res.render('contents/lists', {
    //     title: 'Create new list'
    // });
});

router.get('/:id', function (req, res, next) {
    listsData.getListByID(req.params.id).then((list) => {
        res.render('contents/lists', {
            list_json: list
        });
    }).catch((err) => {
        console.log(err.message);
        res.status(404).json({
            error: "List not found"
        });
    });
});

router.post('/:id', function (req, res) {
    cardsData.createNewCard(req.body.question, req.body.answer).then((newCard) => {
        listsData.addCardToList(req.params.id, newCard._id).then((insertedCard) => {
            res.redirect('/lists/' + req.params.id);
        }).catch((err) => {
            res.status(404).json({
                error: err.message
            });
        });
    }).catch((err) => {
        res.status(404).json({
            error: err.message
        });
    });
});

router.post("/", (req, res) => {
    listsData.createNewlist(req.body.list_name, req.body.description, req.user.username).then((list_id) => {
        res.status(200).json(list_id);
    }).catch((err) => {
        res.status(404).json({
            error: err.message
        });
    });
});

module.exports = router;