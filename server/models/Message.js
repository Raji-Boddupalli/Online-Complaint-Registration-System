import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(

    {

        complaint: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Complaint",

            required: true,

        },

        sender: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

        },

        senderRole: {

            type: String,

            enum: ["Ordinary", "Agent", "Admin"],

            required: true,

        },

        message: {

            type: String,

            required: true,

            trim: true,

        },

    },

    {

        timestamps: true,

    }

);

const Message = mongoose.model("Message", messageSchema);

export default Message;