import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

function AgentSidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <div
            className="bg-dark text-white p-3"
            style={{ minHeight: "100vh" }}
        >

            <h4 className="text-center mb-4">

                Agent Panel

            </h4>

            <div className="d-grid gap-2">

                <Link
                    className="btn btn-outline-light"
                    to="/agent"
                >
                    Dashboard
                </Link>

                <Link
                    className="btn btn-outline-light"
                    to="/agent/complaints"
                >
                    Assigned Complaints
                </Link>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default AgentSidebar;