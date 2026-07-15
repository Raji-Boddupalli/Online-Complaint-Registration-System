import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    const location = useLocation();

    // Not logged in
    if (!token) {

        return <Navigate to="/login" replace />;

    }

    // User trying to access Admin pages
    if (

        location.pathname.startsWith("/admin") &&

        user.role !== "Admin"

    ) {

        return <Navigate to="/" replace />;

    }

    // Agent trying to access User/Admin pages
    if (

        location.pathname.startsWith("/agent") &&

        user.role !== "Agent"

    ) {

        return <Navigate to="/" replace />;

    }

    // Ordinary User trying to access Admin/Agent pages
    if (

        location.pathname.startsWith("/user") &&

        user.role !== "Ordinary"

    ) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;