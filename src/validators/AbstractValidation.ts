import { Response } from "express";
import Joi, { object } from "joi";
import { BadRequestResponse } from "../error/ApiResponse";

export abstract class AbstractValidation {
    abstract rules(): Joi.ObjectSchema;

    validate(data: object, res: Response):object {
        const schema = this.rules();

        const {error, value} = schema.validate(data);
        if(error) {
            throw new BadRequestResponse(`Campos inválidos, causa: ${error.cause}`).send(res);
        }
        console.log('Esquema Válido');
        
        return value;
    }
}