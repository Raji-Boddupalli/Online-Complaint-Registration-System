import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import ComplaintStatusChart from "../charts/ComplaintStatusChart";
import {
    getAllComplaints,
    getUserStatistics,
} from "../../services/adminService";
import api from "../../services/api";

function AdminDashboard() {
    const [complaints, setComplaints] = useState([]);

const [stats, setStats] = useState({

    totalUsers: 0,

    totalAgents: 0,

    pendingAgents: 0,

});

const [feedbackCount, setFeedbackCount] = useState(0);
    

    useEffect(() => {

    loadDashboard();

}, []);

const loadDashboard = async () => {

    try {

        const complaintResponse = await getAllComplaints();

        setComplaints(

            complaintResponse.data.complaints

        );

        const statsResponse = await getUserStatistics();

        setStats(statsResponse.data);

        const token = localStorage.getItem("token");

        const feedbackResponse = await api.get(

            "/feedback/all",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        setFeedbackCount(

            feedbackResponse.data.feedback.length

        );

    }

    catch(error){

        console.log(error);

    }

};
    return (

        <AdminLayout>

            <h2 className="mb-4">

                Admin Dashboard

            </h2>

            {/* First Statistics Row */}

<div className="row mb-4">

    <div className="col-md-3 mb-3">

        <div className="card shadow text-center">

            <div className="card-body">

                <h5>Total Complaints</h5>

                <h2>{complaints.length}</h2>

            </div>

        </div>

    </div>

    <div className="col-md-3 mb-3">

        <div className="card shadow text-center">

            <div className="card-body">

                <h5>Pending</h5>

                <h2>

                    {

                        complaints.filter(

                            c => c.status === "Pending"

                        ).length

                    }

                </h2>

            </div>

        </div>

    </div>

    <div className="col-md-3 mb-3">

        <div className="card shadow text-center">

            <div className="card-body">

                <h5>In Progress</h5>

                <h2>

                    {

                        complaints.filter(

                            c => c.status === "In Progress"

                        ).length

                    }

                </h2>

            </div>

        </div>

    </div>

    <div className="col-md-3 mb-3">

        <div className="card shadow text-center">

            <div className="card-body">

                <h5>Resolved</h5>

                <h2>

                    {

                        complaints.filter(

                            c => c.status === "Resolved"

                        ).length

                    }

                </h2>

            </div>

        </div>

    </div>

</div>

{/* Second Statistics Row */}

<div className="row mb-5">

    <div className="col-md-3 mb-3">

        <div className="card shadow text-center">

            <div className="card-body">

                <h5>Total Users</h5>

                <h2>{stats.totalUsers}</h2>

            </div>

        </div>

    </div>

    <div className="col-md-3 mb-3">

        <div className="card shadow text-center">

            <div className="card-body">

                <h5>Total Agents</h5>

                <h2>{stats.totalAgents}</h2>

            </div>

        </div>

    </div>

    <div className="col-md-3 mb-3">

        <div className="card shadow text-center">

            <div className="card-body">

                <h5>Pending Approval</h5>

                <h2>{stats.pendingAgents}</h2>

            </div>

        </div>

    </div>

    <div className="col-md-3 mb-3">

        <div className="card shadow text-center">

            <div className="card-body">

                <h5>Total Feedback</h5>

                <h2>{feedbackCount}</h2>

            </div>

        </div>

    </div>

</div>
            <div className="mb-5">

    <ComplaintStatusChart

        complaints={complaints}

    />

</div>
            <div className="row">

                <div className="col-md-6 mb-4">

                    <div className="card shadow">

                        <div className="card-body text-center">

                            <h4>

                                Manage Complaints

                            </h4>

                            <p>

                                View and assign complaints.

                            </p>

                            <Link
                                className="btn btn-primary"
                                to="/admin/complaints"
                            >

                                Open

                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card shadow">

                        <div className="card-body text-center">

                            <h4>

                                Manage Users

                            </h4>

                            <p>

                                View users and create agents.

                            </p>

                            <Link
                                className="btn btn-success"
                                to="/admin/users"
                            >

                                Open

                            </Link>

                        </div>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card shadow">

                        <div className="card-body text-center">

                            <h4>

                                View Feedback

                            </h4>

                            <p>

                                Read user feedback.

                            </p>

                            <Link
                                className="btn btn-warning"
                                to="/admin/feedback"
                            >

                                Open

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>

    );

}

export default AdminDashboard;