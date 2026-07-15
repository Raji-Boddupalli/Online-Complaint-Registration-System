import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import api from "../../services/api";
import BackButton from "../common/BackButton";
function ViewFeedback() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {

        loadFeedback();

    }, []);

    const loadFeedback = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                "/feedback/all",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setFeedbacks(response.data.feedback);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <AdminLayout>

            <BackButton />
            
            <h2 className="mb-4">

                User Feedback

            </h2>

            <div className="table-responsive">

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>User</th>

                            <th>Complaint</th>

                            <th>Rating</th>

                            <th>Message</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            feedbacks.length === 0 ?

                            (

                                <tr>

                                    <td colSpan="4">

                                        No Feedback Found

                                    </td>

                                </tr>

                            )

                            :

                            feedbacks.map((feedback) => (

                                <tr key={feedback._id}>

                                    <td>

                                        {feedback.user?.name}

                                    </td>

                                    <td>

                                        {feedback.complaint?.title}

                                    </td>

                                    <td>

                                        ⭐ {feedback.rating}

                                    </td>

                                    <td>

                                        {feedback.message}

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

export default ViewFeedback;