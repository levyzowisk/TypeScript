"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { PrismaClient } from "../../node_modules/.prisma/client/index";
const client_1 = require("@prisma/client");
class DbConnection {
    constructor() { }
    static getConnection() {
        return new client_1.PrismaClient();
    }
}
exports.default = DbConnection.getConnection();
