import { Request, Response, RequestHandler } from "express";
import { userModel } from "../models/userModel";
import { userLoginSchema, userRegistrationSchema } from "../schemas";
import { BlacklistToken } from "../models/blaclistToken.model";

export interface AuthenticatedRequest extends Request {
    user?: any; // Replace `any` with your `IUser` type
}

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
                error: 'Email is already registered'
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

export const loginUser: RequestHandler = async(req:Request, res:Response):Promise<void> => {
    try {
        const validateData = userLoginSchema.safeParse(req.body);
        if(!validateData.success) {
            res.status(400).json({
                message: 'Data validation failed',
                errors: validateData.error.errors,
            });
            return;
        }

        const existingUser = await userModel.findOne({email: validateData.data.email}).select('+password');

        if(!existingUser){
            res.status(400).json({
                message: 'Email does not exist, Please signup first!',
            });
            return ;
        }
        
        const isMatch = await existingUser.comparePassword(validateData.data.password);

        if(!isMatch){
            res.status(404).json({
                message: 'Incorrect Password'
            })
        }

        const token = existingUser.generateAuthToken();

        res.status(200).json({
            messaged: 'Logged in successfully',
            token: token,
        })
        return ;

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Login failed!'
        });
        return;
    }
}

export const getUserProfile:RequestHandler = async(req:AuthenticatedRequest, res:Response) => {
    try {
        
        const user = req.user;;

        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return ;
        }
        
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Unable to fetch user profile"
        })
    }
}

export const logoutUser = async(req: Request, res: Response) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        // res.clearCookie('token'); 

        await BlacklistToken.create({token: token});
        res.status(200).json({
            message: 'User Logged out'
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