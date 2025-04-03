import express from "express";
import { register, login, getUserInfo } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users/:userId", getUserInfo);

export default router;
