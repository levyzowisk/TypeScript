"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.loginValidate = exports.validate = void 0;
const user_schema_1 = require("../validators/user.schema");
const authService_1 = require("../service/authService");
const validate = async (req, res, next) => {
    const data = req.body;
    console.log(req.body);
    try {
        await user_schema_1.userSchema.validateAsync(data);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validate = validate;
const loginValidate = async (req, res, next) => {
    const data = req.body;
    try {
        console.log(data);
        await user_schema_1.loginUser.validateAsync(data);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.loginValidate = loginValidate;
const authUser = async (req, res, next) => {
    const authorization = req.headers.authorization;
    try {
        const validateToken = (0, authService_1.authUserVerify)(authorization);
        console.log(validateToken);
        res.status(200).json();
    }
    catch (error) {
        next(error);
    }
};
exports.authUser = authUser;
