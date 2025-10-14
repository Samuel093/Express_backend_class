import { Router } from "express";
import { createUser, fetchUser, loginUser } from "../controllers/user.controller.js"


const router = Router()

router.post('/user', createUser)
router.get('/users', fetchUser)
router.post('/login', loginUser )


export default router