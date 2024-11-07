import DbConnection from "../connection/DbConnection";
import express, { Router, Request, Response, NextFunction } from 'express';
import { crypto,comparePassword } from "../service/cryptoService";
import { loginUser } from "../service/authService";
import User from "../interfaces/user.interface";
import { error } from "console";
class UserController {

    async createLogin(req:Request<{}, {}, User>, res: Response, next: NextFunction) {
        try {   
            const data: User = req.body
            console.log(data);
            
            const passwordHash = crypto(data.password, 10)
            console.log(passwordHash);
            
            await DbConnection.user.create({
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: passwordHash,
                    address: {
                        create: {
                            street: data.street,
                            city: data.city,
                            state: data.state,
                            country: data.country
                        }
                    }
                }
            })
            res.status(201).json({message: 'Olá mundo!'})
        } catch(error) {
            next(error)
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            const userData = await DbConnection.user.findUnique({
                where: {
                    email: data.email
                },
                select: {
                    email: true,
                    password: true
                }
            })
            
            if(userData) {
                const authUser = comparePassword(data.password, userData.password)
                // return authUser;
            } else if (!userData) {
                throw error('Usuário não cadastrado')
            }

            const token = loginUser (data.email);
            res.status(201).json({token})
            
        }

        catch(error) {
            next(error)
        }
    }
    
}

export default new UserController;