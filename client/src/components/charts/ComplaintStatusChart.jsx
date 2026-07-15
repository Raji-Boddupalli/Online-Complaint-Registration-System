import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function ComplaintStatusChart({ complaints }) {

    const pending = complaints.filter(
        c => c.status === "Pending"
    ).length;

    const assigned = complaints.filter(
        c => c.status === "Assigned"
    ).length;

    const progress = complaints.filter(
        c => c.status === "In Progress"
    ).length;

    const resolved = complaints.filter(
        c => c.status === "Resolved"
    ).length;

    const rejected = complaints.filter(
        c => c.status === "Rejected"
    ).length;

    const cancelled = complaints.filter(
        c => c.status === "Cancelled"
    ).length;

    const data = {

        labels: [

            "Pending",
            "Assigned",
            "In Progress",
            "Resolved",
            "Rejected",
            "Cancelled",

        ],

        datasets: [

            {

                data: [

                    pending,
                    assigned,
                    progress,
                    resolved,
                    rejected,
                    cancelled,

                ],

                backgroundColor: [

                    "#FFC107", // Pending
                    "#0D6EFD", // Assigned
                    "#20C997", // In Progress
                    "#198754", // Resolved
                    "#DC3545", // Rejected
                    "#6C757D", // Cancelled

                ],

                borderColor: "#ffffff",

                borderWidth: 2,

            },

        ],

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "top",

            },

        },

    };

    return (

        <div className="card shadow p-4">

            <h4 className="mb-4">

                Complaint Status Report

            </h4>

            <div
    style={{
        width: "100%",
        maxWidth: "450px",
        height: "350px",
        margin: "0 auto",
    }}
>

                <Pie
                    data={data}
                    options={options}
                />

            </div>

        </div>

    );

}

export default ComplaintStatusChart;