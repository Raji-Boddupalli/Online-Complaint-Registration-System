import { useEffect, useState } from "react";
import AgentLayout from "../layout/AgentLayout";
import StatCard from "../common/StatCard";
import api from "../../services/api";

function AgentDashboard() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {

        loadComplaints();

    }, []);

    const loadComplaints = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                "/complaints/assigned",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setComplaints(response.data.complaints);

        }

        catch (error) {

            console.log(error);

        }

    };

    const assigned = complaints.length;

    const inProgress = complaints.filter(
        complaint => complaint.status === "In Progress"
    ).length;

    const resolved = complaints.filter(
        complaint => complaint.status === "Resolved"
    ).length;

    return (

        <AgentLayout>

            <h2 className="mb-4">

                Agent Dashboard

            </h2>

            <div className="row">

                <StatCard
                    title="Assigned"
                    count={assigned}
                    bgColor="primary"
                />

                <StatCard
                    title="In Progress"
                    count={inProgress}
                    bgColor="warning"
                />

                <StatCard
                    title="Resolved"
                    count={resolved}
                    bgColor="success"
                />

            </div>

        </AgentLayout>

    );

}

export default AgentDashboard;