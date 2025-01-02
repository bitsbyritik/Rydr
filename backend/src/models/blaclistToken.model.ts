import mongoose, { Schema } from "mongoose";

interface IBlackListToken extends Document {
    token: string;
    createdAt: Date;
}

const blackListTokenSchema = new Schema<IBlackListToken>({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
});

export const BlacklistToken = mongoose.model<IBlackListToken>('BlacklistToken', blackListTokenSchema);