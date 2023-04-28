const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const { response, responseError500 } = require("../helpers/response");
const { generateAccessToken } = require("../helpers/generateToken");
const { uuid } = require("uuidv4");

const usersController = {
    getAllUsers: async (req, res) => {
        try {
            const result = await User.findAll();
            return response(res, 200, "Success", "Get all users success!", result);
        } catch (error) {
            return responseError500(res, error);
        }
    },
    register: async (req, res) => {
        try {
            const { email, fullname, gender, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const userId = uuid();
            let user = await User.create({
                userId,
                email,
                fullname,
                gender,
                password: hashedPassword
            });
            user = user.toJSON();
            delete user.password;
            return response(res, 201, "Success", "Create user success!", user);
        } catch (error) {
            if (error.name === "SequelizeUniqueConstraintError") {
                return response(res, 403, "Failed", error.errors[0].message)
            } else if (error.name === "SequelizeValidationError") {
                return response(res, 400, "Failed", error.errors[0].message)
            } else {
                return responseError500(res, error)
            }
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return response(res, 400, "Failed", "Email and password must be filled!")
            }
            let user = await User.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                return response(res, 404, "Failed", "Email not found!")
            }
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                return response(res, 403, "Failed", "Password is invalid!")
            }
            user = user.toJSON();
            delete user.password;
            const payload = {
                userId: user.userId,
                email: user.email,
            };
            const accessToken = generateAccessToken(payload);
            user.accessToken = accessToken;
            return response(res, 200, "Success", "Login success!", user);
        } catch (error) {
            return responseError500(res, error)
        }
    },
    profile: async (req, res) => {
        try {
            const { userId } = req.payload;
            let profile = await User.findOne({
                where: {
                    userId
                }
            });
            profile = profile.toJSON();
            delete profile.password;
            return response(res, 200, "Success", "Get profile success!", profile);
        } catch (error) {
            return responseError500(res, error)
        }
    }
}

module.exports = usersController