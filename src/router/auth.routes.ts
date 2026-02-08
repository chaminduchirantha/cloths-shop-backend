import { Router } from "express";
import { getMyDetails, loginUser, registerUser } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth";

const router = Router()

router.post("/register" , registerUser)
router.post("/login" , loginUser)
router.get("/get", authenticate, getMyDetails)

export default router