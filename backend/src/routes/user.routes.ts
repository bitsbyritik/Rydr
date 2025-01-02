import {Router} from "express";
import { getUserProfile, loginUser, registerUser } from "../controllers/userController";
import { authUser } from "../middlewares/authMiddleware";

const router = Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.get('/profile', authUser, getUserProfile);

export default router;