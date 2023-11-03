import {Link} from "react-router-dom"
function Footer() {
    return (
        <>
        <div id="footer" className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <h4>
                        All Right Rserved &copy; Singhtech power Solutions
                    </h4>
                    <p>
                        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Footer;