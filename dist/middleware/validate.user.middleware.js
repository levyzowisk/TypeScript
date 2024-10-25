"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("../validators/user.schema"));
const validate = async (req, res, next) => {
    const data = req.body;
    try {
        await user_schema_1.default.validateAsync(data);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = validate;
