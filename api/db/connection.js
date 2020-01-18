const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

/**
 * Connects mongoose to a MongoDB instance
 *
 * @param {string} uri
 */
mongoose.set('useFindAndModify', false);
const connection = uri => {
    mongoose
        .connect(
            uri,
            { useNewUrlParser: true }
        )
        .then(() => {
            console.log("mongoose connected!");
        })
        .catch(err => {
            console.error("mongoose connection failed:", err);
        });
};

module.exports = connection;
