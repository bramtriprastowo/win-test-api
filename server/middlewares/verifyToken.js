const jwt = require("jsonwebtoken");
const { response } = require("../helpers/response");

const verifyAccessToken = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const accessToken = authHeader && authHeader.split(" ")[1];
      if (!accessToken) {
        response(res, 401, "Unauthorized", "Access token not found", []);
      } else {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_CODE);
        req.payload = decoded;
        console.log(authHeader);
        next();
      }
    } catch (error) {
      console.log(error);
      if (error && error.name === "JsonWebTokenError") {
        return response(res, 401, "Unauthorized", "Invalid access token", error);
      } else if (error && error.name === "TokenExpiredError") {
        return response(res, 401, "Unauthorized", "Access token expired", error);
      } else {
        return responseError500(res, error);
      }
    }
  };
  
  module.exports = { verifyAccessToken };