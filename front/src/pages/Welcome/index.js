import React from 'react'
import {useQuery} from "@apollo/react-hooks"
import gql from "graphql-tag"

import Header from "../../components/Header";
import PopularCatigories from "./PopularCatigories";
import RecentTasks from "./RecentTasks";

import Search from "./search";
import Testimonials from "./Testimonials";
import Counters from "./Counters";
import Footer from "../../components/Footer";

import {FRONT_END_URL} from "../../constants"

const WelcomePage = (props) => {
    React.useEffect(()=>{window.scrollTo(0,0);},[]);
    document.getElementById('wrapper').className="wrapper-with-transparent-header";
    
    return(
        <>
            <Header transparent={true}/>
            <div className="clearfix" />
            <div className="intro-banner dark-overlay" data-background-image={FRONT_END_URL+"images/header-bg.jpg"}>
                <div className="transparent-header-spacer" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="banner-headline">
                                <h3>
                                    <strong>Embauchez des experts indépendants pour tout travail, à tout moment.</strong>
                                    <br/>
                                    <span>Vaste communauté de designers, développeurs et créatifs prêts pour votre projet.</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Search />
                        </div>
                    </div>
                    {/**<div className="row">
                        <div className="col-md-12">
                            <ul className="intro-stats margin-top-45 hide-under-992px">
                                <li>
                                    <strong className="counter">1002,78</strong>
                                    <span>Jobs Posted</span>
                                </li>
                                <li>
                                    <strong className="counter">1234,1234</strong>
                                    <span>Tasks Posted</span>
                                </li>
                                <li>
                                    <strong className="counter">123456</strong>
                                    <span>Freelancers</span>
                                </li>
                            </ul>
                        </div>
                    </div>*/}
                </div>
            </div>
                
            <PopularCatigories/>
            <RecentTasks/>
                
            <div className="section padding-top-65 padding-bottom-65" style={{background : "white"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-headline centered margin-top-0 margin-bottom-5">
                                <h3>Comment ça fonctionne?</h3>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4">
                            <div className="icon-box with-line">
                                <div className="icon-box-circle">
                                    <div className="icon-box-circle-inner">
                                        <i className="icon-line-awesome-lock" />
                                        <div className="icon-box-check"><i className="icon-material-outline-check" /></div>
                                    </div>
                                </div>
                                <h3>Create an Account</h3>
                                <p>Apportez à la table des stratégies de survie gagnant-gagnant pour assurer une domination proactive à l'avenir.</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4">
                            <div className="icon-box with-line">
                                <div className="icon-box-circle">
                                    <div className="icon-box-circle-inner">
                                        <i className="icon-line-awesome-legal" />
                                        <div className="icon-box-check"><i className="icon-material-outline-check" /></div>
                                    </div>
                                </div>
                                <h3>Poster un Projet</h3>
                                <p>Libérez efficacement les informations multimédias sans. Maximisez rapidement le retour sur investissement.</p>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4">
                            <div className="icon-box">
                                <div className="icon-box-circle">
                                    <div className="icon-box-circle-inner">
                                        <i className=" icon-line-awesome-trophy" />
                                        <div className="icon-box-check"><i className="icon-material-outline-check" /></div>
                                    </div>
                                </div>
                                <h3>Choisissez un expert</h3>
                                <p>L'immersion en nanotechnologie le long de l'autoroute de l'information fermera la boucle de la focalisation uniquement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<Testimonials />*/}
            <Counters/>
            <Footer/>
        </>
    );
}
const FEATCH_WELCOME = gql`
query{
    getWelcomeData{
        CountProjets
        CountTravails
        CountUtilisateurs
        TopCategories{
            Titre
            ID
            Icon
            NbrUtilisations
        }
        DerniereProjets{
            Titre
            ID
        }
    }
}
`;
// const QUERY_Categories = gql`
//     query{
//         getCategories{
//             ID
//             Titre
//         }
//     }
// `;

export default WelcomePage
/*
userName:"mohamed1",Email:"local@me.com",Password:"azerty01",Birth:"1-4-2000",Gender:"homme",Nom:"elmoussaif",Prenom:"mohamed",tele:"060000"
*/