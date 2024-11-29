import DbConnection from "../connection/DbConnection";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config();
const secret: any = process.env.SECRET_JWT;

const loginUser = (email: string): string => {
    
    return jwt.sign({
        email: email,
        role: 'admin'
    }, secret,{expiresIn: '1h' } )
} 

const authUserVerify = (token:any ): any => {
    // console.log(jwt.decode(token));

    return jwt.verify(token,secret)
}

export {loginUser,authUserVerify}