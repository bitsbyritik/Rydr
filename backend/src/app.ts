import express, { Request, Response } from "express";
const app = express();

import * as dotenv from "dotenv";
dotenv.config(); 


const port = 3000;

app.get('/', (req: Request,res: Response) => {
    res.send('Hello World!')
});



app.listen(port, () => {
    console.log(`Server is running at port:${port}`);
})