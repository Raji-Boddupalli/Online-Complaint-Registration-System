import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await forgotPassword(formData);

            alert(response.data.message);

            navigate("/login");

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to reset password."

            );

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">

                            Forgot Password

                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>Email</label>

                                <input

                                    type="email"

                                    className="form-control"

                                    name="email"

                                    value={formData.email}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <div className="mb-3">

                                <label>New Password</label>

                                <input

                                    type="password"

                                    className="form-control"

                                    name="password"

                                    value={formData.password}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <button
                                className="btn btn-primary w-100"
                            >

                                Reset Password

                            </button>

                        </form>

                        <div className="text-center mt-3">

                            <Link to="/login">

                                Back to Login

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ForgotPassword;