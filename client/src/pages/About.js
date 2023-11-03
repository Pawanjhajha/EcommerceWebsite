import Layout from "../componets/Layout/Layout";

function About() {
    return (
        <Layout title={'About us-Ecommerce app'}>
            <section id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="images/about.jpg" alt="about img" />
                        </div>
                        <div className="col-md-5">
                            <h2>Sinetech Power Solutions</h2>
                            <p className="form-text">
                                We “Sinetech Power Solutions” are a Sole Proprietorship firm engaged in Wholesale Trader high-quality array of Lead Acid Battery, SMF Battery, Solar Inverter, etc. Since our establishment in 2010 at Jaipur (Rajasthan, India), we have been able to meet customer’s varied needs by providing products that are widely appreciated for their varied associated attributes. Under the strict direction of our mentor “Sumer Singh”, we have achieved an alleged name in the industry.</p>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default About;