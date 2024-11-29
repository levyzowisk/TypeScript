"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUserVerify = exports.loginUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secret = process.env.SECRET_JWT;
const loginUser = (email) => {
    return jsonwebtoken_1.default.sign({
        email: email,
        role: 'admin'
    }, secret, { expiresIn: '1h' });
};
exports.loginUser = loginUser;
const authUserVerify = (token) => {
    // console.log(jwt.decode(token));
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.authUserVerify = authUserVerify;
