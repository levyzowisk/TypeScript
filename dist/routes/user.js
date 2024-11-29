"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_user_middleware_1 = require("../middleware/validate.user.middleware");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const route = express_1.default.Router();
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
route.post('/user', validate_user_middleware_1.validate, user_controller_1.default.createLogin);
route.get('/test', (request, response) => {
    // console.log("oi");
    response.status(200).json('Eae manow');
});
route.post('/userlogin', validate_user_middleware_1.loginValidate, user_controller_1.default.loginUser);
route.get('/users', validate_user_middleware_1.authUser);
route.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json(err);
});
exports.default = route;
