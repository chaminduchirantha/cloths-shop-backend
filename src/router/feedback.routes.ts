import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../model/userModel";
import { createFeedback, getAllFeedback } from "../controller/feedback.controller";

const router = Router()

router.post("/createFeedback" , authenticate , requireRole([UserRole.USER]) , createFeedback)
router.get("/allFeedback" , getAllFeedback)


export default router