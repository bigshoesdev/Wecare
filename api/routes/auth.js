const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const Setting = require("../db/models/Setting");


var settingData = {};

Setting.findOne().exec().then(s => {
    settingData = s;
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local-login", (err, user, info) => {
        if (err) {
            console.error("auth.js: local-login failed", err);
            return res.status(500).json({
                errors: {
                    server: "A server error occurred",
                    error: err
                }
            });
        }

        if (!user) {
            return res.status(401).json(info);
        }

        const token = createToken(user);
        return res.json({token});
    })(req, res, next);
});

function createToken(user) {
    if(user.financial) {
        var u = user;
        
        return jwt.sign( {
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            role: user.role,
            financial: user.financial,
            categories: user.categories
        },
            secret,
            {
                expiresIn: "6h"
            }
        );
    }else {
        var u = {
            ...(user.toJSON()),  
            financial : {
                death: settingData.default_death,
                tpd: settingData.default_tpd,
                critical_illness: settingData.default_critical_illness,
                early_critical_illness : settingData.default_early_critical_illness,
                disability_income : settingData.default_disability_income,
                accidental_death : settingData.default_accidental_death,
                accidental_disability : settingData.default_accidental_disability,
                accidental_reimbursement: settingData.default_accidental_reimbursement
            }
        };
        return jwt.sign( {
            id: u._id,
            fullName: u.fullName,
            username: u.username,
            role: user.role,
            financial: u.financial,
            categories: u.categories
        },
            secret,
            {
                expiresIn: "6h"
            }
        );
    }
}

module.exports = router;
