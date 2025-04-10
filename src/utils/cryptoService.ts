import bcrypt from 'bcrypt';
import { BadRequestError } from '../error/ApiError';

export const crypto = (password: string, salts : number = Number(process.env.SALT)) => {    
    // Optei por retorna a promisse sem estar resolvida.
    return bcrypt.hash(password,salts);
}

export const comparePassword = (password: string, userPassword: string) => {
    return bcrypt.compareSync(password,userPassword)
}

