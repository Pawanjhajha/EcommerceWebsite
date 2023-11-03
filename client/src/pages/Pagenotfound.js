import { Link } from "react-router-dom";
import Layout from "../componets/Layout/Layout";

function Pagenotfound() {
    return ( 
        <Layout title={'Page not found'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 pnf">
                        <h1 className="pnf-title">404</h1>
                        <h2 className="pnf-heading">Oops ! page not found</h2>
                        <Link to="/" className="pnf-button"> Go Back </Link>
                    </div>
                </div>
            </div>
        </Layout>
     );
}

export default Pagenotfound;