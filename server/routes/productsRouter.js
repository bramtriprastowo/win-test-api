const productsRouter = require("express").Router();
const productsController = require("../controllers/productsController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

productsRouter
    .get("/", verifyAccessToken, productsController.getAllProducts)
    .get("/:id", verifyAccessToken, productsController.getDetailProduct)
    .post("/", verifyAccessToken, productsController.addProduct)
    .put("/:id", verifyAccessToken, productsController.updateProduct)
    .delete("/:id", verifyAccessToken, productsController.deleteProduct)

module.exports = productsRouter
