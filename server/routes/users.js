import express from "express";
import { update, deleteUser, getUser, subscribe, unsubscribe, like, dislike } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// UPDATE USER
router.put("/:id", verifyToken, update);

// DELETE USER
router.delete("/:id", verifyToken, deleteUser);

// GET USER
router.get("/find/:id", getUser);

// SUBSCRIBE USERS
router.get("/sub/:id", verifyToken, subscribe);

// UNSUBSCRIBE USERS
router.get("/unsub/:id", verifyToken, unsubscribe);

// LIKE VIDEO
router.put("/like/:videoId", verifyToken, like);

// DISLIKE VIDEO
router.put("/dislike/:videoId", verifyToken, dislike);


export default router;