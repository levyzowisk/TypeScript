import DbConnection from "../connection/DbConnection";
import express, { Router, Request, Response } from 'express';

import User from "../interfaces/user.interface";
class UserController {

    async create(req:Request<{}, {}, User>, res: Response) {
        try {   
            const data: User = req.body
            console.log(data);
            
            // await DbConnection.user.create({data})

        } catch(error) {

        }
    }
}

export default new UserController;