const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const findOrCreate = require("mongoose-findorcreate");
const autopopulate = require("mongoose-autopopulate");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        default: null
    },
    username: {
        type: String,
        index: { unique: true }
    },
    financial: {
        type: Object
    },
    categories: {
        type: Array
    },
    password: String,
    role: String,
    lastConnectionDate: Date,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.verifyPassword = function verifyPassword(password) {
    return bcrypt
        .compare(password, this.password)
        .then(res => res)
        .catch(err => err);
};

UserSchema.plugin(findOrCreate);
UserSchema.plugin(autopopulate);

UserSchema.set("toJSON", {
    transform: function(doc, ret, options) {
        if (ret.createdOn) {
            const options = {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            };
            ret.createdOn = ret.createdOn.toLocaleDateString("en-US", options);
        }

        return ret;
    }
});

UserSchema.virtual("normalDate").get(function() {
    return new Date(this.createdOn).toLocaleDateString("en-US");
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
