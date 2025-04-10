import { BadRequestError, NotFoundError } from "../error/ApiError";
import { userRegister } from "../interfaces/user.interface";
import UserRepository from "../repository/User.repository";
import { crypto } from "../utils/cryptoService";
import { sendMail } from "../utils/resendService";
import { registerUser } from "../utils/authService";
import { authUserVerify } from "../utils/authService";
import { TokenExpiredError } from "jsonwebtoken";

export class UserService {
    static async registerUser(user: userRegister) {
        try {
            if(await UserRepository.findUnique(user.email)) throw new BadRequestError('Usuário já Cadastrado!');
            user.password = await crypto(user.password);
            
            const data = await UserRepository.saveUser(user);
            
            sendMail(user.email, user.first_name, registerUser(user.email), data.id);

        } catch(error) {
            throw error;
        }
    }

    static async verifyEmail(id: number | string, token: string) {
        try {
            authUserVerify(token);
            if(!await UserRepository.findById(Number(id))) throw new NotFoundError('Usuário não cadastrado no sistema!');

           await UserRepository.verifiedEmail(Number(id));
           return;
            
        } catch(error) {
             if(error instanceof TokenExpiredError) throw new BadRequestError('Token Expirado');
        }
    }
}