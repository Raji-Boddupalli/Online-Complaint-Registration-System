import Complaint from "../models/Complaint.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
// ==========================
// Create Complaint
// ==========================
export const createComplaint = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    const complaint = new Complaint({
      title,
      category,
      description,
      attachment: req.file ? req.file.filename : "",
      user: req.user.id,
    });

    await complaint.save();
    const user = await User.findById(req.user.id);

await sendEmail(
    user.email,
    "Complaint Registered Successfully",
    `
Hello ${user.name},

Your complaint has been registered successfully.

Complaint Details

Title : ${complaint.title}

Category : ${complaint.category}

Status : ${complaint.status}

Thank you for using our Complaint Management System.
`
);
     
    res.status(201).json({
      success: true,
      message: "Complaint registered successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get My Complaints
// ==========================
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
    user: req.user.id,
})
.populate("assignedAgent", "name email")
.sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Complaint
// ==========================
export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description } = req.body;

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this complaint",
      });
    }

    complaint.title = title || complaint.title;
    complaint.category = category || complaint.category;
    complaint.description = description || complaint.description;

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Cancel Complaint
// ==========================
export const cancelComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this complaint",
      });
    }

    complaint.status = "Cancelled";

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint cancelled successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Reopen Complaint
// ==========================
export const reopenComplaint = async (req, res) => {

    try {

        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {

            return res.status(404).json({
                success: false,
                message: "Complaint not found"
            });

        }

        if (complaint.status !== "Resolved" && complaint.status !== "Cancelled") {

            return res.status(400).json({
                success: false,
                message: "Only Resolved or Cancelled complaints can be reopened."
            });

        }

        complaint.status = "Pending";

        complaint.assignedAgent = null;

        complaint.actionNotes = "";

        await complaint.save();

        res.status(200).json({

            success: true,

            message: "Complaint reopened successfully.",

            complaint

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================
// Get All Complaints (Admin)
// ==========================
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email phone")
      .populate("assignedAgent", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {

    console.log("========== GET ALL COMPLAINTS ERROR ==========");

    console.error(error);

    res.status(500).json({

        success: false,

        message: error.message,

    });

}
};

// ==========================
// Assign Complaint to Agent
// ==========================
export const assignComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { agentId } = req.body;

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.assignedAgent = agentId;
complaint.status = "Assigned";

// Find the agent first
const agent = await User.findById(agentId);

if (!agent) {

    return res.status(404).json({

        success: false,

        message: "Agent not found"

    });

}

// Update availability
agent.availability = "Busy";

await agent.save();

// Save complaint
await complaint.save();

await sendEmail(
    agent.email,
    "New Complaint Assigned",
    `
Hello ${agent.name},

A new complaint has been assigned to you.

Complaint Title :

${complaint.title}

Please login to the system.

Thank you.
`
);
    res.status(200).json({
      success: true,
      message: "Complaint assigned successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Assigned Complaints (Agent)
// ==========================
export const getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedAgent: req.user.id,
    })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Complaint Status (Agent)
// ==========================
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, actionNotes } = req.body;

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (!complaint.assignedAgent) {
      return res.status(400).json({
        success: false,
        message: "No agent assigned to this complaint",
      });
    }

    if (complaint.assignedAgent.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not assigned to this complaint",
      });
    }

    complaint.status = status;
    complaint.actionNotes = actionNotes;

if (req.file) {

    complaint.resolutionImage = req.file.filename;

}
if (status === "Resolved") {

    const agent = await User.findById(req.user.id);

    if (agent) {

        agent.availability = "Available";

        await agent.save();

    }

}
    await complaint.save();
    
    if(status === "Resolved"){

    const user = await User.findById(complaint.user);
    const agent = await User.findById(

    req.user.id

);

agent.availability="Available";

await agent.save();
    await sendEmail(

        user.email,

        "Complaint Resolved",

        `
Hello ${user.name},

Your complaint has been resolved successfully.

Complaint Title :

${complaint.title}

Thank you.
`

    );

}
    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================
// Get Single Complaint
// ==========================

export const getComplaintById = async (req, res) => {

    try {

        const complaint = await Complaint.findById(

            req.params.id

        )

        .populate(

            "user",

            "name email phone"

        )

        .populate(
    "assignedAgent",
    "name email availability"
)

        if (!complaint) {

            return res.status(404).json({

                success: false,

                message: "Complaint not found"

            });

        }

        res.status(200).json({

            success: true,

            complaint

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};