"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidate = exports.validate = void 0;
const user_schema_1 = require("../validators/user.schema");
const validate = async (req, res, next) => {
    const data = req.body;
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
        await user_schema_1.loginUser.validateAsync(data.email);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.loginValidate = loginValidate;
