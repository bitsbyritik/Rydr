import {Router} from "express";
const router = Router();
import userRoutes from "./user.routes"

router.use('/user', userRoutes);

export default router;