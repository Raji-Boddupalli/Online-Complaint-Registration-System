import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================
// Register User
// ======================
export const registerUser = async (req, res) => {
  try {
    // Get data from request body
    const { name, email, password, phone, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({

    name,
    email,
    password: hashedPassword,
    phone,
    role,

});

    // Save user
    await user.save();

    // Response
    res.status(201).json({
  success: true,
  message: "User registered successfully",
  data: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  },
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Login User
// ======================
export const loginUser = async (req, res) => {
  try {
    // Get email and password
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    if (

    user.role === "Agent" &&

    !user.isApproved

) {

    return res.status(403).json({

        success:false,

        message:"Your account is waiting for Admin approval."

    });

}

  if(user.role === "Agent"){

    user.availability = "Available";

    await user.save();

}

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Login Success
    res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  },
});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Forgot Password
// ======================

export const forgotPassword = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "Email not registered."

            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({

            success: true,

            message: "Password updated successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// Get All Users (Admin)
// ==========================
export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Dashboard User Statistics
// ==========================
export const getUserStatistics = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalAgents = await User.countDocuments({

            role: "Agent"

        });

        const pendingAgents = await User.countDocuments({

            role: "Agent",

            isApproved: false

        });

        res.status(200).json({

            success: true,

            totalUsers,

            totalAgents,

            pendingAgents,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==========================
// Get Logged In User
// ==========================
export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Update Profile
// ==========================
export const updateProfile = async (req, res) => {

    try {

        const { name, phone, password } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        user.name = name || user.name;

        user.phone = phone || user.phone;

        if (password && password.trim() !== "") {

            const hashedPassword = await bcrypt.hash(password, 10);

            user.password = hashedPassword;

        }

        await user.save();

        res.status(200).json({

            success: true,

            message: "Profile updated successfully.",

            user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// Create Agent (Admin)
// ==========================
export const createAgent = async (req, res) => {

    try {

        const { name, email, password, phone } = req.body;

        // Check if agent already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Agent
        const agent = new User({

    name,

    email,

    password: hashedPassword,

    phone,

    role: "Agent",

    isApproved: false,

});

        await agent.save();

        res.status(201).json({

            success: true,
            message: "Agent created successfully",
            agent

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ==========================
// Approve Agent
// ==========================
export const approveAgent = async (req, res) => {

    try {

        const agent = await User.findById(

            req.params.id

        );

        if (!agent) {

            return res.status(404).json({

                success:false,

                message:"Agent not found"

            });

        }

        agent.isApproved = true;

        await agent.save();

        res.status(200).json({

            success:true,

            message:"Agent approved successfully."

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
// ==========================
// Agent Logout
// ==========================
export const logoutUser = async (req,res)=>{

    try{

        const user = await User.findById(req.user.id);

        if(

            user &&

            user.role==="Agent"

        ){

            user.availability="Offline";

            await user.save();

        }

        res.status(200).json({

            success:true,

            message:"Logout successful."

        });

    }

    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};