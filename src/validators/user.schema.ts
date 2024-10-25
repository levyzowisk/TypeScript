import Joi from "joi";
import User from "../interfaces/user.interface";

const userSchema = Joi.object<User>({
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    address_id: Joi.number().allow(null)

})

export default userSchema;