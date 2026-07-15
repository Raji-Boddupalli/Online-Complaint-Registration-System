import api from "./api";

const getToken = () => {

    return localStorage.getItem("token");

};

// ===========================
// Get Messages
// ===========================
export const getMessages = async (complaintId) => {

    return await api.get(

        `/messages/${complaintId}`,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

};

// ===========================
// Send Message
// ===========================
export const sendMessage = async (

    complaintId,

    message

) => {

    return await api.post(

        "/messages/send",

        {

            complaintId,

            message,

        },

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

};