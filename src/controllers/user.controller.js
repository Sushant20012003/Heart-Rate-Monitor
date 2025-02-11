import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({success:false, message: 'Please fill in all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({success:false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    user.password = undefined;

    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    return res
      .status(200)
      .cookie("heart_monitor_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({success:true, message: "User registered successfully", user , token});

  } catch (error) {
    res.status(500).json({success:false, message: "Error registering user", error });
  }
};


// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    user.password = undefined;

    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    return res
      .status(200)
      .cookie("heart_monitor_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ message: "Login successful", user, token});
  } catch (error) {
    res.status(500).json({success:false, message: "Error logging in", error });
  }
};



//logout
export const logout = async (req, res) => {
    try {
        // Clear the authentication token from the cookie
        res.clearCookie("heart_monitor_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Error logging out:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
