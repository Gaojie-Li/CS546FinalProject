const mongoCollections = require("../config/mongoCollections");
const list = mongoCollections.list;

let exportedMethods = {
    createNewList(name, authorName) {
        return list().then((listCollection) => {
            let newList = {
                name: name,
                author: authorName
            };
            
            return listCollection.insertOne(newList).then((newInsertInfo) => {
                return newInsertInfo.insertedId;
            }).then((newID) => {
                return this.getListByID(newID);
            });
        });
    },

    getAllLists() {
        return list().then((listCollection) => {
            return listCollection.find({}).toArray();
        });
    },

    getListByID(id) {
        return list().then((listCollection) => {
            return listCollection.findOne({ _id: id }).then((listInfo) => {
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

            return list().then((listCollection) => {
                return listCollection.updateOne({ _id: id }, updateCommand).then(() => {
                    return this.getListByID(id);
                });
            });
        });
    },

    // check correct or not
    addWordToList(id, word) {
        return this.getListByID(id).then((currentList) => {
            return list().then((listCollection) => {
                return listCollection.updateOne({ _id: id }, {
                    $addToSet: {
                        words: word
                    }
                }).then(() => {
                    return listCollection.findOne({ _id: id }).then((list) => {
                        return list.words[0];
                    });
                });
            });
        });
    }


}

module.exports = exportedMethods;