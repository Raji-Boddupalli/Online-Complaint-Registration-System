import Message from "../models/Message.js";
import Complaint from "../models/Complaint.js";

// ==================================
// Send Message
// ==================================
export const sendMessage = async (req, res) => {

    try {

        const { complaintId, message } = req.body;

        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {

            return res.status(404).json({

                success: false,
                message: "Complaint not found"

            });

        }

        const isOwner =
            complaint.user.toString() === req.user.id;

        const isAssignedAgent =
            complaint.assignedAgent &&
            complaint.assignedAgent.toString() === req.user.id;

        const isAdmin =
            req.user.role === "Admin";

        if (!(isOwner || isAssignedAgent || isAdmin)) {

            return res.status(403).json({

                success: false,
                message: "Access denied"

            });

        }

        const newMessage = new Message({

            complaint: complaintId,

            sender: req.user.id,

            senderRole: req.user.role,

            message,

        });

        await newMessage.save();

        res.status(201).json({

            success: true,

            message: "Message sent successfully",

            data: newMessage,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ==================================
// Get Messages
// ==================================
export const getMessages = async (req, res) => {

    try {

        const { complaintId } = req.params;

        const complaint = await Complaint.findById(complaintId);

        if (!complaint) {

            return res.status(404).json({

                success: false,

                message: "Complaint not found"

            });

        }

        const isOwner =
            complaint.user.toString() === req.user.id;

        const isAssignedAgent =
            complaint.assignedAgent &&
            complaint.assignedAgent.toString() === req.user.id;

        const isAdmin =
            req.user.role === "Admin";

        if (!(isOwner || isAssignedAgent || isAdmin)) {

            return res.status(403).json({

                success: false,

                message: "Access denied"

            });

        }

        const messages = await Message.find({

            complaint: complaintId,

        })

        .populate("sender", "name role")

        .sort({ createdAt: 1 });

        res.status(200).json({

            success: true,

            count: messages.length,

            messages,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};