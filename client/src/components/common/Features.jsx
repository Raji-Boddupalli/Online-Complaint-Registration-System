function Features() {
  const features = [
    {
      title: "Easy Complaint Registration",
      description:
        "Submit complaints online anytime without visiting any office.",
      icon: "📝",
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your complaint status from submission to resolution.",
      icon: "📍",
    },
    {
      title: "Secure Platform",
      description:
        "Your complaint data is protected with secure authentication.",
      icon: "🔒",
    },
    {
      title: "Quick Resolution",
      description:
        "Complaints are assigned to officers for faster resolution.",
      icon: "⚡",
    },
  ];

  return (
    <section className="py-5 bg-light">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="fw-bold">Why Choose Our Portal?</h2>

          <p className="text-muted">
            A modern platform designed to make complaint registration
            simple, transparent and efficient.
          </p>

        </div>

        <div className="row">

          {features.map((feature, index) => (

            <div className="col-lg-3 col-md-6 mb-4" key={index}>

              <div className="card border-0 shadow h-100 text-center p-4">

                <div
                  style={{
                    fontSize: "50px",
                  }}
                >
                  {feature.icon}
                </div>

                <h5 className="mt-3 fw-bold">

                  {feature.title}

                </h5>

                <p className="text-muted">

                  {feature.description}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;