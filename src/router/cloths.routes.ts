import { createCloths, deleteCloths, getAll, searchCloths, updateCloths } from "../controller/cloths.controller";
import { authenticate } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { upload } from "../middleware/upload";
import { UserRole } from "../model/userModel";
import router from "./auth.routes";

router.post("/createCloths",  authenticate , requireRole([UserRole.ADMIN]) , upload.single("image"),createCloths)
router.get("/all" , upload.single("image") , getAll)
router.put("/updateCloths/:id", authenticate , requireRole([UserRole.ADMIN]) , upload.single("image"), updateCloths)
router.get("/search", searchCloths)
router.delete("/deleteCloths/:id", authenticate , requireRole([UserRole.ADMIN]) , deleteCloths)



export default router;