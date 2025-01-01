import {Router} from "express";
import { loginUser, registerUser } from "../controllers/userController";

const router = Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);

export default router;