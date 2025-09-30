import { Router } from "express";
import userRouter from "./user.router.js";
import adminRouter from "./admin.router.js";

const router = Router()


router.use(userRouter)
router.use(adminRouter)

export default router