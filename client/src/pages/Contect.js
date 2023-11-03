import { Link } from "react-router-dom";
import Layout from "../componets/Layout/Layout";

function Contect() {
    return ( 
        <Layout title={'Contact us'}>
            <section id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="images/ContactImg1.png" alt="contact "/>
                        </div>
                        <div className="col-md-5">
                            <h2>Contact Us</h2>
                            <p className="form-text">any query and info about product feel free to call anytime we 24*7 available</p>
                            <table >
                                <tr>
                                    <td><i class="bi bi-envelope"></i> </td>
                                    <td><Link to="/"> : www.sinetech@gmail.com</Link></td>
                                </tr>
                                <tr>
                                    <td><i class="bi bi-telephone-forward"></i></td>
                                    <td>: 9829280408</td>
                                </tr>
                                <tr>
                                    <td><i class="bi bi-house-add"></i></td>
                                    <td> Ground Floor, Vidhyadhar Enclave 1st, B-11 Central Spine, Near mital scin clinic, Vidyadhar Nagar, Jaipur-302039, Rajasthan, India</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
     );
}

export default Contect;