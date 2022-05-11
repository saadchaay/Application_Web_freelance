import React from 'react'
import Header from "../../components/Header";
import {Link} from "react-router-dom"
import Footer from "../../components/Footer2"
// import ProjetElement from "./ProjetElement"
import moment from "moment"
import {Waypoint} from "react-waypoint"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"
import include  from "../../utils/includer.js"

const SingleUtilisateurPage = ({props}) => {
     
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    include(['bundleA'], function() {
        include(['bundleB'], function() {
            include(['bundleC'], function() {
                include(['bundleD'], function() {
                    
                });
            });
        });
    });
    const {loading,error,data} = useQuery(QUERY_UTILISATEUR,{variables:{ID: props.match.params.id}});
    if(loading||error){
        return <h1>loading ...</h1>;
    }else if(data) {
        const avatar = (data.getUtilisateur.Compte.Image)?data.getUtilisateur.Compte.Image:(FRONT_END_URL+"images/user-avatar-placeholder.png");
    
        return ( 
            <>
                <Header transparent={false} path="utilisateur" />
                
                <div className="single-page-header freelancer-header" data-background-image={FRONT_END_URL+"images/single-freelancer.jpg"}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="single-page-header-inner">
                                    <div className="left-side">
                                        <div className="header-image freelancer-avatar"><img src={avatar} alt="" />
                                    </div>
                                    <div className="header-details">
                                        <h3>{data.getUtilisateur.Prenom} {data.getUtilisateur.Nom} 
                                            <span>{data.getUtilisateur.Slogan}</span>
                                        </h3>
                                        <ul>
                                            <li>
                                                <div className="star-rating" data-rating={(Math.random() * (2 - 5) + 5).toFixed(2).toString()} />
                                            </li>
                                            <li>
                                                <img className="flag" src={`${FRONT_END_URL}images/flags/${data.getUtilisateur.Nationalite}.svg`} alt="" />
                                            </li>
                                            <li><div className="verified-badge-with-title">Vérifié</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container">
                <div className="row">
                    {/* Content */}
                    <div className="col-xl-8 col-lg-8 content-right-offset">
                    {/* Page Content */}
                        <div className="single-page-section">
                            <h3 className="margin-bottom-25">À propos de moi</h3>
                            <p>{data.getUtilisateur.Description}</p>
                        </div>
                        {/* Boxed List */}
                        <div className="boxed-list margin-bottom-60">
                            <div className="boxed-list-headline">
                                <h3><i className="icon-material-outline-thumb-up" /> Historique de projets et rétroaction</h3>
                            </div>
                            
                            <ul className="boxed-list-ul">
                            
                                <li>
                                    <div className="boxed-list-item">
                                    {/* Content */}
                                        <div className="item-content">
                                            <h4>reparer un code php<span>Rated as Freelancer</span></h4>
                                            <div className="item-details margin-top-10">
                                                <div className="star-rating" data-rating={5.0} />
                                                <div className="detail-item"><i className="icon-material-outline-date-range" /> </div>
                                            </div>
                                            <div className="item-description">
                                                <p></p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                            <div className="clearfix" />
        
                            </div>
                            {/* Boxed List */}
                            <div className="boxed-list margin-bottom-60">
                                <div className="boxed-list-headline">
                                    <h3><i className="icon-material-outline-business" /> Histoire de l'emploi</h3>
                                </div>
                                <ul className="boxed-list-ul">
                                    <li>
                                        <div className="boxed-list-item">
                                            <div className="item-image">
                                                <img src="images/browse-companies-03.png" alt="" />
                                            </div>
                                            <div className="item-content">
                                                <h4>Travail 0</h4>
                                                <div className="item-details margin-top-7">
                                                    <div className="detail-item">
                                                        <a href="#"><i className="icon-material-outline-business" /> youssef production</a>
                                                    </div>
                                                    <div className="detail-item">
                                                        <i className="icon-material-outline-date-range" /> Avril 2020 - Present
                                                    </div>
                                                </div>
                                                <div className="item-description">
                                                    <p>description description description description ...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* Boxed List / End */}
                        </div>
                        {/* Sidebar */}
                        <div className="col-xl-4 col-lg-4">
                            <div className="sidebar-container">
                                {/* Profile Overview */}
                                <div className="profile-overview">
                                    <div className="overview-item">
                                        <strong>{data.getUtilisateur.PrixMin}$</strong><span>Tarif horaire</span>
                                    </div>
                                    <div className="overview-item"><strong>2</strong><span>Projets terminés</span></div>
                                    <div className="overview-item"><strong>1</strong><span>Réembauché</span></div>
                                </div>
                                {/* Button */}
                                <a href="#small-dialog" className="apply-now-button popup-with-zoom-anim margin-bottom-50">
                                    Faire une offre <i className="icon-material-outline-arrow-right-alt" />
                                </a>
                                {/* Freelancer Indicators */}
                                <div className="sidebar-widget">
                                    <div className="freelancer-indicators">
                                    {/* Indicator */}
                                        <div className="indicator">
                                            <strong>88%</strong>
                                            <div className="indicator-bar" data-indicator-percentage="80"><span /></div>
                                                <span>Réussite de l'projet</span>
                                            </div>
                                            {/* Indicator */}
                                            <div className="indicator">
                                                <strong>100%</strong>
                                                <div className="indicator-bar" data-indicator-percentage={100}><span /></div>
                                                    <span>Recommandation</span>
                                                </div>
                                                {/* Indicator */}
                                                <div className="indicator">
                                                    <strong>90%</strong>
                                                    <div className="indicator-bar" data-indicator-percentage={90}><span />
                                                </div>
                                                <span>À temps</span>
                                            </div>	
                                            {/* Indicator */}
                                            <div className="indicator">
                                                <strong>80%</strong>
                                                <div className="indicator-bar" data-indicator-percentage={80}><span /></div>
                                                <span>Sur le budget</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Widget */}
                                    <div className="sidebar-widget">
                                        <h3>Skills</h3>
                                        <div className="task-tags">
                                        {
                                            (data.getUtilisateur.Competeces)&&(data.getUtilisateur.Competeces.map((ele,i)=>(<span key={i}>{ele}</span>)))
                                        }
                                        </div>
                                    </div>
                                    {/* Widget */}
                                    <div className="sidebar-widget">
                                        <h3>Attachments</h3>
                                        <div className="attachments-container">
                                        {(data.getUtilisateur.Attachments)&&(data.getUtilisateur.Attachments.map((ele,i)=>(
                                            <a href="#" className="attachment-box ripple-effect" key={i}><span>{ele}</span><i></i></a>
                                        )))}
                                        </div>
                                    </div>
                                    {/* Sidebar Widget */}
                                    <div className="sidebar-widget">
                                        <h3>marque-page</h3>
                                        {/* Bookmark Button */}
                                        <button className="bookmark-button margin-bottom-25">
                                            <span className="bookmark-icon" />
                                            <span className="bookmark-text">marque-page</span>
                                            <span className="bookmarked-text">Bookmarked</span>
                                        </button>
                                        {/* Copy URL */}
                                        <div className="copy-url">
                                            <input id="copy-url" type="text" defaultValue={"http://localhost/utilisateur/"+data.getUtilisateur._id} className="with-border" />
                                            <button className="copy-url-button ripple-effect" data-clipboard-target="#copy-url" title="Copy to Clipboard" data-tippy-placement="top"><i className="icon-material-outline-file-copy" /></button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </> 
        )
    } 
} 
export default SingleUtilisateurPage

const QUERY_UTILISATEUR = gql`
    query($ID: ID!){
        getUtilisateur(ID: $ID){
            _id
            Nom
            Prenom
            DateNaissance
            Sexe
            PrixMin
            Competences
            Nationalite
            Compte{
                _id
                Username
                Image
            }
            Adresse
            Slogan
            Description
            Tele
            ArrierePlan
            CreatedAt
            UpdatedAt
        }
    }
`;