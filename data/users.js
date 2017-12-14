const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.users;

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
    },

    getUserByUsername(username) {
        return user().then((userCollection) => {
            return userCollection.findOne({ username: username }).then((userProfile) => {
                if (!userProfile) {
                    throw 'User not found';
                }

                return userProfile;
            })
        })
    },

    validateUser(username, password) {
        return user().then((userCollection) => {
            return userCollection.findOne({ username: username }).then((userProfile) => {
                // var validation = 
                if (!userProfile) {
                    throw 'User not found.';
                }

                /* password doesn't match */
                if (password != userProfile.password) {
                    throw 'Invalid login';
                }

                return userProfile;
            })
        })
    }
}

module.exports = exportedMethods;