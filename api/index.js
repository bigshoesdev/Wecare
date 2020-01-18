require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const PORT = process.env.API_PORT;

// MongoDB Connection
const connection = require("./db/connection");
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
const MONGO_URI =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_PRODUCTION
        : process.env.MONGO_DEV;
connection(MONGO_URI);

const localStrategy = require("./passport/localStrategy");
const auth = require("./routes/auth");
const user = require("./routes/user");
const client = require("./routes/client");
const setting = require("./routes/setting");

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(cors());

passport.use("local-login", localStrategy);
app.use(express.static('./public'));

app.use("/welcome", (req, res) => {
    return res.send('Welcome to this API')
});
app.use("/auth", auth);
app.use("/users", user);
app.use("/clients", client);
app.use("/settings", setting);

server.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
