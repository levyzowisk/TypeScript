import Joi from "joi";
import User from "../interfaces/user.interface";
import { log } from "console";
const userSchema = Joi.object<User>({    
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // address_id: Joi.number().allow(null),
    // street: Joi.string().max(60).required(),
    // city: Joi.string().max(70).required(),
    // state: Joi.string().max(40).required(),
    // country: Joi.string().max(30).required()
})

const loginUser = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.any()
}
)

export{userSchema, loginUser};