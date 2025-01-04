import { Request, RequestHandler, Response } from "express";
import { captainLoginSchema, captainRegistrationSchema } from "../schemas";
import { error } from "console";
import { captainModel } from "../models/captainModel";
import { AuthenticatedRequest } from "./userController";
import { BlacklistToken } from "../models/blaclistToken.model";

export const registerCaptain: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
        const validateData = captainRegistrationSchema.safeParse(req.body);

        if(!validateData.success){
            res.status(404).json({
                error: error,
                message: 'Invalid Data',
            });
            return;
        }

        const existingCaptain = await captainModel.findOne({email: validateData.data.email});

        if(existingCaptain){
            res.status(400).json({
                message: 'This email is already registered as captain',
            });
            return;
        }

        const hashedPassword = await captainModel.hashPassword(validateData.data.password);

        const newCapatin = await captainModel.create({...validateData.data, password:hashedPassword});

        const token = newCapatin.generateAuthToken();

        res.status(201).json({
            message: 'Captain created successfully',
            token: token
        });

        return ;

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Captain registration failed!' 
        });
        return;
    }
}

export const loginCaptain: RequestHandler = async(req:Request, res: Response): Promise<void> => {
    try {
        const validateData = captainLoginSchema.safeParse(req.body);

        if(!validateData.success){
            res.status(404).json({
                err: validateData.error,
                message: 'Invalid Input Data',
            });
            return;
        }

        const existingCaptain = await captainModel.findOne({email: validateData.data.email}).select('+password');
        if(!existingCaptain){
            res.status(400).json({
                messgae: 'Email is not registered, Please signup!'
            });
            return ;
        }

        const isMatch = await existingCaptain.comparePassword(validateData.data.password);
        if(!isMatch){
            res.status(404).json({
                message: "Incorrect Password",
            });
            return ;
        }

        const token = existingCaptain.generateAuthToken();

        res.status(201).json({
            message: 'Logged In succesfully',
            token: token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Login Failed',
        });
        return ;

    }
}

export const getCaptainProfile:RequestHandler = async(req: AuthenticatedRequest, res:Response) => {
    try {
        const captain = req.captain;

        if(!captain) {
            res.status(404).json({
                message: 'Capatin not found'
            });
            return ;
        }

        res.status(200).json(captain);
    }  catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Unable to fetch user profile",
        });
        return ;
    }
}

export const logoutCaptain = async(req: Request, res: Response) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        res.clearCookie('token'); 

        await BlacklistToken.create({token: token});
        res.status(200).json({
            message: 'Captain Logged out'
        });
        return;   

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Logout Failed!'
        });
        return ;
    }
}