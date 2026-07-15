import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { getMyComplaints } from "../../services/complaintService";
import { submitFeedback } from "../../services/feedbackService";
import BackButton from "../common/BackButton";
function Feedback() {

    const [complaints, setComplaints] = useState([]);

    const [formData, setFormData] = useState({

        complaint: "",

        rating: "",

        message: ""

    });

    useEffect(() => {

        loadComplaints();

    }, []);

    const loadComplaints = async () => {

        try {

            const response = await getMyComplaints();

            // Show only resolved complaints
            const resolved = response.data.complaints.filter(

                complaint => complaint.status === "Resolved"

            );

            setComplaints(resolved);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await submitFeedback(formData);

            alert("Feedback submitted successfully.");

            setFormData({

                complaint: "",

                rating: "",

                message: ""

            });

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to submit feedback."

            );

        }

    };

    return (

        <DashboardLayout>

            <div className="container">

                <BackButton />

<div className="card shadow p-4">

                    <h2 className="text-center mb-4">

                        Submit Feedback

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Complaint

                            </label>

                            <select

                                className="form-select"

                                name="complaint"

                                value={formData.complaint}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Complaint

                                </option>

                                {

                                    complaints.map((complaint) => (

                                        <option

                                            key={complaint._id}

                                            value={complaint._id}

                                        >

                                            {complaint.title}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Rating

                            </label>

                            <select

                                className="form-select"

                                name="rating"

                                value={formData.rating}

                                onChange={handleChange}

                                required

                            >

                                <option value="">Select Rating</option>

                                <option value="1">1 ⭐</option>

                                <option value="2">2 ⭐⭐</option>

                                <option value="3">3 ⭐⭐⭐</option>

                                <option value="4">4 ⭐⭐⭐⭐</option>

                                <option value="5">5 ⭐⭐⭐⭐⭐</option>

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Message

                            </label>

                            <textarea

                                className="form-control"

                                rows="5"

                                name="message"

                                value={formData.message}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <button

                            className="btn btn-primary"

                            type="submit"

                        >

                            Submit Feedback

                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Feedback;