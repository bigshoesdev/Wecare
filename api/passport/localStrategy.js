const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/User");

const localStrategy = new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        session: false,
        passReqToCallback: true
    },
    (req, username, password, done) => {
        return User.findOne({ username })
            .exec()
            .then(user => {
                verifyUser(user, password, done);
            })
            .catch(err => {
                return done(err);
            });
    }
);

function verifyUser(user, password, done) {
    if (!user) {
        return done(null, false, { message: "No user found." });
    }
    return user.verifyPassword(password).then(result => {
        if (!result) {
            return done(null, false, { message: "Invalid login credentials" });
        }

        if (user) {
            user.lastConnectionDate = new Date();
            user.save((errUpdated, userUpdated) => {
                if (errUpdated) {
                    return done(null, false, { message: "Unexpected error occurred" });
                }

                return done(null, userUpdated);
            });
        }
    });
}

module.exports = localStrategy;
