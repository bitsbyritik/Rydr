import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { BlacklistToken } from "../models/blaclistToken.model";

interface DecodedToken {
    _id: string;
}

export const authUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

        if(!token){
            res.status(401).json({
                message: 'Unauthorized'
            });
            return;
        }
        
        const isBlacklisted = await BlacklistToken.findOne({token: token});
        if(isBlacklisted) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        const user = await userModel.findOne({_id: decoded._id})

        if(!user){
            res.status(404).json({
                message: 'User not found'
            });
            return ;
        }
        //@ts-ignore
        req.user = user;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Authorization Failed!'
        })
    }


}