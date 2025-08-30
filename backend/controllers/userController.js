import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// GENERATE A TOKEN JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const registerUser = async (req, res) => {
    try {
        const {name, email, password } = req.body;

        // CHECK IF USER ALREADY EXIST
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: 'User already exists'});
        }
        if(password.length < 8) {
            return res.status(400).json({success: false, message: "Password must be atleast of 8 characters."})
        }

        // HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        // CREATE A USER
        const user = await User.create({
            name,
            email,
            password: hashedpassword
        })
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message, 
            message: "Internal server error"
        });
    }
}

// LOGIN FUNCTION
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if(!user) {
            return res.status(500).json({message: "Invalid email or password"})
        }

        // COMPARE THE PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(500).json({message: "Invalid email or password"})
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message, 
            message: "Internal server error"
        });
    }
}

// GET USER PROFILE FUNCTION
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if(!user) {
            return res.status(404).json({ message: "User not found"})
        }
        res.json(user)
    } catch (error) {
        return res.status(500).json({
            error: error.message, 
            message: "Internal server error"
        });
    }
}