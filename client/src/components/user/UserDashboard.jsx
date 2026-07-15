import DashboardLayout from "../layout/DashboardLayout";
import { useEffect, useState } from "react";
import { getMyComplaints } from "../../services/complaintService";
function UserDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

    loadComplaints();

}, []);

const loadComplaints = async () => {

    try {

        const response = await getMyComplaints();

        setComplaints(response.data.complaints);

    }

    catch(error){

        console.log(error);

    }

};

const totalComplaints = complaints.length;

const pendingComplaints = complaints.filter(
    complaint => complaint.status === "Pending"
).length;

const assignedComplaints = complaints.filter(
    complaint => complaint.status === "Assigned"
).length;

const resolvedComplaints = complaints.filter(
    complaint => complaint.status === "Resolved"
).length;
    return (

        <DashboardLayout>

            <h2>

                Welcome {user?.name}

            </h2>

            <p>

                Manage all your complaints here.

            </p>

            <div className="row mt-4">

                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h1>{totalComplaints}</h1>

                        <p>

                            Total Complaints

                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h1>{pendingComplaints}</h1>

                        <p>

                            Pending

                        </p>

                    </div>

                </div>

                <div className="col-md-3">

    <div className="card shadow p-3 text-center">

        <h1>{assignedComplaints}</h1>

        <p>Assigned</p>

    </div>

</div>

                <div className="col-md-3">

    <div className="card shadow text-center p-3">

        <h1>

            {resolvedComplaints}

        </h1>

        <h5>

            Resolved

        </h5>

    </div>

</div>

<h3 className="mt-5">

Recent Complaints

</h3>
{
complaints.slice(0,3).map((complaint)=>(

<div
className="card shadow mb-3"
key={complaint._id}
>

<div className="card-body">

<h5>

{complaint.title}

</h5>

<p>

{complaint.category}

</p>

<span
className="badge bg-primary"
>

{complaint.status}

</span>

</div>

</div>

))
}
            </div>

        </DashboardLayout>

    );

}

export default UserDashboard;