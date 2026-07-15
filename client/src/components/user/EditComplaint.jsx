import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import {
    getComplaintById,
    updateComplaint,
} from "../../services/complaintService";
import BackButton from "../common/BackButton";

function EditComplaint() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
    });

    useEffect(() => {
        loadComplaint();
    }, []);

    const loadComplaint = async () => {

        try {

            const response = await getComplaintById(id);

            setFormData({
                title: response.data.complaint.title,
                category: response.data.complaint.category,
                description: response.data.complaint.description,
            });

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateComplaint(id, formData);

            alert("Complaint updated successfully.");

            navigate("/mycomplaints");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update complaint."
            );

        }

    };

    return (

        <DashboardLayout>

            <div className="container">

                <BackButton />

<div className="card shadow p-4">

                    <h2 className="text-center mb-4">

                        Edit Complaint

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Complaint Title

                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Category

                            </label>

                            <select
                                className="form-select"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="Electricity">
                                    Electricity
                                </option>

                                <option value="Water Supply">
                                    Water Supply
                                </option>

                                <option value="Roads">
                                    Roads
                                </option>

                                <option value="Municipality">
                                    Municipality
                                </option>

                                <option value="Police">
                                    Police
                                </option>

                                <option value="Health">
                                    Health
                                </option>

                                <option value="Others">
                                    Others
                                </option>

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Description

                            </label>

                            <textarea
                                className="form-control"
                                rows="5"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >

                            Update Complaint

                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/mycomplaints")}
                        >

                            Cancel

                        </button>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default EditComplaint;