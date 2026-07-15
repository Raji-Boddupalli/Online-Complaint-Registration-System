import { Link } from "react-router-dom";
import { logout } from "../../services/authService";

function Sidebar() {

    const handleLogout = () => {

        logout();

        window.location.href = "/login";

    };

    return (

        <div
            className="bg-dark text-white p-3"
            style={{
                minHeight: "100vh"
            }}
        >

            <h4 className="text-center mb-4">

                Dashboard

            </h4>

            <div className="d-grid gap-2">

                <Link
                    className="btn btn-outline-light"
                    to="/user"
                >
                    Dashboard
                </Link>

                <Link
                    className="btn btn-outline-light"
                    to="/complaint"
                >
                    Register Complaint
                </Link>

                <Link
                    className="btn btn-outline-light"
                    to="/mycomplaints"
                >
                    My Complaints
                </Link>

                <Link
                    className="btn btn-outline-light"
                    to="/feedback"
                >
                    Feedback
                </Link>

                <Link
                    className="btn btn-outline-light"
                    to="/profile"
                >
                    Profile
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

export default Sidebar;