const express = require("express");
const usersRouter = require("./usersRouter");
const productsRouter = require("./productsRouter");
const mainRouter = express.Router();

mainRouter
    .use("/users", usersRouter)
    .use("/products", productsRouter)

module.exports = mainRouter