import React from 'react'
import Header from "../../components/Header";
import {Link} from "react-router-dom"
import Footer from "../../components/Footer2"
import TravailItem from "./TravailItem"
import CandidatureForm from "./CandidatureForm"
import AutreTravails from "./AutreTravails"

import moment from "moment"


import {Waypoint} from "react-waypoint"
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"


const SingleTravailPage = ({props}) => { 
    
    document.getElementById('wrapper').className="awrapper-with-transparent-header";    
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    let logo = FRONT_END_URL;
    
    
    const {loading, data, error} = useQuery(QUERY_TRAVAILL,{variables: {ID: props.match.params.id}});
    
    
    if(loading||error){
        return <h1>loading ...</h1>;
    }else if(data) {
        // const logo = (data.getTravail.Compte.Image)?FRONT_END_URL+data.getTravail.Compte.Image:FRONT_END_URL+"images/single-job.jpg";
        if(data.getTravail.Compte.Image){
            logo = data.getTravail.Compte.Image;
        }else {
            logo += "images/company-logo-placeholder.png";
        }
        
    
        return (
            <>
                <Header transparent={false} path="travail" />
                <div className="single-page-header" data-background-image={logo}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="single-page-header-inner">
                                    <div className="left-side">
                                        <div className="header-image">
                                            <a href="single-company-profile.html">
                                                <img
                                                    src={logo}
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="header-details">
                                            <h3>{data.getTravail.Titre}</h3>
                                            <h5>À propos</h5>
                                            <ul>
                                            <li>
                                                <a href="single-company-profile.html">
                                                    <i className="icon-material-outline-business" />
                                                    {data.getTravail.Compte.Username}
                                                </a>
                                            </li>
                                            <li>
                                                <div className="star-rating" data-rating="4.9" />
                                            </li>
                                            <li>
                                                <img
                                                    className="flag"
                                                    src={FRONT_END_URL + "images/flags/gb.svg"}
                                                    alt=""
                                                />
                                                {data.getTravail.Compte.Nationalite}
                                            </li>
                                            <li>
                                                <div className="verified-badge-with-title">Vérifié</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="right-side">
                                    <div className="salary-box">
                                        <div className="salary-type">Salaire annuel</div>
                                            <div className="salary-amount">
                                                ${data.getTravail.MinSalaire} - ${data.getTravail.MaxSalaire}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                            
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 content-right-offset">
                            <div className="single-page-section">
                                <h3 className="margin-bottom-25">Description</h3>
                                <p>{data.getTravail.Description}</p>
                            </div>
                            
                            {(data.getTravail.Attachements.length)?(
                                <div className="single-page-section">
                                <h3>Attachments</h3>
                                <div className="attachments-container">          
                                    {
                                        data.getTravail.Attachements.map((ele,i)=>(
                                            <a href={ele.Lien} className="attachment-box ripple-effect">
                                                <span>{ele.Nom}</span>
                                                <i>{ele.Type}</i>
                                            </a>
                                        ))
                                    }
                                    
                                </div>
                            </div>):null}
                            
                            <div className="single-page-section">
                                <h3 className="margin-bottom-25">les Travails poster par la même entreprise</h3>
                                {/* Listings Container */}
                                <div className="listings-container grid-layout">
                                    {/* Job Listing */}
                                    { <AutreTravails idCompte={data.getTravail.Compte._id}/>}    
                                </div>
                            </div>
                        </div>
        
        <div className="col-xl-4 col-lg-4">
            <div className="sidebar-container">
            
            {/* Sidebar Widget */}
            <CandidatureForm idTravail={props.match.params.id} idCompte={data.getTravail.Compte._id}/>
            {/* Sidebar Widget */}
            <div className="sidebar-widget">
                <div className="job-overview">
                    <div className="job-overview-headline">Résumé du travail</div>
                        <div className="job-overview-inner">
                            <ul>
                                <li>
                                    <i className="icon-material-outline-location-on" />
                                    <span>Adresse</span>
                                    <h5>{data.getTravail.Adresse}</h5>
                                </li>
                                <li>
                                    <i className="icon-material-outline-business-center" />
                                    <span>Type de travail</span>
                                    <h5>{data.getTravail.Type}</h5>
                                </li>
                                <li>
                                    <i className="icon-material-outline-local-atm" />
                                    <span>Salaire</span>
                                    <h5>${data.getTravail.MinSalaire} - ${data.getTravail.MaxSalaire}</h5>
                                </li>
                                <li>
                                    <i className="icon-material-outline-access-time" />
                                    <span>date de publication</span>
                                    <h5>{moment((new Date(parseInt(data.getTravail.CreatedAt))).toISOString()).fromNow()}</h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Sidebar Widget */}
                <div className="sidebar-widget">
                    <h3>marque-page</h3>
                    {/* Bookmark Button */}
                    <button className="bookmark-button margin-bottom-25">
                        <span className="bookmark-icon" />
                        <span className="bookmark-text">marque-pages</span>
                        <span className="bookmarked-text">mis en signet</span>
                    </button>
                    {/* Copy URL */}
                    <div className="copy-url">
                        <input
                            id="copy-url"
                            type="text"
                            defaultValue={FRONT_END_URL+"travail/"+data.getTravail._id}
                            className="with-border"
                        />
                        <button
                            className="copy-url-button ripple-effect"
                            data-clipboard-target="#copy-url"
                            title="Copy to Clipboard"
                            data-tippy-placement="top"
                        >
                            <i className="icon-material-outline-file-copy" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</>)
    }
}
export default SingleTravailPage

const QUERY_TRAVAILL = gql`
    query($ID: ID!){
        getTravail(ID: $ID){
            _id
            Titre
            Type
            Categorie{
                Titre
                _id
            }
            Adresse
            Description
            Attachements{
                Lien
                Nom
                Type
            }
            Etiquesttes
            MinSalaire
            MaxSalaire
            CreatedAt
            Compte{
                Username
                _id
                Image
            }
            DateExperation
        }
    }
`;




