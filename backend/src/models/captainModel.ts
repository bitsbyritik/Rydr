import mongoose, {Schema, Document, Model} from "mongoose";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"

interface ICaptain extends Document {
    fullname: {
        firstname: string;
        lastname: string;
    };
    email: string;
    password: string;
    socketId?: string;
    status?: string;
    vehicle: {
        color:string;
        plate: string;
        capacity: string;
        vehicleType: string;
        location?: {
            lat?: number;
            lng?: number;
        }
    },
    generateAuthToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
}

interface ICaptainModel extends Model<ICaptain> {
    hashPassword: (password: string) => Promise<string>;
}

const captainSchema = new Schema<ICaptain>({
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
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId:{
        type:String
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required: true,
            minlength: [3, 'Color must be atleast 3 char long'],
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'Plate must be atleast 3 char long']
        },
        capacity: {
            type: Number,
            required: true,
            min:[1, 'Capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'suto']
        },
        location:{
            lat:{
                type: Number,
            },
            lng: {
                type: Number,
            }
        }
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET as string, {expiresIn: '24hr'});
    return token;
}

captainSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password:string) {
    return await bcrypt.hash(password, 10);
}

export const captainModel = mongoose.model<ICaptain, ICaptainModel>('captain', captainSchema);