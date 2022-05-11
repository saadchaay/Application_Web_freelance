import React from 'react'
import Header from "../../components/Header";
import {Link} from "react-router-dom"
import Footer from "../../components/Footer";
import A from "../../components/A"
import {useSteps} from "../../hooks"
import RegisterForm from "./RegisterForm"

const RegisterPage = (props) => {
    document.getElementById('wrapper').className="awrapper-with-transparent-header";    
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    const step = useSteps(0,0,3);
    const prev = ()=>{
        if(step.value<3){
            step.prev();
        }
    }
    return(
        <>
        <Header />
        <div className="container margin-top-70">
            <div className="row margin-top-30">

                <div className="col-md-6 col-xl-6 offset-xl-3">
                    <div className="login-register-page">
                        <div className="section-headline margin-bottom-30">
                            {(step.value<3)&&<div className="welcome-text">
                                <h1>Créons votre compte!</h1>
                                <span>Vous avez déjà un compte?<Link to="/login">Log In!</Link></span>
                            </div>}
                        </div>
                        <div className="tabs">
                            <div className="tabs-header">
                                <ul>
                                    <li className={(step.value===0)?"active-tab":""}  ><A>étape 1</A></li>
                                    <li className={(step.value===1)?"active-tab":""}   ><A>étape 2</A></li>
                                    <li className={(step.value===2)?"active-tab":""}  ><A>étape 3</A></li>
                                </ul>
                                <div className="tab-hover"/>
                                <nav className="tabs-nav">
                                    <span className="tab-prev" onClick={prev}><i className="icon-material-outline-keyboard-arrow-left"/></span>
                                </nav>
                            </div>

                            <RegisterForm step={step} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="margin-top-70" />
        <Footer/>
        </>
    )
}
export default RegisterPage
