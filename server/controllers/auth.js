import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { createError } from "../error.js";
import User from "../models/user.js";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hash });

        await newUser.save().then((user) => {
            res.status(200).send("User created successfully!");
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) {
            return next(createError(404, "User not found"));
        }

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) {
            return next(createError(400, "Incorrect password"));
        }

        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
        const { password, ...others } = user._doc;

        console.log("JWT Secret: ", process.env.JWT_SECRET);

        res.cookie("access_token", token, { httpOnly: true }).status(200).json(others);
    } catch (error) {
        next(error);
    }
};

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(user._doc);
        } else {
            const newUser = new User({ ...req.body, fromGoogle: true });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id.toString() }, process.env.JWT_SECRET);
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(savedUser._doc);
        }
    } catch (error) {
        next(error);
    }
 };