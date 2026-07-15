import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
    email,
    password
});

// Save JWT Token
localStorage.setItem("token", response.data.token);

// Save Logged-in User
localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
);

localStorage.setItem("role", response.data.user.role);
// Redirect Based On Role
// Redirect Based On Role

const role = response.data.user.role?.toLowerCase();

if (role === "admin") {

    navigate("/admin");

}
else if (role === "agent") {

    navigate("/agent");

}
else {

    navigate("/user");

}

        }

        catch (error) {

            alert(error.response?.data?.message || "Login Failed");

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

                {/* Login Form */}

                <div className="col-lg-5">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">

                            Online Complaint Registration

                        </h2>

                        <h5 className="text-center text-muted mb-4">

                            Welcome Back

                        </h5>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">

                                <label>Email</label>

                                <input

                                    type="email"

                                    className="form-control"

                                    placeholder="Enter Email"

                                    value={email}

                                    onChange={(e)=>setEmail(e.target.value)}

                                    required

                                />

                            </div>

                            <div className="mb-3">

                                <label>Password</label>

                                <div className="input-group">

    <input
        type={showPassword ? "text" : "password"}
        className="form-control"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
    />

    <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => setShowPassword(!showPassword)}
    >
        {showPassword ? "Hide" : "Show"}
    </button>

</div>

                            </div>

                            <button
                                className="btn btn-primary w-100">

                                Login

                            </button>

                        </form>

                        
                        <div className="text-center mt-3">

    <Link
        to="/forgot-password"
        className="text-decoration-none"
    >

        Forgot Password?

    </Link>

</div>

<p className="text-center mt-3">

    Don't have an account?

    <Link to="/signup">

        Register

    </Link>

</p>

                    </div>

                </div>

                {/* Image */}

                <div className="col-lg-5 text-center">

                    <img

                        src="/login.png"

                        className="img-fluid"

                        alt="Login"

                    />

                </div>

            </div>

        </div>

    );

}

export default Login;