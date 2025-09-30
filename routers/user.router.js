import { Router } from "express";
import { createUser, fetchUser } from "../controllers/user.controller.js"


const router = Router()

router.post('/user', createUser)
router.get('/users', fetchUser)


export default router