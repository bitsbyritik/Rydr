import {Router} from "express";
const router = Router();
import userRoutes from "./user.routes";
import captainRoutes from "./captain.routes";

router.use('/user', userRoutes);
router.use('/captain', captainRoutes);

export default router;