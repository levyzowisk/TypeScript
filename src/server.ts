import  express, { Express, Response, Request, NextFunction  } from "express";
import route from "./routes/user";
import cors from "cors";
import { ApiError } from "./error/ApiError";
import dotenv from 'dotenv';

const app: Express = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = 3000;



app.use("/api", route);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ApiError) {
        console.log('oi entrei');
        
        ApiError.handle(err, res);
    } else {
        console.log('Erro interno no servidor');
        console.log(err);
        res.status(500).json(err.message);
    }
}) 

app.listen(port, () => {
    console.log("O servidor está rodando!");

})

