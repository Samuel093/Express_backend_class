import { Router } from "express";
import { fetchAdmin } from "../controllers/admin.controller.js";

const router = Router()

router.get('/admin', fetchAdmin)

export default router