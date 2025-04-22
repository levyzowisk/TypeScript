import { BadRequestError, NotFoundError } from "../error/ApiError";
import { userRegister } from "../interfaces/user.interface";
import UserRepository from "../repository/User.repository";
import { crypto } from "../utils/cryptoService";
import { sendMail } from "../utils/resendService";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/authService";
import { TokenExpiredError } from "jsonwebtoken";

export class UserService {
    static async registerUser(user: userRegister) {
        try {
            if(await UserRepository.findUnique(user.email)) throw new BadRequestError('Usuário já Cadastrado!');
            user.password = await crypto(user.password);
            
            const data = await UserRepository.saveUser(user);
            
            sendMail(user.email, user.first_name, generateAccessToken(), data.id);

        } catch(error) {
            throw error;
        }
    }

    static async verifyEmail(id: number | string, token: string) {
        try {
            verifyAccessToken(token);
            if(!await UserRepository.findById(Number(id))) throw new NotFoundError('Usuário não cadastrado no sistema!');

           await UserRepository.verifiedEmail(Number(id));
           return generateRefreshToken();
            
        } catch(error) {
             if(error instanceof TokenExpiredError) throw new BadRequestError('Token Expirado');
             throw error;
        }
    }

    static async refreshToken (refreshToken: string) {
        try {
            // Tenho que usar a classe adequada para a resposta do erro.
            if(!verifyRefreshToken(refreshToken)) throw new BadRequestError('Refresh Token expirado, faz o login novamente!');
            return generateAccessToken();
        } catch (error) {
            if(error instanceof TokenExpiredError) throw new BadRequestError('Token Expirado');
            throw error;
        }
    }
}