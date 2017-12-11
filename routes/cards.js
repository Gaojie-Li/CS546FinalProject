var express = require('express');
var router = express.Router();
const data = require("../data");
const cardsData = data.cards;

// get all cards info
router.get('/', function(req, res, next) {
    cardsData.getAllCards().then((cards) => {
        res.status(200).json(cards);
    }).catch((err) => {
        console.log(err.message);
        res.status(404).json({ error: 'Cards not found' });
    });
});

// get card by id
router.get('/:id', function(req, res, next) {
    cardsData.getCardByID(req.params.id).then((card) => {
        res.json(card);
    }).catch(() => {
        res.status(404).json({ error: "Card not found" });
    });
});

// create a new card
router.post("/", (req, res) => {
    cardsData.createNewCard('question', 'answer').then((card_id) => {
        res.status(200).json(card_id);
    }).catch((err) => {
        res.status(404).json({ error: err.message });
    });
});

module.exports = router;
  