import api from "./api";

const getToken = () => {
    return localStorage.getItem("token");
};

// Submit Feedback
export const submitFeedback = async (feedbackData) => {

    return await api.post(

        "/feedback/submit",

        feedbackData,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};