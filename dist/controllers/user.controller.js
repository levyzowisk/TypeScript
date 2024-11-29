"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbConnection_1 = __importDefault(require("../connection/DbConnection"));
const cryptoService_1 = require("../service/cryptoService");
const authService_1 = require("../service/authService");
const console_1 = require("console");
class UserController {
    async createLogin(req, res, next) {
        try {
            console.log(req.body + 'aqui');
            const data = req.body;
            console.log(data);
            const passwordHash = (0, cryptoService_1.crypto)(data.password, 10);
            console.log(passwordHash);
            await DbConnection_1.default.user.create({
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: passwordHash,
                    // address: {
                    //     create: {
                    //         street: data.street,
                    //         city: data.city,
                    //         state: data.state,
                    //         country: data.country
                    //     }
                    // }
                }
            });
            res.status(201).json({ message: 'Olá mundo!' });
        }
        catch (error) {
            next(error);
        }
    }
    async loginUser(req, res, next) {
        try {
            const data = req.body;
            const userData = await DbConnection_1.default.user.findUnique({
                where: {
                    email: data.email
                },
                select: {
                    email: true,
                    password: true
                }
            });
            if (userData) {
                const authUser = (0, cryptoService_1.comparePassword)(data.password, userData.password);
                // return authUser;
            }
            else if (!userData) {
                throw (0, console_1.error)('Usuário não cadastrado');
            }
            const token = (0, authService_1.loginUser)(userData.email);
            res.status(201).json({ token });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new UserController;
