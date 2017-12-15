const mongoCollections = require("../config/mongoCollections");
const lists = mongoCollections.lists;
const cards = mongoCollections.cards;

var ObjectID = require('mongodb').ObjectID;

let exportedMethods = {
    createNewlist(name, description, authorName) {
        return lists().then((listsCollection) => {
            let newList = {
                name: name,
                description: description,
                author: authorName,
                cards: {}
            };

            return listsCollection.insertOne(newList).then((newInsertInfo) => {
                return newInsertInfo.insertedId;
            }).then((newID) => {
                return this.getListByID(newID);
            });
        });
    },

    getAllLists() {
        return lists().then((listsCollection) => {
            return listsCollection.find({}).toArray();
        });
    },

    getListByID(id) {
        id = ObjectID(id);

        return lists().then((listsCollection) => {
            return listsCollection.findOne({
                _id: id
            }).then((listInfo) => {
                if (!listInfo) {
                    throw "List not found";
                };

                // TODO: Handle cards in function or just store in list
                return cards().then((cardsCollection) => {
                    var list_cards = {};
                    var pms = [];
                    for (card_id in listInfo.cards) {
                        pms.push(
                            cardsCollection.findOne({
                                _id: listInfo.cards[card_id]
                            }).then((card) => {
                                list_cards[card.que] = card.ans;
                            })
                        )
                    };
                    return Promise.all(pms).then(() => {
                        listInfo['cardsInfo'] = list_cards;
                        return listInfo;
                    });
                });

            })
        })
    },

    changeListName(id, newName) {
        return this.getListByID(id).then((currentList) => {
            currentList.name = newName;

            let updateCommand = {
                $set: currentList
            };

            return lists().then((listsCollection) => {
                return listsCollection.updateOne({
                    _id: id
                }, updateCommand).then(() => {
                    return this.getListByID(id);
                });
            });
        });
    },

    // check correct or not
    // TODO:
    // need to change return
    addCardToList(id, card_id) {
        id = ObjectID(id);
        return this.getListByID(id).then((currentList) => {
            return lists().then((listsCollection) => {
                return listsCollection.updateOne({
                    _id: id
                }, {
                    $addToSet: {
                        cards: card_id
                    }
                }).then(() => {
                    return listsCollection.findOne({
                        _id: id
                    }).then((list) => {
                        return list.cards[0];
                    });
                });
            });
        });
    }

}

module.exports = exportedMethods;