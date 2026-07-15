import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

function AdminSidebar() {

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

                Admin Panel

            </h4>

            <div className="d-grid gap-2">

                <Link
                    className="btn btn-outline-light"
                    to="/admin"
                >
                    Dashboard
                </Link>

                <Link
                    className="btn btn-outline-light"
                    to="/admin/complaints"
                >
                    Manage Complaints
                </Link>

                <Link
                    className="btn btn-outline-light"
                    to="/admin/users"
                >
                    Manage Users
                </Link>

                <Link
                    className="btn btn-outline-light"
                    to="/admin/feedback"
                >
                    View Feedback
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

export default AdminSidebar;