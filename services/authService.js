const jwt = require("jsonwebtoken");

const generateJwtToken = (user_id, email) => {
    const privateTokenKey = process.env.TOKEN_KEY;
    return jwt.sign(
        { user_id, email },
        privateTokenKey,
        {
            expiresIn: "5h",
        }
    );
}

module.exports = { generateJwtToken };