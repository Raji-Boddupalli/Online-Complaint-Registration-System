import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        phone: "",
        password: "",
        role: "Ordinary"

    });

    // ==========================
    // Handle Input Change
    // ==========================
    const handleChange = (e) => {

        const { name, value } = e.target;

        // Name -> Only letters and spaces
        if (name === "name") {

            const lettersOnly = value.replace(/[^A-Za-z ]/g, "");

            setFormData({

                ...formData,

                name: lettersOnly

            });

            return;

        }

        // Phone -> Only digits
        if (name === "phone") {

            const numbersOnly = value.replace(/\D/g, "");

            setFormData({

                ...formData,

                phone: numbersOnly

            });

            return;

        }

        setFormData({

            ...formData,

            [name]: value

        });

    };

    // ==========================
    // Register
    // ==========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Name Validation
        if (formData.name.trim().length < 3) {

            alert("Name should contain at least 3 characters.");

            return;

        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {

            alert("Please enter a valid email address.");

            return;

        }

        // Phone Validation
        if (!/^[0-9]{10}$/.test(formData.phone)) {

            alert("Phone number must contain exactly 10 digits.");

            return;

        }

        // Password Validation
        if (formData.password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;

        }

        try {

            const response = await api.post(

                "/auth/register",

                formData

            );

            alert(response.data.message);

            navigate("/login");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="container py-5">
            <div className="mb-3">

    <button
        className="btn btn-outline-secondary"
        onClick={() => navigate("/")}
    >

        ← Back to Home

    </button>

</div>
            <div className="row justify-content-center align-items-center">

                <div className="col-lg-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">

                            Online Complaint Registration

                        </h2>

                        <h5 className="text-center text-muted mb-4">

                            Create Your Account

                        </h5>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Phone Number</label>

                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    placeholder="Enter 10-digit Mobile Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength={10}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Minimum 6 Characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="mb-3">

                                <label>Select User Type</label>

                                <select
                                    className="form-select"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >

                                    <option value="Ordinary">

                                        User

                                    </option>

                                    <option value="Admin">

                                        Admin

                                    </option>

                                    <option value="Agent">

                                        Agent

                                    </option>

                                </select>

                            </div>

                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                            >

                                Register

                            </button>

                        </form>

                        <p className="text-center mt-4">

                            Already have an account?

                            {" "}

                            <Link to="/login">

                                Login

                            </Link>

                        </p>

                    </div>

                </div>

                <div className="col-lg-5 text-center">

                    <img
                        src="/signup.png"
                        className="img-fluid"
                        alt="Signup"
                    />

                </div>

            </div>

        </div>

    );

}

export default SignUp;