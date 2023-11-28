import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    // console.log("Cookies: ", req.cookies.access_token)
    // console.log("Token: ", token);
    if (!token) return next(createError(401, "Access denied"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(createError(403, "Token is invalid"));
        req.user = user;
        next();
    });
}