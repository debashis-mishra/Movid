import { createError } from "../error.js";
import Video from "../models/video.js"
import User from "../models/user.js"

export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(201).json({ status: "success", savedVideo });
    } catch (error) {
        next(error);
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found"));
        }
        if (video.userId !== req.user.id) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json({ status: "success", updatedVideo });
        } else {
            return next(createError(403, "You can update your video only"));
        }
    } catch (error) {
        next(error);
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found"));
        }
        if (video.userId !== req.user.id) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(200).json({ status: "success", message: "Video deleted successfully" });
        } else {
            return next(createError(403, "You can update your video only"));
        }
    } catch (error) {
        next(error);
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return next(createError(404, "Video not found"));
        }
        res.status(200).json({ status: "success", video });
    } catch (error) {
        next(error);
    }
}

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
        res.status(200).json({ status: "success", message: "Views increased." });
    } catch (error) {
        next(error);
    }
}

export const random = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        if (!videos) {
            return next(createError(404, "Video not found"));
        }
        res.status(200).json({ status: "success", videos });
    } catch (error) {
        next(error);
    }
}

export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        if (!videos) {
            return next(createError(404, "Video not found"));
        }
        res.status(200).json({ status: "success", videos });
    } catch (error) {
        next(error);
    }
}

export const sub = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        );
        res.status(200).json({ status: "success", subscribedVideos: list.flat().sort((a, b) => b.createdAt - a.createdAt) });
    } catch (error) {
        next(error);
    }
}

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        if (!videos) {
            return next(createError(404, "Video not found"));
        }
        res.status(200).json({ status: "success", videos });
    } catch (error) {
        next(error);
    }
}

export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
        if (!videos) {
            return next(createError(404, "Video not found"));
        }
        res.status(200).json({ status: "success", videos });
    } catch (error) {
        next(error);
    }
}