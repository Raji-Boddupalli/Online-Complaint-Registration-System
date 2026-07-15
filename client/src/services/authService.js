import api from "./api";

const getToken = () => {
    return localStorage.getItem("token");
};

// Get Logged-in User Profile
export const getProfile = async () => {

    return await api.get(
        "/auth/profile",
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

};
// Update Profile
export const updateProfile = async (profileData) => {

    return await api.put(

        "/auth/profile",

        profileData,

        {

            headers: {

                Authorization: `Bearer ${localStorage.getItem("token")}`

            }

        }

    );

};
// Logout
export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

};
export const forgotPassword = async (data) => {

    return await api.put(

        "/auth/forgot-password",

        data

    );

};