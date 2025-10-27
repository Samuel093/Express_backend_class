import { Router } from "express";
import { createUser, fetchUser, forgetPassword, loginUser, resetPassword } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/auth.js";


const router = Router()

router.post('/user', createUser)
router.get('/users', fetchUser)
router.post('/login', loginUser )
router.post('/forget-password', forgetPassword)
router.post('/reset-password', resetPassword)



export default router