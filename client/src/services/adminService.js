import api from "./api";

const getToken = () => {
    return localStorage.getItem("token");
};

// Get All Complaints
export const getAllComplaints = async () => {

    return await api.get(

        "/complaints/all",

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};

// Get All Users
export const getAllUsers = async () => {

    return await api.get(

        "/auth/users",

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};

// Get Only Agents
export const getAllAgents = async () => {

    const response = await getAllUsers();

    return response.data.users.filter(

        user => user.role === "Agent"

    );

};

// Assign Complaint
export const assignComplaint = async (id, agentId) => {

    return await api.put(

        `/complaints/assign/${id}`,

        { agentId },

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};
// Create Agent
export const createAgent = async (agentData) => {

    return await api.post(

        "/auth/create-agent",

        agentData,

        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }

    );

};
// ===========================
// Approve Agent
// ===========================
export const approveAgent = async (id) => {

    return await api.put(

        `/auth/approve-agent/${id}`,

        {},

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

};

// ===========================
// User Statistics
// ===========================
export const getUserStatistics = async () => {

    return await api.get(

        "/auth/statistics",

        {

            headers: {

                Authorization: `Bearer ${getToken()}`

            }

        }

    );

};