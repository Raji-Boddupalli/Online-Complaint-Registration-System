import { Link } from "react-router-dom";
function Hero() {

    return (

        <section className="hero py-5">

            <div className="container">

                <div className="row align-items-center">

                    {/* Left Side */}

                    <div className="col-lg-6">

                        <h1 className="display-4 fw-bold">

                            Online Complaint Registration System

                        </h1>

                        <p className="lead mt-4">

                            Welcome to the Online Complaint Registration System.
                            A secure, transparent, and efficient platform where
                            citizens can register, log in, submit complaints,
                            track their complaint status, and receive timely
                            updates from the concerned department.

                        </p>

                        <Link
className="btn btn-primary btn-lg me-3"
to="/signup"
>

Register

</Link>

<Link
className="btn btn-outline-primary btn-lg"
to="/login"
>

Login

</Link>

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-6 text-center">

                        <img
                            src="/hero.png"
                            alt="Complaint System"
                            className="img-fluid"
                        />

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Hero;