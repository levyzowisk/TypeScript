import express, { Router, Request, Response } from 'express';
import DbConnection from '../connection/DbConnection';
import User from '../interfaces/user.interface';
import userSchema from '../validators/user.schema';
import Joi from 'joi';
const route: Router = express.Router();

// O express converte por padrão, a url ou parametro dela para string!
route.get('/user/:id', (req: Request<{id: string}>, res: Response) => {
    console.log(typeof(req.params.id));

    res.status(200).json({message: 'Deu certo mano ' + req.params.id})

});


route.post('/user', async (req: Request<{}, {}, User> , res: Response) => {

    const body = req.body

    try {
        // await userSchema.validate(body);
        // console.log(value);
        
      await userSchema.validateAsync(body);
      console.log(body)

    } catch(error) {
        if(error instanceof Joi.ValidationError) {
            console.log(error.details[0].message);
            
            // return res.status(400).json({})
        }
    }


    // No caso ele lançaria um erro caso o corpo não vinhece de acordo com a interface?
    // const data: User = body

     
    // const create = async (data: User) => {
    //     await DbConnection.user.create({data})
    // }

    // create(data)
        
}) 

export default route;
