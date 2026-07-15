import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    attachment: {
      type: String,
      default: "",
    },

    status:{
    type:String,

    enum:[
        "Pending",
        "Assigned",
        "In Progress",
        "Resolved",
        "Rejected",
        "Cancelled"
    ],

    default:"Pending",
},

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    actionNotes: {
      type: String,
      default: "",
    },

    resolutionImage: {
    type: String,
    default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;