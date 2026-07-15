import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import { getComplaintById } from "../../services/complaintService";
import ComplaintChat from "../chat/ComplaintChat";
import BackButton from "../common/BackButton";
function ComplaintDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [complaint, setComplaint] = useState(null);

    useEffect(() => {

    loadComplaint();

    const interval = setInterval(() => {

        loadComplaint();

    }, 5000);

    return () => clearInterval(interval);

}, []);

    const loadComplaint = async () => {

        try {

            const response = await getComplaintById(id);

            setComplaint(response.data.complaint);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!complaint) {

        return (

            <DashboardLayout>

                <h3>Loading...</h3>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <BackButton />

<div className="card shadow p-4">

                <h2 className="mb-4">

                    Complaint Details

                </h2>

                <p>

                    <strong>Title :</strong>

                    {complaint.title}

                </p>

                <p>

                    <strong>Category :</strong>

                    {complaint.category}

                </p>

                <p>

                    <strong>Description :</strong>

                    {complaint.description}

                </p>

                <p>

                    <strong>Status :</strong>

                    <span className="badge bg-primary ms-2">

                        {complaint.status}

                    </span>

                </p>

                {
    complaint.assignedAgent && (

        <>
            <p>

                <strong>Assigned Officer :</strong>{" "}

                {complaint.assignedAgent.name}

            </p>

            <p>

                <strong>Officer Email :</strong>{" "}

                {complaint.assignedAgent.email}

            </p>

            <p>

                <strong>Officer Status :</strong>

                <span
                    className={`badge ms-2 ${
                        complaint.assignedAgent.availability === "Available"
                            ? "bg-success"
                            : complaint.assignedAgent.availability === "Busy"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                    }`}
                >

                    {complaint.assignedAgent.availability}

                </span>

            </p>
        </>

    )
}

                <p className="text-muted">

    Automatically checking for updates every 5 seconds...

</p>
                <p>

                    <strong>Date :</strong>

                    {new Date(
                        complaint.createdAt
                    ).toLocaleString()}

                </p>

                {

                    complaint.attachment &&

                    <p>

                        <strong>Attachment :</strong>

                        {complaint.attachment}

                    </p>

                }
                {

    complaint.resolutionImage && (

        <div className="mt-4">

            <h5>

                Resolution Image

            </h5>

            <img

                src={`http://localhost:5000/uploads/${complaint.resolutionImage}`}

                alt="Resolution"

                className="img-fluid rounded shadow"

                style={{

                    maxHeight: "350px"

                }}

            />

        </div>

    )

}
                <ComplaintChat
    complaintId={complaint._id}
/>

            </div>
   
        </DashboardLayout>
        
    );

}

export default ComplaintDetails;