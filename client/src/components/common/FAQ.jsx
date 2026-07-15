function FAQ() {

  return (

    <section className="py-5 bg-light">

      <div className="container">

        <h2 className="text-center fw-bold mb-5">

          Frequently Asked Questions

        </h2>

        <div className="accordion" id="faq">

          <div className="accordion-item">

            <h2 className="accordion-header">

              <button
                className="accordion-button"
                data-bs-toggle="collapse"
                data-bs-target="#q1">

                How do I register a complaint?

              </button>

            </h2>

            <div
              id="q1"
              className="accordion-collapse collapse show">

              <div className="accordion-body">

                Register an account, login and submit your complaint.

              </div>

            </div>

          </div>

          <div className="accordion-item">

            <h2 className="accordion-header">

              <button
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#q2">

                Can I upload images?

              </button>

            </h2>

            <div
              id="q2"
              className="accordion-collapse collapse">

              <div className="accordion-body">

                Yes. Images and supporting documents can be uploaded.

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

export default FAQ;