import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import ComplaintChat from "../chat/ComplaintChat";

import { getComplaintById } from "../../services/complaintService";
import BackButton from "../common/BackButton";
function AdminComplaintDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [complaint, setComplaint] = useState(null);

    useEffect(() => {

        loadComplaint();

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

            <AdminLayout>

                <h3>Loading...</h3>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <BackButton />

<div className="card shadow p-4">

                <h2 className="mb-4">

                    Complaint Details

                </h2>

                <p>

                    <strong>Title :</strong>{" "}

                    {complaint.title}

                </p>

                <p>

                    <strong>Category :</strong>{" "}

                    {complaint.category}

                </p>

                <p>

                    <strong>Description :</strong>{" "}

                    {complaint.description}

                </p>

                <p>

                    <strong>Status :</strong>{" "}

                    <span className="badge bg-primary">

                        {complaint.status}

                    </span>

                </p>

                <p>

                    <strong>User :</strong>{" "}

                    {complaint.user?.name}

                </p>

                <p>

                    <strong>Email :</strong>{" "}

                    {complaint.user?.email}

                </p>

                <p>

                    <strong>Assigned Agent :</strong>{" "}

                    {

                        complaint.assignedAgent

                            ?

                            complaint.assignedAgent.name

                            :

                            "Not Assigned"

                    }

                </p>

                {

complaint.assignedAgent && (

<p>

<strong>

Officer Status:

</strong>

<span

className={`badge ms-2 ${

complaint.assignedAgent.availability==="Available"

?

"bg-success"

:

complaint.assignedAgent.availability==="Busy"

?

"bg-warning text-dark"

:

"bg-secondary"

}`}

>

{

complaint.assignedAgent.availability

}

</span>

</p>

)
}

                <p>

                    <strong>Created On :</strong>{" "}

                    {

                        new Date(

                            complaint.createdAt

                        ).toLocaleString()

                    }

                </p>

                {

                    complaint.actionNotes &&

                    <p>

                        <strong>Action Notes :</strong>{" "}

                        {complaint.actionNotes}

                    </p>

                }

                {

                    complaint.attachment &&

                    <p>

                        <strong>Attachment :</strong>{" "}

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

                <button

                    className="btn btn-secondary mt-4"

                    onClick={() => navigate("/manage-complaints")}

                >

                    Back

                </button>

            </div>

        </AdminLayout>

    );

}

export default AdminComplaintDetails;