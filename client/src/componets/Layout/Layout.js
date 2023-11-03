import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Layout(props) {
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
                <meta name="author" content={props.author} />
                <title>{props.title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "70vh" }}>
            <ToastContainer />
                {props.children}
            </main>
            <Footer />

        </div>
    );
}
//default props 
Layout.defaultProps={
    title:"Ecommerce app -shop now",
    description:"mern stack project",
    keywords:"mern,react,node,mongoDb",
    author:'Pawan'

}
export default Layout;