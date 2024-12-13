import express from "express";
import { loginAdmin, getAdminProfile } from "../controllers/adminAuthController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/dashboard", protectAdmin, getAdminProfile);

export default router;
