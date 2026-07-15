import Feedback from "../models/Feedback.js";

// ==========================
// Submit Feedback
// ==========================
export const submitFeedback = async (req, res) => {
  try {

    const { complaint, rating, message } = req.body;

    const feedback = new Feedback({
      complaint,
      rating,
      message,
      user: req.user.id,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get All Feedback
// ==========================
export const getAllFeedback = async (req, res) => {
  try {

    const feedback = await Feedback.find()
      .populate("user", "name email")
      .populate("complaint", "title status");

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};