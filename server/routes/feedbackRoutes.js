import express from "express";

import {
  submitFeedback,
  getAllFeedback,
} from "../controllers/feedbackController.js";
import {
    feedbackValidation,
    validateFeedback,
} from "../validators/feedbackValidator.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// User
router.post(
    "/submit",
    authMiddleware,
    feedbackValidation,
    validateFeedback,
    submitFeedback
);

// Admin
router.get(
  "/all",
  authMiddleware,
  adminMiddleware,
  getAllFeedback
);

export default router;