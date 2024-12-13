import express from "express";
import { getAllUsers, deleteUser } from "../controllers/adminUserController.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protectAdmin, getAllUsers);
router.delete("/:id", protectAdmin, deleteUser);

export default router;
