"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.crypto = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto = (password, salts = 10) => {
    return bcrypt_1.default.hashSync(password, salts);
};
exports.crypto = crypto;
const comparePassword = (password, userPassword) => {
    return bcrypt_1.default.compareSync(password, userPassword);
};
exports.comparePassword = comparePassword;
// Opções de importação
// export {crypto, comparePassword}
