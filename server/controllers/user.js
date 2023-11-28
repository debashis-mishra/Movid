import { createError } from "../error.js"
import User from "../models/user.js"
import Video from "../models/video.js"

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        // update user
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json({ status: "success", updatedUser });
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can only update your account"));
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        // delete user
        try {
            await User.findByIdAndDelete(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(200).json({ status: "success", message: "User deleted." });
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can only delete your account."));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ status: "success", user });
    } catch (error) {
        next(error);
    }
}

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscriptions: req.params.id }
        }, { new: true });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        }, { new: true });
        res.status(200).json({ status: "success", message: "Subscription Successful." });
    } catch (error) {
        next(error);
    }
}

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscriptions: req.params.id }
        }, { new: true });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        }, { new: true });
        res.status(200).json({ status: "success", message: "Unsubscription Successful." });
    } catch (error) {
        next(error);
    }
}

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        }, { new: true });
        res.status(200).json({ status: "success", message: "Liked video." });
    } catch (error) {
        next(error);
    }
}

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        }, { new: true });
        res.status(200).json({ status: "success", message: "Disliked video." });
    } catch (error) {
        next(error);
    }
}