import { Request, Response, RequestHandler } from "express";
import { userModel } from "../models/userModel";
import { userRegistrationSchema } from "../schemas";

export const registerUser: RequestHandler = async(req: Request, res: Response):Promise<void> => {
    try{
        const validateData  = userRegistrationSchema.safeParse(req.body);
        if(!validateData.success){
            res.status(400).json({
                message: 'Data validation failed',
                errors: validateData.error.errors,
            });
            return;
        }

        const existingUser = await userModel.findOne({email: validateData.data.email});
        if(existingUser){
            res.status(400).json({
                error: 'Email is alerady registered'
            });
            return;
        }

       
        const hashedPassword = await userModel.hashPassword(validateData.data.password);

        const newUser = await userModel.create({...validateData.data, password:hashedPassword});

        const token = newUser.generateAuthToken();

        res.status(201).json({
            message: 'User created successfully',
            token: token
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'User creation failed!'
        });
        return;
    }
}
