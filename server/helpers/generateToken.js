const jwt = require("jsonwebtoken");
const generateAccessToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_CODE, {
      expiresIn: "900s",
    });
    return accessToken;
};

module.exports = {generateAccessToken}