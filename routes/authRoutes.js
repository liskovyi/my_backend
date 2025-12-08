import express from "express";
import { register, login, changePassword } from "../controllers/authController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authRequired, changePassword);

export default router;