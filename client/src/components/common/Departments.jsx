function Departments() {

    const departments = [

        {
            icon: "⚡",
            title: "Electricity"
        },

        {
            icon: "🚰",
            title: "Water Supply"
        },

        {
            icon: "🏛️",
            title: "Municipality"
        },

        {
            icon: "🚔",
            title: "Police"
        },

        {
            icon: "🛣️",
            title: "Roads & Transport"
        },

        {
            icon: "🏥",
            title: "Health Services"
        }

    ];

    return (

        <section className="py-5">

            <div className="container">

                <div className="text-center mb-5">

                    <h2 className="fw-bold">

                        Complaint Categories

                    </h2>

                    <p className="text-muted">

                        Select the appropriate department while
                        registering your complaint.

                    </p>

                </div>

                <div className="row">

                    {

                        departments.map((department,index)=>(

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={index}
                            >

                                <div
                                    className="card shadow border-0 text-center p-4 h-100">

                                    <div
                                        style={{
                                            fontSize:"55px"
                                        }}
                                    >

                                        {department.icon}

                                    </div>

                                    <h4 className="mt-3">

                                        {department.title}

                                    </h4>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default Departments;