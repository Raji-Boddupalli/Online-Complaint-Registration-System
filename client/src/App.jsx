import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common Pages
import Home from "./components/common/Home";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Authentication
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import SignUp from "./components/auth/SignUp";

// Dashboards
import UserDashboard from "./components/user/UserDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import AgentDashboard from "./components/agent/AgentDashboard";

// User Pages
import Complaint from "./components/user/Complaint";
import MyComplaints from "./components/user/MyComplaints";
import ComplaintDetails from "./components/user/ComplaintDetails";
import EditComplaint from "./components/user/EditComplaint";
import Profile from "./components/user/Profile";
import Feedback from "./components/user/Feedback";

import ManageComplaints from "./components/admin/ManageComplaints";
import ManageUsers from "./components/admin/ManageUsers";
import ViewFeedback from "./components/admin/ViewFeedback";
import AssignedComplaints from "./components/agent/AssignedComplaints";
import AdminComplaintDetails
from "./components/admin/AdminComplaintDetails";
function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<SignUp />} />

                <Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>

                {/* User Dashboard */}

                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Dashboard */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Agent Dashboard */}

                <Route
                    path="/agent"
                    element={
                        <ProtectedRoute>
                            <AgentDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* User Module */}

                <Route
                    path="/complaint"
                    element={
                        <ProtectedRoute>
                            <Complaint />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/mycomplaints"
                    element={
                        <ProtectedRoute>
                            <MyComplaints />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/complaint/:id"
                    element={
                        <ProtectedRoute>
                            <ComplaintDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-complaint/:id"
                    element={
                        <ProtectedRoute>
                            <EditComplaint />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
    path="/admin/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>

<Route
    path="/agent/profile"
    element={
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    }
/>
                <Route
                    path="/feedback"
                    element={
                        <ProtectedRoute>
                            <Feedback />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/admin/complaints"
    element={
        <ProtectedRoute>
            <ManageComplaints />
        </ProtectedRoute>
    }
/>
<Route
    path="/admin/users"
    element={
        <ProtectedRoute>
            <ManageUsers />
        </ProtectedRoute>
    }
/>
<Route
    path="/admin/feedback"
    element={
        <ProtectedRoute>
            <ViewFeedback />
        </ProtectedRoute>
    }
/>
<Route
    path="/agent/complaints"
    element={
        <ProtectedRoute>
            <AssignedComplaints />
        </ProtectedRoute>
    }
/>
<Route

path="/admin/complaint/:id"

element={

<ProtectedRoute>

<AdminComplaintDetails/>

</ProtectedRoute>

}

/>
            </Routes>

        </BrowserRouter>

    );

}

export default App;