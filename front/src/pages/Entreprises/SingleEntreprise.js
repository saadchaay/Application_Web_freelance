import React from 'react'
import Header from "../../components/Header";
import {Link} from "react-router-dom"
import Footer from "../../components/Footer2"
import moment from "moment"
import {Waypoint} from "react-waypoint"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"
import ListTravailsEntreprise from "./ListTravailsEntreprise"

const SingleEntreprisePage = ({props}) => { 
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    
    const [ModalOn,setModalOn] = React.useState(false);
     
    const {loading,error,data} = useQuery(QUERY_ENTREPRISE,{variables:{ID: props.match.params.id}});
    
    if(loading||error){
        return <><Header transparent={false} path="entreprise" /></>;
    }else if(data) {
        
        const logo = data.getEntreprise.Compte.Image||FRONT_END_URL+"images/company-logo-placeholder.png";
        
        return( 
            <>
                {ModalOn&&<ModalTab setModalOn={setModalOn} Entreprise={data.getEntreprise.Denomination}/>}
                <Header transparent={false} path="entreprise" />
                

                <div className="single-page-header" data-background-image={FRONT_END_URL+"images/single-company.jpg"}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="single-page-header-inner">
                                    <div className="left-side">
                                        <div className="header-image">
                                            <img src={logo} alt="" />
                                        </div>
                                        <div className="header-details">
                                            <h3>
                                                {data.getEntreprise.Denomination}  <span>{data.getEntreprise.Slogan}</span>
                                            </h3>
                                            <ul>
                                                <li>
                                                    <div className="star-rating" data-rating="4.2" />
                                                </li>
                                                <li>
                                                    <img className="flag" src={FRONT_END_URL+"images/flags/"+(data.getEntreprise.Nationalite||"ma")+".svg"} alt="" />
                                                </li>
                                                <li>
                                                    <div className="verified-badge-with-title">Verified</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="right-side">
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
                            <div className="single-page-section">
                                <h3 className="margin-bottom-25">à propos</h3>
                                <p>{data.getEntreprise.Description}</p>
                            </div>
                            {/* Boxed List */}
                            <div className="boxed-list margin-bottom-60">
                                <div className="boxed-list-headline">
                                    <h3>
                                        <i className="icon-material-outline-business-center" /> les Travails poster
                                    </h3>
                                </div>
                                
                                <div className="listings-container compact-list-layout">
                                    
                                    {<ListTravailsEntreprise idCompte={data.getEntreprise.Compte._id}/>}
                                    
                                </div>
                                </div>
                                    <div className="boxed-list margin-bottom-60">
                                        <div className="boxed-list-headline">
                                            <h3>
                                                <i className="icon-material-outline-thumb-up" /> Reviews
                                            </h3>
                                        </div>
                                        <ul className="boxed-list-ul">
                                            
                                            <li>
                                                <div className="boxed-list-item">
                                                    <div className="item-content">
                                                        <h4>
                                                            Faire les choses correctement <span>saad chaay</span>
                                                        </h4>
                                                        <div className="item-details margin-top-10">
                                                            <div className="star-rating" data-rating={5.0} />
                                                            <div className="detail-item">
                                                                <i className="icon-material-outline-date-range" /> Avril 2020
                                                            </div>
                                                        </div>
                                                        <div className="item-description">
                                                        <p>
                                                        Grande entreprise et particulièrement idéale pour les professionnels
                                                        individuel. L'entreprise est assez grande pour offrir une variété
                                                        d'emplois dans toutes sortes d'endroits intéressants. Même si vous
                                                        ne changez jamais de rôle, votre travail change et évolue
                                                        l'entreprise se développe, gardant les choses fraîches.
                                                        </p>
                                                    </div>
                                                </div>                
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="centered-button margin-top-35">
                                        <a
                                            href="/" onClick={e=>{
                                                e.preventDefault();
                                                setModalOn(true);
                                            }}
                                            className="popup-with-zoom-anim button button-sliding-icon"
                                        >
                                            Laisser un avis{" "}
                                            <i className="icon-material-outline-arrow-right-alt" />
                                        </a>              
                                    </div>
                                </div>
                                {/* Boxed List / End */}
                            </div>
                            {/* Sidebar */}
                            <div className="col-xl-4 col-lg-4">
                                <div className="sidebar-container">
                                {/* Location */}
                                    <div className="sidebar-widget">
                                        <h3>Adresse</h3>
                                        <div id="single-job-map-container">
                                            sdfg
                                        </div>
                                    </div>
                                    {/* Widget */}
                                    <div className="sidebar-widget">
                                        <h3>Profils sociaux</h3>
                                        <div className="freelancer-socials margin-top-25">
                                            <ul>
                                                <li>
                                                    <a href="#" title="Dribbble" data-tippy-placement="top">
                                                        <i className="icon-brand-dribbble" />
                                                    </a>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Sidebar Widget */}
                                    <div className="sidebar-widget">
                                        <h3>Marque page</h3>
                                        {/* Bookmark Button */}
                                        <button className="bookmark-button margin-bottom-25">
                                            <span className="bookmark-icon" />
                                            <span className="bookmark-text">Marquer</span>
                                            <span className="bookmarked-text">marqué</span>
                                        </button>
                                        {/* Copy URL */}
                                        <div className="copy-url">
                                            <input
                                                id="copy-url"
                                                type="text"
                                                defaultValue={"http://localhost/entreprise/"+data.getEntreprise._id}
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
        
        
        
        
        
</> 
        ) 
    }
}
export default SingleEntreprisePage

const QUERY_ENTREPRISE = gql`
    query($ID: ID!){
        getEntreprise(ID: $ID){
            _id
            Denomination
            DateCreation
            ChiffreAffaire
            EmailContact
            Adresse
            Nationalite
            Description
            StatueJuridique
            Tele
            ArrierePlan
            CreatedAt
            UpdatedAt
            Compte{
                _id
                Username
                Image
            }
            CountTravailsPoster
        }
    }
`;
const ModalTab = ({setModalOn,Entreprise})=>{
    let height = window.screen.height /2 -20; 
    let scroll = window.scrollY;
    
    return (
        <> 
        <div className="mfp-bg my-mfp-zoom-in mfp-ready"/>
        <div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabindex="-1" 
            style={{top: scroll+"px", position: "absolute",height: height+"px"}}
        >
            <div className="mfp-container mfp-inline-holder">
                <div className="mfp-content">
                    <div id="small-dialog" className="zoom-anim-dialog dialog-with-tabs">
                        <div className="sign-in-form">
                            <ul className="popup-tabs-nav" style={{pointerEvents: "none"}}>
                                <li className="active"><a href="#tab">Laisser un avis</a></li>
                            </ul>
                            <div className="popup-tabs-container">
                                <div className="popup-tab-content" id="tab">
                                    <div className="welcome-text">
                                        <h3>Comment est l'environnement de travail chez {Entreprise}?</h3>
                                        <form method="post" id="leave-company-review-form">
                                            <div className="clearfix"/>
                                            <div className="leave-rating-container">
                                                <div className="leave-rating margin-bottom-5">
                                                    <input type="radio" name="rating" id="rating-1" value="1" required=""/>
                                                    <label for="rating-1" className="icon-material-outline-star"></label>
                                                    <input type="radio" name="rating" id="rating-2" value="2" required=""/>
                                                    <label for="rating-2" className="icon-material-outline-star"></label>
                                                    <input type="radio" name="rating" id="rating-3" value="3" required=""/>
                                                    <label for="rating-3" className="icon-material-outline-star"></label>
                                                    <input type="radio" name="rating" id="rating-4" value="4" required=""/>
                                                    <label for="rating-4" className="icon-material-outline-star"></label>
                                                    <input type="radio" name="rating" id="rating-5" value="5" required=""/>
                                                    <label for="rating-5" className="icon-material-outline-star"></label>
                                                </div>
                                            </div>
                                            <div className="clearfix"/>
                                        </form>
                                    </div>
                                    <div className="row">
                                        
                                        <div className="col-xl-12">
                                            <div className="input-with-icon-left">
                                                <i className="icon-material-outline-rate-review"/>
                                                    <input type="text" className="input-text with-border" name="reviewtitle" id="reviewtitle" 
                                                        placeholder="Title de Review" required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <textarea className="with-border" placeholder="Review" name="message" id="message" cols="7" required/>
                                        <button className="button margin-top-35 full-width button-sliding-icon ripple-effect" atype="submit" 
                                            aform="leave-company-review-form"
                                            onClick={e=>{setModalOn(false)}}
                                        >
                                            Laisser un avis <i className="icon-material-outline-arrow-right-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button title="Close (Esc)" type="button" className="mfp-close" onClick={e=>{setModalOn(false)}}></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}