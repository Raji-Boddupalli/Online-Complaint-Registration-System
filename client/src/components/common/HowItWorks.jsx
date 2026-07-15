function HowItWorks() {

    const steps = [

        {
            number: "01",
            title: "Register",
            description: "Create your account securely."
        },

        {
            number: "02",
            title: "Submit Complaint",
            description: "Fill in complaint details with attachments."
        },

        {
            number: "03",
            title: "Complaint Verification",
            description: "Admin verifies the submitted complaint."
        },

        {
            number: "04",
            title: "Assign to Agent",
            description: "Complaint is assigned to the concerned officer."
        },

        {
            number: "05",
            title: "Track Status",
            description: "Monitor complaint progress in real time."
        },

        {
            number: "06",
            title: "Complaint Resolved",
            description: "Officer resolves the issue and updates status."
        }

    ];

    return (

        <section className="py-5 bg-light">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="fw-bold">

                        How It Works

                    </h2>

                    <p className="text-muted">

                        Register your complaint in a few simple steps.

                    </p>

                </div>

                <div className="row">

                    {

                        steps.map((step,index)=>(

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={index}
                            >

                                <div
                                    className="card border-0 shadow h-100 text-center p-4">

                                    <div
                                        className="rounded-circle bg-primary text-white mx-auto d-flex justify-content-center align-items-center"
                                        style={{
                                            width:"70px",
                                            height:"70px",
                                            fontSize:"25px",
                                            fontWeight:"bold"
                                        }}
                                    >

                                        {step.number}

                                    </div>

                                    <h4 className="mt-4">

                                        {step.title}

                                    </h4>

                                    <p className="text-muted">

                                        {step.description}

                                    </p>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default HowItWorks;