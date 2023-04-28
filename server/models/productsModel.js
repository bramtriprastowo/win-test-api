const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./usersModel");

const Product = sequelize.define('Product', {
    // Model attributes are defined here
    productId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    // Other model options go here
});

Product.belongsTo(User, {foreignKey: "userId"});

module.exports = Product