import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    role: {
      type: String,
      enum: ["Ordinary", "Agent", "Admin"],
      default: "Ordinary",
    },
    isApproved: {

    type: Boolean,

    default: false,

    },
    availability: {

    type: String,

    enum: [

        "Available",

        "Busy",

        "Offline"

    ],

    default: "Offline",

},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;