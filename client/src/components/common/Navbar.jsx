import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to={token ? "#" : "/"}
                >

                    Online Complaint Registration

                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbar"
                >

                    <ul className="navbar-nav ms-auto">

                        {

                            token ?

                            (

                                <>

                                    <li className="nav-item">

                                        <Link
    className="nav-link"
    to={
        user.role === "Admin"
            ? "/admin/profile"
            : user.role === "Agent"
            ? "/agent/profile"
            : "/profile"
    }
>

    Profile

</Link>

                                    </li>

                                    <li className="nav-item">

                                        <button
                                            className="btn btn-light ms-3"
                                            onClick={handleLogout}
                                        >

                                            Logout

                                        </button>

                                    </li>

                                </>

                            )

                            :

                            (

                                <>

                                    <li className="nav-item">

                                        <Link
                                            className="nav-link"
                                            to="/login"
                                        >

                                            Login

                                        </Link>

                                    </li>

                                    <li className="nav-item">

                                        <Link
                                            className="btn btn-light ms-3"
                                            to="/signup"
                                        >

                                            Register

                                        </Link>

                                    </li>

                                </>

                            )

                        }

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;