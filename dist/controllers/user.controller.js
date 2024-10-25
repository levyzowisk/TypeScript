"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    async create(req, res) {
        try {
            const data = req.body;
            console.log(data);
            // await DbConnection.user.create({data})
        }
        catch (error) {
        }
    }
}
exports.default = new UserController;
