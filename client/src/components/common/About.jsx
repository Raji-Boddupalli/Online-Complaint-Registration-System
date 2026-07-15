function About() {
  return (
    <section className="py-5 bg-light">

      <div className="container">

        <div className="row align-items-center">

          <div className="col-12 col-md-6 col-lg-6">

            <h2 className="fw-bold mb-4">
              About Our System
            </h2>

            <p className="text-muted">

              The Online Complaint Registration System provides
              citizens with a secure and transparent platform
              to register complaints, monitor complaint status,
              receive updates, and communicate with the
              concerned department.

            </p>

            <p className="text-muted">

              Our goal is to improve public services by making
              complaint handling faster, easier, and more
              transparent.

            </p>

          </div>

          <div className="col-lg-6 text-center">

            <img
              src="/about.png"
              className="img-fluid"
              alt="About System"
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;