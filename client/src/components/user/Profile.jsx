import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import BackButton from "../common/BackButton";
import AdminLayout from "../layout/AdminLayout";
import AgentLayout from "../layout/AgentLayout";

import {

    getProfile,

    updateProfile,

} from "../../services/authService";

const currentUser = JSON.parse(localStorage.getItem("user"));

let Layout = DashboardLayout;

if (currentUser?.role === "Admin") {

    Layout = AdminLayout;

}

else if (currentUser?.role === "Agent") {

    Layout = AgentLayout;

}
function Profile() {

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        phone: "",

        role: "",

        password: "",

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile();

            setFormData({

                ...response.data.user,

                password: "",

            });

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "phone") {

            const onlyNumbers = value.replace(/\D/g, "");

            setFormData({

                ...formData,

                phone: onlyNumbers,

            });

            return;

        }

        if (name === "name") {

            const onlyLetters = value.replace(/[^A-Za-z ]/g, "");

            setFormData({

                ...formData,

                name: onlyLetters,

            });

            return;

        }

        setFormData({

            ...formData,

            [name]: value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.name.length < 3) {

            alert("Name should contain at least 3 characters.");

            return;

        }

        if (!/^[0-9]{10}$/.test(formData.phone)) {

            alert("Phone number must contain exactly 10 digits.");

            return;

        }

        try {

            await updateProfile({

                name: formData.name,

                phone: formData.phone,

                password: formData.password,

            });

            alert("Profile Updated Successfully.");

            loadProfile();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to update profile."

            );

        }

    };

    return (

        <Layout>

            <div className="container">

                <BackButton />

                <div className="card shadow p-4">

                    <h2 className="text-center mb-4">

                        My Profile

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>Name</label>

                                <input

                                    className="form-control"

                                    name="name"

                                    value={formData.name}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Email</label>

                                <input

                                    className="form-control"

                                    value={formData.email}

                                    readOnly

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Phone</label>

                                <input

                                    className="form-control"

                                    name="phone"

                                    value={formData.phone}

                                    onChange={handleChange}

                                    maxLength={10}

                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Role</label>

                                <input

                                    className="form-control"

                                    value={formData.role}

                                    readOnly

                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>

                                    New Password

                                </label>

                                <input

                                    type="password"

                                    className="form-control"

                                    name="password"

                                    placeholder="Leave blank if you don't want to change"

                                    value={formData.password}

                                    onChange={handleChange}

                                />

                            </div>

                        </div>

                        <button

                            className="btn btn-primary"

                            type="submit"

                        >

                            Update Profile

                        </button>

                    </form>

                </div>

            </div>

        </Layout>

    );

}

export default Profile;