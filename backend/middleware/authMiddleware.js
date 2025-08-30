import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(token && token.startsWith('Bearer')) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        else {
            res.status(401).json({message: "Not authorized, No Token Found"})
        }
    } catch (error) {
        return res.status(401).json({
            error: error.message,
            message: "Not authorized"
        });
    }
}