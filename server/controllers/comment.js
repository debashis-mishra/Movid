import { createError } from '../error.js';
import Comment from '../models/comment.js';
import Video from '../models/video.js';

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        res.status(200).json({ status: "success", savedComment });
    } catch (err) {
        next(err);
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId);

        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await comment.findByIdAndDelete(req.params.id);
            res.status(200).json({ status: "success", message: "Comment deleted successfully" });
        } else {
            return next(createError(403, "You can only delete your comment"));
        }
    } catch (err) {
        next(err);
    }
}

export const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json({ status: "success", comments });
    } catch (err) {
        next(err);
    }
}

