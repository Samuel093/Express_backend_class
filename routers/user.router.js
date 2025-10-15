import { Router } from "express";
import { createUser, fetchUser, loginUser } from "../controllers/user.controller.js"
import { verifyToken } from "../utils/auth.js";


const router = Router()

router.post('/user', createUser)
router.get('/users', verifyToken, fetchUser)
router.post('/login', loginUser )


export default router