require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const compression = require("compression");
const componentRoutes = require("./routes/componentRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const cors = require("cors")

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({
    extended: true
}));


const auth = require("./middleware/auth");


// Status
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Auth Project!");
})

// Welcome
app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome to Auth Project!");
});

// Handles routes related to download via list of links
app.use("/component", componentRoutes);

// Handles routes related to download via list of links
app.use("/user", userRoutes);

module.exports = app;