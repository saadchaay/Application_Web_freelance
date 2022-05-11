import React from 'react'
import Header from "../../components/Header";
import {Link} from "react-router-dom"
import Footer from "../../components/Footer";
import LoginForm from "./LoginForm";

const LoginPage = (props) => {
    document.getElementById('wrapper').className="awrapper-with-transparent-header";
    // console.log(props)
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return(
        <>
            <Header transparent={false}/>
            <div className="container margin-top-70">
                <div className="row">
                    <div className="col-xl-5 offset-xl-3">
                        <div className="login-register-page">
                            <div className="welcome-text">
                                <h3>Nous sommes heureux de vous revoir!</h3>
                                <span>Vous n'avez pas de compte? <Link to="/register">S'inscrire!</Link></span>
                            </div>

                            <LoginForm history={props.history}/>


                        </div>
                    </div>
                </div>
            </div>
            <div className="margin-top-70" />
            <Footer/>
        </>
    )
}
export default LoginPage
