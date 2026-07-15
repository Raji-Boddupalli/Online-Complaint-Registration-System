import express from "express";

import {
    createComplaint,
    getMyComplaints,
    updateComplaint,
    cancelComplaint,
    reopenComplaint,
    getAllComplaints,
    assignComplaint,
    getAssignedComplaints,
    updateComplaintStatus,
    getComplaintById,
} from "../controllers/complaintController.js";

import {
    complaintValidation,
    validateComplaint,
} from "../validators/complaintValidator.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import agentMiddleware from "../middleware/agentMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ====================================
// Create Complaint
// ====================================
router.post(
    "/create",
    authMiddleware,
    upload.single("attachment"),
    complaintValidation,
    validateComplaint,
    createComplaint
);

// ====================================
// User Routes
// ====================================

// Get My Complaints
router.get(
    "/my-complaints",
    authMiddleware,
    getMyComplaints
);

// ====================================
// Admin Routes
// IMPORTANT:
// Keep these BEFORE "/:id"
// ====================================

// Get All Complaints
router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    getAllComplaints
);

// Assign Complaint
router.put(
    "/assign/:id",
    authMiddleware,
    adminMiddleware,
    assignComplaint
);

// ====================================
// Agent Routes
// IMPORTANT:
// Keep these BEFORE "/:id"
// ====================================

// Get Assigned Complaints
router.get(
    "/assigned",
    authMiddleware,
    agentMiddleware,
    getAssignedComplaints
);

// Update Complaint Status
router.put(
    "/status/:id",
    authMiddleware,
    agentMiddleware,
    upload.single("resolutionImage"),
    updateComplaintStatus
);

// ====================================
// User Operations
// Keep "/:id" AFTER all fixed routes
// ====================================

// Get Single Complaint
router.get(
    "/:id",
    authMiddleware,
    getComplaintById
);

// Update Complaint
router.put(
    "/update/:id",
    authMiddleware,
    updateComplaint
);

// Cancel Complaint
router.put(
    "/cancel/:id",
    authMiddleware,
    cancelComplaint
);

// Reopen Complaint
router.put(
    "/reopen/:id",
    authMiddleware,
    reopenComplaint
);

export default router;