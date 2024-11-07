import DbConnection from "../connection/DbConnection";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config();
const secret: any = process.env.SECRET_JWT;
export const loginUser = (email: string): string => {
    return jwt.sign({
        email: email,
        role: 'admin'
    }, secret,{expiresIn: '1h' } )
} 