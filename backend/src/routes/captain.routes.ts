import { Router } from "express";
import { loginCaptain, registerCaptain } from "../controllers/captainController";
const router = Router();

router.post('/signup', registerCaptain);
router.post('/signin', loginCaptain);
// router.get('/profile', authCaptain, getCaptainProfile);
// router.get('/logout', logoutCaptain);

export default router;