//imports
const express = require("express");
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const { generateJwtToken } = require("../services/authService");

let router = express.Router();

// Register
router.route("/register")
    .post(async (req, res) => {
        try {
            const { fname, lname, email, password } = req.body;
            if (!(email && password && fname && lname)) {
                res.status(400).send("All input is required");
            }

            const oldUser = await User.findOne({ email });
            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }

            //Encrypt user password
            encryptedUserPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                first_name: fname,
                last_name: lname,
                email: email.toLowerCase(), // sanitize
                password: encryptedUserPassword,
            });
            user.token = generateJwtToken(user._id, email);
            res.status(201).json(user);

        } catch (err) {
            res.status(500).send(err);
        }
    });

// Login
router.route("/login")
    .post(async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                return res.status(400).send("All input is required");
            }

            // Validate if user exist in our database
            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {
                user.token = generateJwtToken(user._id, email);
                return res.status(200).json(user);
            }

            res.status(400).send("Invalid Credentials");

        } catch (err) {
            res.status(500).send(err);
        }
    });


module.exports = router;