import userSchema from "../validators/user.schema";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import User from "../interfaces/user.interface";

const validate = async ( req: Request<{},{}, User>, res: Response, next: NextFunction) => {
    const data: User = req.body;
    try {
        await userSchema.validateAsync(data);
        next()

    } catch(error) {
        next(error)
    }

}

export default validate;