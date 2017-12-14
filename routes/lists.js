var express = require('express');
var router = express.Router();
const data = require("../data");
const listsData = data.lists;

router.get('/', function(req, res, next) {
    listsData.getAllLists().then((lists) => {
        res.status(200).json(lists);
    }).catch((err) => {
        console.log(err.message);
        res.status(404).json({ error: 'List not found' });
    });
});

router.get('/:id', function(req, res, next) {
    listsData.getListByID(req.params.id).then((list) => {
        // res.render('index', { list_json: list });
        res.render('contents/list', {list_json: list});
        // res.json(list);
    }).catch((err) => {
        console.log(err.message);
        res.status(404).json({ error: "List not found" });
    });
});

router.post("/", (req, res) => {
    listsData.createNewList('list1_test', 'usr1_test').then((list_id) => {
        res.status(200).json(list_id);
    }).catch((err) => {
        res.status(404).json({ error: err.message });
    });
});

module.exports = router;
  