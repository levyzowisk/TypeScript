import  express, { Express, Response, Request  } from "express";
import route from "./routes/user";
import cors from "cors";

const app: Express = express();

app.use(express.json())
app.use(cors())
const port = 3000;

app.use("/api", route);

app.listen(port, () => {
    console.log("O servidor está rodando!");

})

