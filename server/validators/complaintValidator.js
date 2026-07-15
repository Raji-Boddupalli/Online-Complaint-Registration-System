import { body, validationResult } from "express-validator";

// Create Complaint Validation
export const complaintValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Complaint title is required")
        .isLength({ min: 5, max: 100 })
        .withMessage("Title must be between 5 and 100 characters"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters"),

];

// Validation Result
export const validateComplaint = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });

    }

    next();

};