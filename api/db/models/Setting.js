const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const SettingSchema = new mongoose.Schema({
    default_death: Number,
    default_tpd: Number,
    default_critical_illness: Number,
    default_early_critical_illness: Number,
    default_disability_income: Number,
    default_accidental_death: Number,
    default_accidental_disability: Number,
    default_accidental_reimbursement: Number,
    default_categories: Array
});

SettingSchema.plugin(autopopulate);

const Setting = mongoose.model("Setting", SettingSchema);
module.exports = Setting;
