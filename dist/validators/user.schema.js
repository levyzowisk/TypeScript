"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    first_name: joi_1.default.string().min(1).required(),
    last_name: joi_1.default.string().min(1).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
    address_id: joi_1.default.number().allow(null),
    street: joi_1.default.string().max(60).required(),
    city: joi_1.default.string().max(70).required(),
    state: joi_1.default.string().max(40).required(),
    country: joi_1.default.string().max(30).required()
});
exports.userSchema = userSchema;
const loginUser = joi_1.default.object({
    email: joi_1.default.string().email().required()
});
exports.loginUser = loginUser;
