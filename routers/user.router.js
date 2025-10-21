import { Router } from "express";
import { createUser, fetchUser, forgetPassword, loginUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/auth.js";


const router = Router()

router.post('/user', createUser)
router.get('/users', verifyToken, fetchUser)
router.post('/login', loginUser )
router.post('/forget-password', forgetPassword)


export default router