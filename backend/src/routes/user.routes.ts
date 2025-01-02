import {Router} from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/userController";
import { authUser } from "../middlewares/authMiddleware";

const router = Router();

router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.get('/profile', authUser, getUserProfile);
router.get('/logout', logoutUser);

export default router;