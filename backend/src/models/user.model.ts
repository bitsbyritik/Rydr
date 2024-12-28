import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        lastname: {
            type: String,
            minlength: 3,
            maxlength: 50,
        }
    },
    email: {
        type:String,
        required: true,
        unique: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    socketId:{
        type: String,
    }

})