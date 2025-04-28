import { BadRequestError, BadTokenError, NotFoundError, TokenExpiredError as TokenExpiredErrorRaw } from "../error/ApiError";
import { userRegister } from "../interfaces/user.interface";
import UserRepository from "../repository/User.repository";
import { crypto } from "../utils/cryptoService";
import { sendMail } from "../utils/resendService";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/authService";
import { TokenExpiredError } from "jsonwebtoken";

export class UserService {
    static async registerUser(user: userRegister) {
        try {

            if(!await UserRepository.checkEmailIsVerify(user.email)) {
                throw new BadRequestError("Usuário já cadastrado, verique seu email") }
            else if(await UserRepository.checkEmailIsVerify(user.email)) {
                throw new BadRequestError("Usuário já cadastrado");
            }
            user.password = await crypto(user.password);
            
            const data = await UserRepository.saveUser(user);
            sendMail(user.email, user.first_name, generateAccessToken(), data.id);

        } catch(error) {
            throw error;
        }
    }

    static async verifyEmail(id: number | string, token: string) {
        try {
            // Lembrar de implementar o caminho infeliz, e caso o usuário não confirme o seu email dentro de 15 mim.
            verifyAccessToken(token);
            if(!await UserRepository.findById(Number(id))) throw new NotFoundError('Usuário não cadastrado no sistema!');

           UserRepository.verifiedEmail(Number(id))
           return generateRefreshToken();
            
        } catch(error) {
             if(error instanceof TokenExpiredError) throw new TokenExpiredErrorRaw();
             throw error;
        }
    }

    static async verifyEmailTokenExpired(id: number ,email: string) {
        try {
            
            console.log(await UserRepository.checkEmailEquals(id, email));
            
            if(!await UserRepository.checkEmailEquals(id, email)) throw new BadRequestError('Email não correspondente, ao id!');
            
            const response = await UserRepository.findById(id);
            console.log(response);
            
            return
            // sendMail(email, user.first_name, generateAccessToken(), data.id);

        } catch (error) {
            throw error;
        }
    }

    static async refreshToken (refreshToken: string) {
        try {
            if(!verifyRefreshToken(refreshToken)) throw new BadTokenError();
            return generateAccessToken();
        } catch (error) {
            if(error instanceof TokenExpiredError) throw new TokenExpiredErrorRaw();
            throw error;
        }
    }


}