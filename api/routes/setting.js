const express = require("express");
const router = express.Router();
const Setting = require("../db/models/Setting");

const authorize = require("../utils/authorize.js");

router.get("/", authorize, (req, res) => {
  Setting.findOne()
    .exec()
    .then(setting => {
      return res.json(setting);
    })
    .catch(err => {
      console.error("setting.js: failed to lookup setting", err);
      return res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
