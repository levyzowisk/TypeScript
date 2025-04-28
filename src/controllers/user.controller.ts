import express, { Router, Request, Response, NextFunction } from 'express';
import { crypto,comparePassword } from "../utils/cryptoService";
import {userRegister} from "../interfaces/user.interface";
import { UserService } from "../service/User.service";

class UserController {

    async createLogin(req:Request<{}, {}, userRegister>, res: Response, next: NextFunction) {
        try {
            await UserService.registerUser(req.body);
            res.status(201).json();
        } catch(error) {
            next(error);
        }
    }

    async verifyEmail(req: Request<{}, {}, {}, {token: string, userId: number}>, res: Response, next: NextFunction) {
        try {
            const refreshToken = await UserService.verifyEmail(req.query.userId, req.query.token);
            res.status(200).json(refreshToken);
        } catch(error) {
            next(error);
        }
    }
    
    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            // Não é uma boa prática usar essas assersação de tipo que fiz aqui, pois pode ter caso que o refresh token, venha vazio, undefined.
            const acessToken = await UserService.refreshToken((req.headers.authorization as string));
            res.status(200).json(acessToken);
        } catch(error) {
            next(error);
        }
    }

    // Usar o picke ou omen pra omitir algumas propriedades
    async tokenExpired(req: Request<{}, {}, {email: string}, {userId: number}>, res: Response, next: NextFunction) {
        try {
            await UserService.verifyEmailTokenExpired(req.query.userId, req.body.email);
        } catch(error) {
            next(error);
        }
    }

    // async loginUser(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const data = req.body
    //         const userData = await DbConnection.user.findUnique({
    //             where: {
    //                 email: data.email
    //             },
    //             select: {
    //                 email: true,
    //                 password: true
    //             }
    //         })
            
    //         if(userData) {
    //             const authUser = comparePassword(data.password, userData.password)
    //             // return authUser;
    //         } else if (!userData) {
    //             throw error('Usuário não cadastrado')
    //         }

    //         const token = loginUser(userData.email);
    //         res.status(201).json({token})
            
    //     }

    //     catch(error) {
    //         next(error)
    //     }
    // }

    
}  

export default new UserController;