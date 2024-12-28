import express, { Request, Response } from "express";
const app = express();

import * as dotenv from "dotenv";
import { connectToDatabase } from "./db/db";
dotenv.config(); 


const port = process.env.PORT;

app.get('/', (req: Request,res: Response) => {
    res.send('Hello World!')
});

connectToDatabase();


app.listen(port, () => {
    console.log(`Server is running at port:${port}`);
})