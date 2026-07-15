import express from "express";

import {
  registerUser,
  loginUser,
  getAllUsers,
  getProfile,
  createAgent,
  approveAgent,
  logoutUser,
  getUserStatistics,
  updateProfile,
  forgotPassword,
} from "../controllers/authController.js";
import {
    registerValidation,
    loginValidation,
    validate,
} from "../validators/authValidator.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.post(
    "/register",
    registerValidation,
    validate,
    registerUser
);
router.post(
    "/login",
    loginValidation,
    validate,
    loginUser
);

router.put(
    "/forgot-password",
    forgotPassword
);

router.get(
    "/profile",
    authMiddleware,
    getProfile
);
router.put(

    "/profile",

    authMiddleware,

    updateProfile

);
// Admin Route
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

router.get(
    "/statistics",
    authMiddleware,
    adminMiddleware,
    getUserStatistics
);
router.post(
    "/create-agent",
    authMiddleware,
    adminMiddleware,
    createAgent
);
router.put(
    "/approve-agent/:id",
    authMiddleware,
    adminMiddleware,
    approveAgent
);
router.post(

    "/logout",

    authMiddleware,

    logoutUser

);
export default router;