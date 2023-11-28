import express from "express";

import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Create a video
router.post("/", verifyToken, addVideo);

// Update a video
router.put("/:id", verifyToken, updateVideo);

// Delete a video
router.delete("/:id", verifyToken, deleteVideo);

// Get a video
router.get("/find/:id", verifyToken, getVideo);

// Update video views
router.put("/view/:id", addView);

// Get Trending Videos
router.get("/trend", trend);

// Get Random Videos
router.get("/random", random);

// Get Subscribed Videos
router.get("/sub", verifyToken, sub);

// Get videos by tag
router.get("/tag", getByTag);

// search videos
router.get("/search", search);


export default router;