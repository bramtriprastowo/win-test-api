const Product = require("../models/productsModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response, responseError500 } = require("../helpers/response");
const { uuid } = require("uuidv4");

const productsController = {
    getAllProducts: async (req, res) => {
        try {
            const userId = req.payload.userId;
            const result = await Product.findAll({
                where: {
                    userId
                }
            });
            return response(res, 200, "Success", "Get all products success!", result);
        } catch (error) {
            return responseError500(res, error);
        }
    },
    getDetailProduct: async (req, res) => {
        try {
            const {id} = req.params;
            const result = await Product.findOne({
                where: {
                    productId: id
                }
            });
            return response(res, 200, "Success", "Get all products success!", result);
        } catch (error) {
            return responseError500(res, error);
        } 
    },
    addProduct: async (req, res) => {
        try {
            const {productName, stock} = req.body;
            const productId = uuid();
            const userId = req.payload.userId;
            const result = await Product.create({
                productId,
                productName,
                stock,
                userId
            })
            return response(res, 201, "Success", "Insert product success!", result);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                return response(res, 400, "Failed", error.errors[0].message)
            } else {
                return responseError500(res, error);
            }
        }
    },
    updateProduct: async (req, res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return response(res, 400, "Failed", "No ID selected!");
            }
            const productName = req.body.productName;
            const stock = req.body.stock || 0;
            const result = await Product.update({
                productName,
                stock
            }, {where: {
                productId: id
            }});
            return response(res, 200, "Success", "Update product success!", result)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                return response(res, 400, "Failed", error.errors[0].message)
            } else {
                return responseError500(res, error);
            }
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const {id} = req.params;
            if (!id) {
                return response(res, 400, "Failed", "No ID selected!");
            }
            await Product.destroy({
                where: {
                    productId: id
                }
            });
            return response(res, 200, "Success", "Delete product success!");
        } catch (error) {
            return responseError500(res, error);
        }
    }
}

module.exports = productsController