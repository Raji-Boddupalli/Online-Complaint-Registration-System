import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {

    return (

        <>

            <Navbar />

            <div className="container-fluid">

                <div className="row">

                    <div className="col-md-3 col-lg-2 p-0">

                        <Sidebar />

                    </div>

                    <div className="col-md-9 col-lg-10 p-4">

                        {children}

                    </div>

                </div>

            </div>

            <Footer />

        </>

    );

}

export default DashboardLayout;