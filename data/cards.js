const mongoCollections = require("../config/mongoCollections");
const cards = mongoCollections.cards;

var ObjectID = require('mongodb').ObjectID;

let exportedMethods = {
    createNewCard(question, answer) {
        return cards().then((cardsCollection) => {
            let newCard = {
                que: question,
                ans: answer
            };
            
            return cardsCollection.insertOne(newCard).then((newInsertInfo) => {
                return newInsertInfo.insertedId;
            }).then((newID) => {
                return this.getCardByID(newID);
            });
        });
    },

    getAllCards() {
        return cards().then((cardsCollection) => {
            return cardsCollection.find({}).toArray();
        });
    },

    getCardByID(id) {
        id = ObjectID(id);
        return cards().then((cardsCollection) => {
            return cardsCollection.findOne({_id: id}).then((cardInfo) => {
                if (!cardInfo) {
                    throw "Card not found";
                }          

                return cardInfo;
            })
        });
    },

    changeCardQuestion(id, newQue) {
        return this.getCardByID(id).then((currentCard) => {
            currentCard.que = newQue;

            let updateCommand = {
                $set: currentCard
            };

            return cards().then((cardsCollection) => {
                return cardsCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    return this.getCardByID(id);
                });
            });
        });
    },

    changeCardAnswer(id, newAns) {
        return this.getCardByID(id).then((currentCard) => {
            currentCard.ans = newAns;

            let updateCommand = {
                $set: currentCard
            };

            return cards().then((cardsCollection) => {
                return cardsCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    return this.getCardByID(id);
                });
            });
        });
    }
}

module.exports = exportedMethods;