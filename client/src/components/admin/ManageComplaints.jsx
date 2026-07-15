import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import {
    getAllComplaints,
    getAllAgents,
    assignComplaint,
} from "../../services/adminService";
import BackButton from "../common/BackButton";

function ManageComplaints() {

    const [complaints, setComplaints] = useState([]);
    const [agents, setAgents] = useState([]);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");

    useEffect(() => {

    loadData();

    const interval = setInterval(() => {

        loadData();

    }, 5000);

    return () => clearInterval(interval);

}, []);

    const loadData = async () => {

    try {

        const complaintResponse = await getAllComplaints();

        console.log("Complaint Response:", complaintResponse);

        console.log("Complaint Data:", complaintResponse.data);

        const agentResponse = await getAllAgents();

        console.log("Agents:", agentResponse);

        setComplaints(complaintResponse.data.complaints);

        setAgents(agentResponse);

    }

    catch (error) {

        console.log("Error:", error);

    }

};

    const handleAssign = async (complaintId, agentId) => {

        if (!agentId) {

            alert("Please select an agent.");

            return;

        }

        try {

            await assignComplaint(

                complaintId,

                agentId

            );

            alert("Complaint assigned successfully.");

            loadData();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to assign complaint."

            );

        }

    };

    const filteredComplaints = complaints.filter((complaint) => {

    const matchesSearch =
        complaint.title
            .toLowerCase()
            .includes(search.toLowerCase());

    const matchesStatus =
        statusFilter === "All" ||
        complaint.status === statusFilter;

    const matchesCategory =
        categoryFilter === "All" ||
        complaint.category === categoryFilter;

    return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
    );

});

return (

    <AdminLayout>

        <BackButton />

        <h2 className="mb-4">

            Manage Complaints

        </h2>

        {/* Search & Filters */}

        <div className="row mb-4">

            <div className="col-md-4">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Complaint"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
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

                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cancelled">Cancelled</option>

                </select>

            </div>

            <div className="col-md-4">

                <select
                    className="form-select"
                    value={categoryFilter}
                    onChange={(e) =>
                        setCategoryFilter(e.target.value)
                    }
                >

                    <option value="All">

                        All Categories

                    </option>

                    {

                        [...new Set(

                            complaints.map(

                                complaint => complaint.category

                            )

                        )].map((category) => (

                            <option
                                key={category}
                                value={category}
                            >

                                {category}

                            </option>

                        ))

                    }

                </select>

            </div>

        </div>

            <div className="table-responsive">

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>Title</th>

                            <th>User</th>

                            <th>Category</th>

                            <th>Status</th>

                            <th>Agent</th>

                            <th>Assign</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredComplaints.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center"
                                    >

                                        No Complaints Found

                                    </td>

                                </tr>

                            )

                            :

                            filteredComplaints.map((complaint) => (

                                <tr key={complaint._id}>

                                    <td>

                                        {complaint.title}

                                    </td>

                                    <td>

                                        {complaint.user?.name}

                                    </td>

                                    <td>

                                        {complaint.category}

                                    </td>

                                    <td>

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

                                    </td>

                                    <td>

                                        {

                                            complaint.assignedAgent

                                                ?

                                                complaint.assignedAgent.name

                                                :

                                                "Not Assigned"

                                        }

                                    </td>

                                    <td>

                                        <select

                                            className="form-select mb-2"

                                            id={complaint._id}

                                            defaultValue=""

                                        >

                                            <option value="">

                                                Select Agent

                                            </option>

                                            {

                                                agents.map((agent) => (

                                                    <option

                                                        key={agent._id}

                                                        value={agent._id}

                                                    >

                                                        {agent.name}

                                                    </option>

                                                ))

                                            }

                                        </select>

                                        <button

                                            className="btn btn-primary btn-sm"

                                            onClick={() =>
                                                handleAssign(
                                                    complaint._id,
                                                    document.getElementById(
                                                        complaint._id
                                                    ).value
                                                )
                                            }

                                        >

                                            Assign

                                        </button>

                                    </td>

                                    <td>

                                        <Link

                                            to={`/admin/complaint/${complaint._id}`}

                                            className="btn btn-success btn-sm"

                                        >

                                            View

                                        </Link>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default ManageComplaints;