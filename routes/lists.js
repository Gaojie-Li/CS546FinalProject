var express = require('express');
var router = express.Router();
const data = require("../data");
const listData = data.lists;

router.get('/', function(req, res, next) {
    listData.getAllLists().then((listsData) => {
        res.status(200).json(listsData);
    }).catch((err) => {
        console.log(err.message);
        res.status(404).json({ error: 'list not found' });
    });
});

router.get('/:id', function(req, res, next) {
    listData.getListByID(req.params.id).then((list) => {
        // res.render('index', { list_json: list });
        res.json(list);
    }).catch(() => {
        res.status(404).json({ error: "List not found" });
    });
});

router.post("/", (req, res) => {
    listData.createNewList('list1_test', 'usr1_test').then((list_id) => {
        res.status(200).json(list_id);
    }).catch((err) => {
        res.status(404).json({ error: err.message });
    });
});

module.exports = router;
  