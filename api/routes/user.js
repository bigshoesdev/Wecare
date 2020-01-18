const express = require("express");
const router = express.Router();
const User = require("../db/models/User");
const Setting = require("../db/models/Setting");
const authorize = require("../utils/authorize.js");
const { hashPassword } = require("../utils/hashPassword");

var settingData = {};

Setting.findOne().exec().then(s => {
    settingData = s;
})

router.get("/", authorize, (req, res) => {
    User.find()
        .exec()
        .then(users => {
            return res.json(users);
        })
        .catch(err => {
            console.error("user.js: failed to lookup users", err);
            return res.status(500).json({
                error: err
            });
        });
});

router.get("/:id", authorize, (req, res) => {
    User.findById(req.params.id)
        .exec()
        .then(user => {
            if(user.financial && user.categories) {
                return res.json(user);
            }else {
                var financial = {};
                var categories = [];
                if(!user.financial) {
                    financial =  {
                        death: settingData.default_death,
                        tpd: settingData.default_tpd,
                        critical_illness: settingData.default_critical_illness,
                        early_critical_illness : settingData.default_early_critical_illness,
                        disability_income : settingData.default_disability_income,
                        accidental_death : settingData.default_accidental_death,
                        accidental_disability : settingData.default_accidental_disability,
                        accidental_reimbursement: settingData.default_accidental_reimbursement
                    }
                }else {
                    financial = user.financial;                     
                }

                if(user.categories.length == 0) {
                    categories = settingData.default_categories;
                }else{
                    categories = user.categories;
                }
                
                return res.json({
                    ...(user.toJSON()),  
                    financial: financial,
                    categories: categories
                })
            }
        })
        .catch(err => {
            console.error("user.js: failed to lookup user by ID", err);
            return res.status(500).json({
                error: err
            });
        });
});

router.post("/", authorize, (req, res) => {
    let data = req.body;
    hashPassword(data.password)
        .then(result => {
            let newUser = new User(req.body);
            newUser.password = result.hashedPassword;
            newUser
                .save()
                .then(user => {
                    return res.json(user);
                })
                .catch(err => {
                    console.error("user.js: failed to create user", err);
                    return res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(error => {
            console.error("user.js: failed to hash password", error);
            return res.status(500).json({
                error
            });
        });
});

router.put("/:id", authorize, async (req, res) => {
    let data = req.body;
    hashPassword(data.password)
        .then(result => {
            return updatePassword(req.params.id, result.hashedPassword);
        })
        .then(result => {
            if (result.error) {
                res.status(500).json({ error: result.error });
                throw result.error;
            }
            return res.json(result.doc);
        })
        .catch(error => {
            console.error("user.js: failed to hash password", error);
            return res.status(500).json({
                error
            });
        });
});

router.put("/:id/account", authorize, (req, res) => {
    let updateData = req.body;

    if(req.body.password) {
        hashPassword(req.body.password)
            .then(result => {
                updateData.password = result.hashedPassword;
    
                User.findByIdAndUpdate(req.params.id, {
                    $set: updateData
                })
                    .then(doc => {
                        return res.json(doc);
                    })
                    .catch(err => {
                        console.error("Failed to update account: ", err);
                        return res.status(500).json({ error: err });
                    });
            })
            .catch(error => {
                console.error("user.js: failed to hash password", error);
                return res.status(500).json({
                    error
                });
            });
    }else if(req.body.financial) {
        let updateData = req.body;

        User.findByIdAndUpdate(req.params.id, {
            $set: updateData
        })
        .then(doc => {
            return res.json(doc);
        })
        .catch(err => {
            console.error("Failed to update account: ", err);
            return res.status(500).json({ error: err });
        });
    } else if(req.body.categories) {
        let updateData = req.body;
        User.findByIdAndUpdate(req.params.id, {
            $set: updateData
        })
        .then(doc => {
            return res.json(doc);
        })
        .catch(err => {
            console.error("Failed to update account: ", err);
            return res.status(500).json({ error: err });
        });
    } 
});

function updatePassword(id, hashedPassword) {
    return User.findOneAndUpdate(
        { _id: id },
        { $set: { password: hashedPassword } },
        { new: true }
    )
        .then(doc => {
            return { doc };
        })
        .catch(err => {
            console.error("Failed to update password:", err);
            return { error: err };
        });
}

module.exports = router;
