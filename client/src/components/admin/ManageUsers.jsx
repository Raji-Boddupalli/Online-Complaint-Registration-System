import { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import {
    getAllUsers,
    createAgent,
    approveAgent,
} from "../../services/adminService";

import BackButton from "../common/BackButton";
function ManageUsers() {

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        phone: "",

    });

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response = await getAllUsers();

            setUsers(response.data.users);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

    const { name, value } = e.target;

    // Only letters for Name
    if (name === "name") {

        const lettersOnly = value.replace(/[^A-Za-z ]/g, "");

        setFormData({

            ...formData,

            name: lettersOnly

        });

        return;

    }

    // Only numbers for Phone
    if (name === "phone") {

        const numbersOnly = value.replace(/\D/g, "");

        setFormData({

            ...formData,

            phone: numbersOnly

        });

        return;

    }

    setFormData({

        ...formData,

        [name]: value

    });

};
    const handleSubmit = async (e) => {

        e.preventDefault();
        // Name Validation
if (formData.name.trim().length < 3) {

    alert("Name must contain at least 3 characters.");

    return;

}

// Email Validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formData.email)) {

    alert("Please enter a valid email.");

    return;

}

// Phone Validation
if (!/^[0-9]{10}$/.test(formData.phone)) {

    alert("Phone number must contain exactly 10 digits.");

    return;

}

// Password Validation
if (formData.password.length < 6) {

    alert("Password must be at least 6 characters.");

    return;

}
        try {

            await createAgent(formData);

            alert("Agent created successfully.");

            setFormData({

                name: "",
                email: "",
                password: "",
                phone: "",

            });

            loadUsers();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to create agent."

            );

        }

    };

    const handleApprove = async (id) => {

    try {

        await approveAgent(id);

        alert("Agent approved successfully.");

        loadUsers();

    }

    catch (error) {

        alert(

            error.response?.data?.message ||

            "Unable to approve agent."

        );

    }

};

    // ===========================
    // Filter Users
    // ===========================

    const ordinaryUsers = users.filter(

        user => user.role === "Ordinary"

    );

    const agents = users.filter(

        user => user.role === "Agent"

    );

    const admins = users.filter(

        user => user.role === "Admin"

    );

    // ===========================
    // Reusable Table
    // ===========================

    const renderTable = (title, data) => (

        <div className="card shadow p-4 mb-4">

            <h4 className="mb-3">

                {title}

                <span className="badge bg-primary ms-2">

                    {data.length}

                </span>

            </h4>

            <div className="table-responsive">

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

<tr>

<th>Name</th>

<th>Email</th>

<th>Phone</th>

<th>Role</th>

<th>Availability</th>

<th>Approval</th>

<th>Action</th>

</tr>

</thead>

                    <tbody>

                        {

                            data.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center"
                                    >

                                        No Records Found

                                    </td>

                                </tr>

                            )

                            :

                            data.map((user) => (

                                <tr key={user._id}>

                                    <td>

                                        {user.name}

                                    </td>

                                    <td>

                                        {user.email}

                                    </td>

                                    <td>

                                        {user.phone}

                                    </td>

                                    <td>

                                        {user.role}

                                    </td>
                                    <td>

{

user.role==="Agent"

?

<span

className={`badge ${

user.availability==="Available"

?

"bg-success"

:

user.availability==="Busy"

?

"bg-warning text-dark"

:

"bg-secondary"

}`}

>

{user.availability}

</span>

:

"-"

}

</td>
                                    <td>

{

user.role === "Agent"

?

(

user.isApproved

?

<span className="badge bg-success">

Approved

</span>

:

<span className="badge bg-warning text-dark">

Pending

</span>

)

:

"-"

}

</td>
<td>

{

user.role === "Agent" &&

!user.isApproved &&

(

<button

className="btn btn-success btn-sm"

onClick={()=>

handleApprove(

user._id

)

}

>

Approve

</button>

)

}

</td>
                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

    return (

        <AdminLayout>

            <BackButton />
            
            <h2 className="mb-4">

                Manage Users

            </h2>

            {/* Create Agent */}

            <div className="card shadow p-4 mb-5">

                <h4 className="mb-4">

                    Create New Agent

                </h4>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <input

                                type="text"

                                className="form-control"

                                name="name"

                                placeholder="Agent Name"

                                value={formData.name}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <input

                                type="email"

                                className="form-control"

                                name="email"

                                placeholder="Agent Email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <input

                                type="password"

                                className="form-control"

                                name="password"

                                placeholder="Password"

                                value={formData.password}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <input
    type="tel"
    className="form-control"
    name="phone"
    placeholder="Enter 10-digit phone number"
    value={formData.phone}
    onChange={handleChange}
    maxLength={10}
    required
/>

                        </div>

                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                    >

                        Create Agent

                    </button>

                </form>

            </div>

            {renderTable("Ordinary Users", ordinaryUsers)}

            {renderTable("Agents", agents)}

            {renderTable("Administrators", admins)}

        </AdminLayout>

    );

}

export default ManageUsers;