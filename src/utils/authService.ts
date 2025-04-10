import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config();
const secret: any = process.env.SECRET_JWT;

const registerUser = (email: string): string => {
    
    return jwt.sign({
        email: email,
        purpose: 'email_verification'
    }, secret,{expiresIn: '5m' } )
} 

const authUserVerify = (token:any ): any => {
    // console.log(jwt.decode(token));

    return jwt.verify(token,secret);
}

export {registerUser, authUserVerify}