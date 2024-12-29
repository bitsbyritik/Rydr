import mongoose, {Schema, Document} from "mongoose";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUser {
    fullname: {
        firstname: string;
        lastname: string;
    };
    email: string;
    password: string;
    socketId: string;
    generateAuthToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
    hashPassword: (password: string) => Promise<string>;
}

const userSchema = new Schema <IUser>({
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
        select: false,
    },
    socketId:{
        type: String,
    }

});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET as string);
    return token;
}

userSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password:string) {
    return await bcrypt.hash(password, 10);
}

export const userModel = mongoose.model<IUser>('user', userSchema);