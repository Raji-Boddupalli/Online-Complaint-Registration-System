function StatCard({ title, count, bgColor }) {

    return (

        <div className="col-md-3 mb-4">

            <div className={`card border-0 shadow bg-${bgColor} text-white`}>

                <div className="card-body text-center">

                    <h1 className="display-5 fw-bold">

                        {count}

                    </h1>

                    <h5>

                        {title}

                    </h5>

                </div>

            </div>

        </div>

    );

}

export default StatCard;