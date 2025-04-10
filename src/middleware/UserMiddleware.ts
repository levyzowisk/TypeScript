import { Request, Response, NextFunction } from "express";
import { userRegisterValidation } from "../validators/UserLoginValidation";
import { userRegister } from "../interfaces/user.interface";
import { ApiError, NotFoundError } from "../error/ApiError";
import { NotFoundResponse } from "../error/ApiResponse";
import { error } from "console";

 class UserMiddleware {
    static validate = new userRegisterValidation();

    validateData(request: Request<any, any, userRegister>, response: Response, next: NextFunction) {
       try {
          
         UserMiddleware.validate.validate(request.body, response);
         next();
       } catch(error) {
            throw new NotFoundError();
       }
    }
}
export default new UserMiddleware();