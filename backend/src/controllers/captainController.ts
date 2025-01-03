import { Request, RequestHandler, Response } from "express";
import { captainRegistrationSchema } from "../schemas";
import { error } from "console";
import { captainModel } from "../models/captainModel";
import { userModel } from "../models/userModel";

export const registerCaptain: RequestHandler = async(req: Request, res: Response): Promise<void> => {
    try {
        const validateData = captainRegistrationSchema.safeParse(req.body);

        if(!validateData.success){
            res.status(404).json({
                error: error,
                message: 'Inavlid Data',
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

        const existingUser = await userModel.findOne({email: validateData.data.email});

        if(existingUser){
            res.status(400).json({
                message: 'This email is already registered as user',
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