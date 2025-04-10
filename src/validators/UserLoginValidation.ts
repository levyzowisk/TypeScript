import Joi from "joi";
import { ObjectSchema }from "joi";
import { AbstractValidation } from "./AbstractValidation";
import { userRegister } from "../interfaces/user.interface";

export class userRegisterValidation extends AbstractValidation {
    rules(): ObjectSchema {
        return Joi.object<userRegister, true, userRegister> ({
            first_name: Joi.string().replace(/[^\p{L} -]+/gu, ""),
            last_name: Joi.string().replace(/[^\p{L} -]+/gu, ""),
            email: Joi.string().email(),
            password: Joi.string()
        });
    }
}