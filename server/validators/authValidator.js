import { body, validationResult } from "express-validator";

// ==========================
// Register Validation
// ==========================
export const registerValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .matches(/^[A-Za-z ]+$/)
        .withMessage("Name should contain only alphabets and spaces")
        .isLength({ min: 3 })
        .withMessage("Name should be at least 3 characters"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("phone")
        .matches(/^[0-9]{10}$/)
        .withMessage("Phone number must contain exactly 10 digits"),

    body("role")
        .isIn(["Ordinary", "Admin", "Agent"])
        .withMessage("Invalid role"),

];

// ==========================
// Login Validation
// ==========================
export const loginValidation = [

    body("email")
        .isEmail()
        .withMessage("Enter a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required"),

];

// ==========================
// Validation Result
// ==========================
export const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({

            success: false,

            message: errors.array()[0].msg,

            errors: errors.array(),

        });

    }

    next();

};