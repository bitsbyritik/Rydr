import { Router } from "express";
import { getCaptainProfile, loginCaptain, registerCaptain } from "../controllers/captainController";
import { authCaptain } from "../middlewares/authMiddleware";
const router = Router();

router.post('/signup', registerCaptain);
router.post('/signin', loginCaptain);
router.get('/profile', authCaptain, getCaptainProfile);
// router.get('/logout', logoutCaptain);

export default router;