import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../model/userModel";
import { saveOrder } from "../controller/orders.controller";

const router = Router();

router.post("/saveOrders" , authenticate , requireRole([UserRole.USER]) , saveOrder)


export default router