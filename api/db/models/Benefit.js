const mongoose = require("mongoose");

const BenefitSchema = new mongoose.Schema({
    death: String,
    totalPermanentDisability: String,
    disabilityIncome: String,
    criticalIllness: String,
    earlyCriticalIllness: String,
    accidentalDeath: String,
    accidentalDisability: String,
    accidentalReimbursement: String,
    hospitalization: String,
    hospitalIncome: String,
    other: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Benefit = mongoose.model("Benefit", BenefitSchema);
module.exports = Benefit;
