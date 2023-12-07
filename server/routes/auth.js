import express from "express";
import { signup, signin, googleAuth } from "../controllers/auth.js";

const router = express.Router();

// CREATE USER
router.post("/signup", signup);

// LOGIN USER
router.post("/signin", signin);

// GOOGLE AUTH
router.post("/google", googleAuth);



export default router;