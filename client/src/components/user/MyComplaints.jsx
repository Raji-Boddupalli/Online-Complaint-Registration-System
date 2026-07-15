import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

import {
    getMyComplaints,
    cancelComplaint,
    reopenComplaint,
} from "../../services/complaintService";

function MyComplaints() {

    const [complaints, setComplaints] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

    loadComplaints();

    const interval = setInterval(() => {

        loadComplaints();

    }, 5000);

    return () => clearInterval(interval);

}, []);

    const loadComplaints = async () => {

        try {

            const response = await getMyComplaints();

            setComplaints(response.data.complaints);

        }

        catch (error) {

            console.log(error);

        }

    };

    const filteredComplaints = complaints.filter((complaint) => {

        const matchesSearch =

            complaint.title.toLowerCase().includes(search.toLowerCase()) ||

            complaint.category.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =

            statusFilter === "All" ||

            complaint.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    const handleCancel = async (id) => {

        const confirmCancel = window.confirm(

            "Are you sure you want to cancel this complaint?"

        );

        if (!confirmCancel) return;

        try {

            await cancelComplaint(id);

            alert("Complaint cancelled successfully.");

            loadComplaints();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to cancel complaint."

            );

        }

    };

    const handleReopen = async (id) => {

        const confirmReopen = window.confirm(

            "Do you want to reopen this complaint?"

        );

        if (!confirmReopen) return;

        try {

            await reopenComplaint(id);

            alert("Complaint reopened successfully.");

            loadComplaints();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to reopen complaint."

            );

        }

    };

    return (

        <DashboardLayout>

            <h2 className="mb-4">

                My Complaints

            </h2>

            <div className="row mb-4">

                <div className="col-md-6">

                    <input

                        type="text"

                        className="form-control"

                        placeholder="Search by Title or Category"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                </div>

                <div className="col-md-4">

                    <select

                        className="form-select"

                        value={statusFilter}

                        onChange={(e) =>

                            setStatusFilter(e.target.value)

                        }

                    >

                        <option value="All">

                            All Status

                        </option>

                        <option value="Pending">

                            Pending

                        </option>

                        <option value="Assigned">

                            Assigned

                        </option>

                        <option value="In Progress">

                            In Progress

                        </option>

                        <option value="Resolved">

                            Resolved

                        </option>

                        <option value="Rejected">

                            Rejected

                        </option>

                        <option value="Cancelled">

                            Cancelled

                        </option>

                    </select>

                </div>

            </div>

            <div className="row">

                {

                    filteredComplaints.length === 0 ?

                    (

                        <h5>

                            No complaints found.

                        </h5>

                    )

                    :

                    (

                        filteredComplaints.map((complaint) => (

                            <div

                                className="col-lg-6 mb-4"

                                key={complaint._id}

                            >

                                <div className="card shadow h-100">

                                    <div className="card-body">

                                        <h4>

                                            {complaint.title}

                                        </h4>

                                        <p>

                                            {complaint.description}

                                        </p>

                                        <p>

                                            <strong>Category:</strong>{" "}

                                            {complaint.category}

                                        </p>

                                        <p>

                                            <strong>Status:</strong>{" "}

                                            <span

                                                className={`badge ${
                                                    complaint.status === "Pending"
                                                        ? "bg-warning text-dark"
                                                        : complaint.status === "Assigned"
                                                        ? "bg-primary"
                                                        : complaint.status === "In Progress"
                                                        ? "bg-info"
                                                        : complaint.status === "Resolved"
                                                        ? "bg-success"
                                                        : complaint.status === "Rejected"
                                                        ? "bg-danger"
                                                        : "bg-secondary"
                                                }`}

                                            >

                                                {complaint.status}

                                            </span>

                                        </p>

                                        <p>

                                            <strong>Assigned Agent:</strong>{" "}

                                            {

                                                complaint.assignedAgent

                                                    ?

                                                    complaint.assignedAgent.name

                                                    :

                                                    "Not Assigned Yet"

                                            }

                                        </p>

                                        {

                                            complaint.assignedAgent &&

                                            (

                                                <p>

                                                    <strong>

                                                        Agent Email:

                                                    </strong>{" "}

                                                    {

                                                        complaint.assignedAgent.email

                                                    }

                                                </p>

                                            )

                                        }

                                        <p>

                                            <strong>Date:</strong>{" "}

                                            {

                                                new Date(

                                                    complaint.createdAt

                                                ).toLocaleDateString()

                                            }

                                        </p>

                                        {

                                            complaint.attachment &&

                                            (

                                                <p>

                                                    <strong>

                                                        Attachment:

                                                    </strong>{" "}

                                                    📎 {complaint.attachment}

                                                </p>

                                            )

                                        }

                                        <div className="mt-3">

                                            <Link

                                                to={`/complaint/${complaint._id}`}

                                                className="btn btn-info btn-sm me-2"

                                            >

                                                View

                                            </Link>

                                            {

                                                complaint.status === "Pending" &&

                                                (

                                                    <Link

                                                        to={`/edit-complaint/${complaint._id}`}

                                                        className="btn btn-warning btn-sm me-2"

                                                    >

                                                        Edit

                                                    </Link>

                                                )

                                            }

                                            {

                                                complaint.status === "Pending" &&

                                                (

                                                    <button

                                                        className="btn btn-danger btn-sm me-2"

                                                        onClick={() =>

                                                            handleCancel(

                                                                complaint._id

                                                            )

                                                        }

                                                    >

                                                        Cancel

                                                    </button>

                                                )

                                            }

                                            {

                                                (

                                                    complaint.status === "Resolved" ||

                                                    complaint.status === "Cancelled"

                                                ) &&

                                                (

                                                    <button

                                                        className="btn btn-success btn-sm"

                                                        onClick={() =>

                                                            handleReopen(

                                                                complaint._id

                                                            )

                                                        }

                                                    >

                                                        Reopen

                                                    </button>

                                                )

                                            }

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </DashboardLayout>

    );

}

export default MyComplaints;