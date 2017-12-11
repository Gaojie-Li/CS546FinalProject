const mongoCollections = require("../config/mongoCollections");
const lists = mongoCollections.lists;

let exportedMethods = {
    createNewlist(name, authorName) {
        return lists().then((listsCollection) => {
            let newList = {
                name: name,
                author: authorName
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
        return lists().then((listsCollection) => {
            return listsCollection.findOne({ _id: id }).then((listInfo) => {
                if (!listInfo) {
                    throw "List not found";
                }

                return listInfo;
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
                return listsCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    return this.getListByID(id);
                });
            });
        });
    },

    // check correct or not
    // TODO:
    // need to change latter
    addCardToList(id, card) {
        return this.getListByID(id).then((currentList) => {
            return lists().then((listsCollection) => {
                return listsCollection.updateOne({ _id: id }, {
                    $addToSet: {
                        words: word
                    }
                }).then(() => {
                    return listsCollection.findOne({ _id: id }).then((list) => {
                        return list.words[0];
                    });
                });
            });
        });
    }


}

module.exports = exportedMethods;