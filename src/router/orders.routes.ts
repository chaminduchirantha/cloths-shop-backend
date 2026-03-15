import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { UserRole } from "../model/userModel";
import { getAllOrders, getOrdersByUser, saveOrder, updateOrderStatus } from "../controller/orders.controller";

const router = Router();

router.post("/saveOrders" , authenticate , requireRole([UserRole.USER]) , saveOrder)
router.get("/allOrders" , authenticate ,requireRole([UserRole.ADMIN]), getAllOrders)
router.put("/updateStatus/:id",authenticate,requireRole([UserRole.ADMIN]),updateOrderStatus);
router.get("/viewOrder/:email", getOrdersByUser);

export default router