import mongoose from "mongoose";

export const connectToDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => {
        console.log('Connected to DB')
    })
    .catch(err => console.log(err)); 
}