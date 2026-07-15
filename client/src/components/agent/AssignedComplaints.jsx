import { useEffect, useState } from "react";
import AgentLayout from "../layout/AgentLayout";
import {
    getAssignedComplaints,
    updateComplaintStatus,
} from "../../services/agentService";
import ComplaintChat from "../chat/ComplaintChat";
import BackButton from "../common/BackButton";
function AssignedComplaints() {

    const [complaints, setComplaints] = useState([]);

    const [resolutionImages, setResolutionImages] = useState({});
    const [selectedStatus, setSelectedStatus] = useState({});
    useEffect(() => {

    loadComplaints();

    const interval = setInterval(() => {

        loadComplaints();

    }, 5000);

    return () => clearInterval(interval);

}, []);

    const loadComplaints = async () => {

        try {

            const response = await getAssignedComplaints();

            setComplaints(response.data.complaints);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleUpdate = async (id, status, notes) => {

        try {

           const formData = new FormData();

formData.append("status", status);

formData.append("actionNotes", notes);

if (resolutionImages[id]) {

    formData.append(

        "resolutionImage",

        resolutionImages[id]

    );

}

await updateComplaintStatus(

    id,

    formData

);
            alert("Complaint updated successfully.");

            loadComplaints();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to update complaint."

            );

        }

    };
    const handleImageChange = (id, file) => {

    setResolutionImages({

        ...resolutionImages,

        [id]: file,

    });

};
    const handleStatusChange = (id, status) => {

    setSelectedStatus({

        ...selectedStatus,

        [id]: status,

    });

};
    return (

        <AgentLayout>

            <BackButton />
            
            <h2 className="mb-4">

                Assigned Complaints

            </h2>

            {

                complaints.length === 0 ?

                (

                    <h5>No complaints assigned.</h5>

                )

                :

                complaints.map((complaint) => (

                    <div
                        className="card shadow mb-4"
                        key={complaint._id}
                    >

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

                                <strong>User:</strong>{" "}

                                {complaint.user?.name}

                            </p>

                            <p>

                                <strong>Email:</strong>{" "}

                                {complaint.user?.email}

                            </p>

                            <div className="mb-3">

                                <label>Status</label>

                                <select
    className="form-select"
    id={`status-${complaint._id}`}
    value={
        selectedStatus[complaint._id] || complaint.status
    }
    onChange={(e) =>
        handleStatusChange(
            complaint._id,
            e.target.value
        )
    }
>

                                    <option>Assigned</option>

                                    <option>In Progress</option>

                                    <option>Resolved</option>

                                    <option>Rejected</option>

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>Action Notes</label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    id={`notes-${complaint._id}`}
                                    defaultValue={complaint.actionNotes}
                                />

                            </div>
                            {
    (
        selectedStatus[complaint._id] || complaint.status
    ) === "Resolved" && (

        <div className="mb-3">

            <label>

                Resolution Image

            </label>

            <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) =>
                    handleImageChange(
                        complaint._id,
                        e.target.files[0]
                    )
                }
            />

        </div>

    )
}
                            <button
                                className="btn btn-success"
                                onClick={() =>
                                    handleUpdate(
                                        complaint._id,
                                        document.getElementById(
                                            `status-${complaint._id}`
                                        ).value,
                                        document.getElementById(
                                            `notes-${complaint._id}`
                                        ).value
                                    )
                                }
                            >

                                Update Complaint

                            </button>
                            <ComplaintChat
    complaintId={complaint._id}
/>
                        </div>

                    </div>

                ))

            }

        </AgentLayout>

    );

}

export default AssignedComplaints;