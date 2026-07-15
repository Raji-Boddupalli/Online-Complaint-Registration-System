import api from "./api";

const getToken = () => {
    return localStorage.getItem("token");
};

// Get all complaints of logged-in user
export const getMyComplaints = async () => {

    return await api.get(
        "/complaints/my-complaints",
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

};

// Get single complaint
export const getComplaintById = async (id) => {

    return await api.get(
        `/complaints/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

};

// Update complaint
export const updateComplaint = async (id, complaintData) => {

    return await api.put(
        `/complaints/update/${id}`,
        complaintData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

};

// Cancel complaint
export const cancelComplaint = async (id) => {

    return await api.put(
        `/complaints/cancel/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

};
// ===========================
// Reopen Complaint
// ===========================
export const reopenComplaint = async (id) => {

    return await api.put(

        `/complaints/reopen/${id}`,

        {},

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

};