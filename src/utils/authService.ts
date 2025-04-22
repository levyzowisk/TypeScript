import dotenv from 'dotenv';
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

dotenv.config();
const secret: any = process.env.SECRET_JWT;

const generateAccessToken = (): string => {
    
    return jwt.sign({
        purpose: 'email_verification'
    }, secret,{
        issuer: "Aplication/Api",
        expiresIn: '15m',
        subject: "Testando Api",
        audience: 'user'
    });
} 

const verifyAccessToken = (token: string ): JwtPayload | string => {
    return jwt.verify(token, secret);
}

const generateRefreshToken = (): JwtPayload | string  => {

    return jwt.sign({
    }, 
    secret,
    {
        issuer: 'Aplication/Api',
        expiresIn: '7d',
        subject: 'refresh_token',
    }
) 
}

const verifyRefreshToken = (token: string): JwtPayload | string => {
    return jwt.verify(token, secret);
}


export {generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken}