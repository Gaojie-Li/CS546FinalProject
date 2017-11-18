const mongoConnection = require("../config/mongoConnection");
const user = mongoConnection.user;

let exportedMethods = {
    // All user related database access functions
    registerNewUser(username, email, password) {
        return user().then((userCollection) => {
            let newUser = {
                username: username,
                email: email,
                password: password
            };

            return userCollection.insertOne(newUser).then((newInsertInfo) => {
                return newInsertInfo.insertedId;
            }).then((newID) => {
                return this.getUserByID(newID);
            })
        })
    },

    getUserByID(id) {
        return user().then((userCollection) => {
            return userCollection.findOne({ _id: id }).then((userProfile) => {
                if (!userProfile) {
                    throw "User not found";
                }

                return userProfile;
            })
        })
    }
}

module.exports = exportedMethods;