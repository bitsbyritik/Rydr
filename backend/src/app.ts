import express, { Request, Response } from "express";
const app = express();

import * as dotenv from "dotenv";
import { connectToDatabase } from "./db/db";
import router from "./routes/routes";
import cookieParser from "cookie-parser";

dotenv.config(); 

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request,res: Response) => {
    res.send('Hello World!')
});

connectToDatabase();

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running at port:${port}`);
})