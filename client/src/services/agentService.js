import api from "./api";

const getToken = () => {
    return localStorage.getItem("token");
};

// Get Assigned Complaints
export const getAssignedComplaints = async () => {

    return await api.get(

        "/complaints/assigned",

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};

// Update Complaint Status
export const updateComplaintStatus = async (id, formData) => {

    return await api.put(

        `/complaints/status/${id}`,

        formData,

        {

            headers: {

                Authorization: `Bearer ${getToken()}`,

                "Content-Type": "multipart/form-data"

            }

        }

    );

};