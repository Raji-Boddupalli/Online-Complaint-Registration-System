import { body, validationResult } from "express-validator";

// Feedback Validation
export const feedbackValidation = [

    body("complaint")
        .notEmpty()
        .withMessage("Complaint ID is required")
        .isMongoId()
        .withMessage("Invalid Complaint ID"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Feedback message is required")
        .isLength({ min: 10, max: 500 })
        .withMessage("Feedback must be between 10 and 500 characters"),

];

// Validation Result Middleware
export const validateFeedback = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });

    }

    next();

};