import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import createDefaultAdmin from "./seed/createAdmin.js";
import messageRoutes from "./routes/messageRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/messages", messageRoutes);
app.use(errorMiddleware);
// Connect Database
await connectToDB();

await createDefaultAdmin();

// Test Route
app.get("/", (req, res) => {
  res.send("Online Complaint Registration API is Running...");
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});