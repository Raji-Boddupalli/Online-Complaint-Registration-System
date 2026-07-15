import { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import api from "../../services/api";
import BackButton from "../common/BackButton";

function Complaint() {

    const [formData, setFormData] = useState({

    title: "",

    department: "",

    category: "",

    description: "",

});

    const [attachment, setAttachment] = useState(null);

    const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "department") {

        setFormData({

            ...formData,

            department: value,

            category: "",

        });

    }

    else {

        setFormData({

            ...formData,

            [name]: value,

        });

    }

};

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const complaintData = new FormData();

            complaintData.append("title", formData.title);
            complaintData.append("category", formData.category);
            complaintData.append("description", formData.description);

            if (attachment) {
                complaintData.append("attachment", attachment);
            }

            const response = await api.post(
    "/complaints/create",
                complaintData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(response.data.message);

            setFormData({
                title: "",
                category: "",
                description: ""
            });

            setAttachment(null);

        } catch (error) {

            alert(error.response?.data?.message || "Complaint Registration Failed");

        }

    };

    const departments = {

    Roads: [

        "Potholes",

        "Road Damage",

        "Street Lights",

        "Traffic Signals",

    ],

    Water: [

        "Leakage",

        "No Water Supply",

        "Low Water Pressure",

    ],

    Electricity: [

        "Power Failure",

        "Electric Pole",

        "Street Lights",

    ],

    Sanitation: [

        "Garbage Collection",

        "Drainage",

        "Cleaning",

    ],

};
    return (

        <>

            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <BackButton />

<div className="card shadow p-4">

                            <h2 className="text-center mb-4">
                                Register Complaint
                            </h2>

                            <form onSubmit={handleSubmit}>

                                {/* Complaint Title */}

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

        Department

    </label>

    <select

        className="form-select"

        name="department"

        value={formData.department}

        onChange={handleChange}

        required

    >

        <option value="">

            Select Department

        </option>

        {

            Object.keys(departments).map(

                dept => (

                    <option

                        key={dept}

                        value={dept}

                    >

                        {dept}

                    </option>

                )

            )

        }

    </select>

</div>
                                {/* Category */}

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

        <option value="">

            Select Category

        </option>

        {

            formData.department &&

            departments[formData.department].map(

                category => (

                    <option

                        key={category}

                        value={category}

                    >

                        {category}

                    </option>

                )

            )

        }

    </select>

</div>

                                {/* Description */}

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
                                    ></textarea>

                                </div>

                                {/* Attachment */}

                                <div className="mb-4">

                                    <label className="form-label">
                                        Attachment (Optional)
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) =>
                                            setAttachment(e.target.files[0])
                                        }
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Submit Complaint
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default Complaint;