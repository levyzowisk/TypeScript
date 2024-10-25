import  express, { Express, Response, Request  } from "express";
import route from "./routes/user";

const app: Express = express();

app.use(express.json())
const port = 3000;

app.use("/api", route);

app.listen(port, () => {
    console.log("O servidor está rodando!");

})

