import express, { Router, Request, Response, NextFunction } from 'express';
import DbConnection from '../connection/DbConnection';
import User from '../interfaces/user.interface';
import {userSchema} from '../validators/user.schema';
import Joi from 'joi';
import {validate, loginValidate} from '../middleware/validate.user.middleware';
import UserController from '../controllers/user.controller';

const route: Router = express.Router();

// O express converte por padrão, a url ou parametro dela para string!
// route.get('/user/:id', (req: Request<{id: string}>, res: Response) => {
//     console.log(typeof(req.params.id));

//     res.status(200).json({message: 'Deu certo mano ' + req.params.id})

// });

// route.post('/user', async (req: Request<{}, {}, User> , res: Response) => {

//     const body: User  = req.body;

//     try {
//         // await userSchema.validate(body);
//         // console.log(value);
        
//       await userSchema.validateAsync(body);
//       console.log(body)

//     } catch(error) {
//         if(error instanceof Joi.ValidationError) {
//             console.log(error.details[0].message);
            
//             // return res.status(400).json({})
//         }
//     }


//     // No caso ele lançaria um erro caso o corpo não vinhece de acordo com a interface?
//     // const data: User = body

     
//     // const create = async (data: User) => {
//     //     await DbConnection.user.create({data})
//     // }

//     // create(data)
        
// }) 

route.post('/user', validate ,UserController.createLogin);

route.post('/userlogin', loginValidate, UserController.loginUser)

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(400).json(err); 
        
});

export default route;
