import DbConnection from "../connection/DbConnection";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config()
export const loginUser = (password: string  , email: string): string => {

    jwt.sign()
} 