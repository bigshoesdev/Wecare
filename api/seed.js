require("dotenv").config();
const { hashPassword } = require("./utils/hashPassword");
const User = require("./db/models/User");
const Setting = require("./db/models/Setting");

// MongoDB Connection
const connection = require("./db/connection");
const MONGO_URI =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_PRODUCTION
        : process.env.MONGO_DEV;
connection(MONGO_URI);

let data1 = {
    default_death: 100,
    default_tpd: 200,
    default_critical_illness: 100,
    default_early_critical_illness: 300,
    default_disability_income: 250,
    default_accidental_death: 250000,
    default_accidental_disability: 30000,
    default_accidental_reimbursement: 4000,
    default_categories: [
        'Active clients',
        'Inactive clients',
        'Cold prospects',
        'Warm prospects',
        'Friends'
    ]
}

let setting = new Setting(data1);

setting.save();

let data = {
    fullName: 'admin admin',
    username: 'admin',
    role: 'admin'
};

console.info('Seeding has started...\n\n');

hashPassword('admin')
    .then(result => {
        let newUser = new User(data);
        newUser.password = result.hashedPassword;
        newUser
            .save()
            .then(user => {
                process.on('exit', function(code) {
                    return console.log(`Success code ${code}! New admin details: `, {
                        username: user.username,
                        password: 'admin'
                    });
                });
                process.exit(0);
            })
            .catch(err => {
                process.on('exit', function(code) {
                    return console.error(`Error code ${code}!\n`, err.message);
                });
                process.exit(1);
            });
    })
    .catch(err => {
        process.on('exit', function(code) {
            return console.error(`Error code ${code}!\n`, err.message);
        });
        process.exit(1);
    });
