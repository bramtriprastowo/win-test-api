const usersRouter = require("express").Router();
const usersController = require("../controllers/usersController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

usersRouter
    .get("/", usersController.getAllUsers)
    .post("/register", usersController.register)
    .post("/login", usersController.login)
    .get("/profile", verifyAccessToken, usersController.profile)

module.exports = usersRouter
