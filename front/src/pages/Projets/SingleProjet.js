import React from 'react'
import Header from "../../components/Header";
import {Link} from "react-router-dom"
import Footer from "../../components/Footer2"
import ListEncheres from "./ListEncheres"

import EncheresForm from "./EncheresForm"

import moment from "moment"
import {Waypoint} from "react-waypoint"
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {useStoreState} from "easy-peasy"
import {FRONT_END_URL} from "../../constants"
import 'moment-precise-range-plugin'

const SingleProjetPage = ({props}) => { 
    
    React.useEffect(()=>{window.scrollTo(0,0)},[]);
    
    let logo = FRONT_END_URL;
    const {loading, data, error,fetchMore } = useQuery(QUERY_PROJET,{variables: {ID: props.match.params.id,Skip: 0,Limit: 5}});
    const {laoding: loadingEnche, data: dataEnche,refetch:getEncherAgain} = useQuery(QUERY_ENCHE,{variables: { ID: props.match.params.id}});
    
    const userData = useStoreState(state=>state.compte.Data);
    const [CanEnchere,setCanEnchere] = React.useState(false);
    const [DoRefetch,setDoRefetch]   = React.useState(0);
    
    if(DoRefetch===1){
        getEncherAgain();
        setDoRefetch(0);
    }
    
    if(loading||error){
        return <><Header transparent={false} path="projet" /></>;
    }else if(data) {
        if(data.getProjet.Compte.Image){
            logo = data.getProjet.Compte.Image;
        }else {
            if(data.getProjet.Compte.TypeCompte==="Utilisateur"){
                logo += "images/user-avatar-placeholder.png";
            }else {
                logo += "images/company-logo-placeholder.png";
            }
        }
    
        return ( 
            <>
                <Header transparent={false} path="projet" />
                    
                <div className="single-page-header" data-background-image={FRONT_END_URL+"images/single-job.jpg"}>
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
                                            <h3>{data.getProjet.Titre}</h3>
                                            <h5>À propos</h5>
                                            <ul>
                                                <li>
                                                    <a href="single-company-profile.html">
                                                        <i className="icon-material-outline-business" />
                                                        {data.getProjet.Compte.Username}
                                                    </a>
                                                </li>
                                                <li>
                                                    <div className="star-rating" data-rating="4.9" />
                                                </li>
                                                <li>
                                                    <img
                                                        className="flag"
                                                        src={FRONT_END_URL + "images/flags/"+data.getProjet.Compte.Nationalite+".svg"}
                                                        alt=""
                                                    />    
                                                </li>
                                                <li>
                                                    <div className="verified-badge-with-title">Vérifié</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="right-side">
                                        <div className="salary-box">
                                            <div className="salary-type">Budget du projet</div>
                                                <div className="salary-amount">
                                                    ${data.getProjet.MinBudget} - ${data.getProjet.MaxBudget}
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
                        {/* Content */}
                            <div className="col-xl-8 col-lg-8 content-right-offset">
                            {/* Description */}
                                <div className="single-page-section">
                                    <h3 className="margin-bottom-25">Description</h3>
                                    <p>{data.getProjet.Description}</p>
                                </div>
                                {/* Atachments */}
                                {(data.getProjet.Attachements.length)?(
                                    <div className="single-page-section">
                                    <h3>Attachments</h3>
                                    <div className="attachments-container">          
                                        {
                                            data.getProjet.Attachements.map((ele,i)=>(
                                                <a href={ele.Lien} className="attachment-box ripple-effect">
                                                    <span>{ele.Nom}</span>
                                                    <i>{ele.Type}</i>
                                                </a>
                                            ))
                                        }
                                        
                                    </div>
                                </div>):null}
                                {/* Skills */}
                                {<div className="single-page-section">
                                    <h3>Competeces Requis</h3>
                                    <div className="task-tags">
                                        {data.getProjet.CompetecesRequis.map((ele,i)=>(ele.length>0)&&<span key={i}>{ele}</span>)}
                                    </div>
                                </div>}
                                <div className="clearfix" />
                                    {/* Freelancers Bidding */}
                                    <div className="boxed-list margin-bottom-60">
                                        <div className="boxed-list-headline">
                                            <h3>
                                                <i className="icon-material-outline-group" /> Enchères
                                            </h3>
                                        </div>
                                        <ul className="boxed-list-ul">
                                            <ListEncheres idProjet={props.match.params.id} CanEnchere={CanEnchere} setCanEnchere={setCanEnchere} 
                                            DoRefetch={DoRefetch} setDoRefetch={setDoRefetch}
                                            />                                    
                                        </ul>
                                    </div>
                                </div>
                                {/* Sidebar */}
                                <div className="col-xl-4 col-lg-4">
                                    <div className="sidebar-container">
                                        <div className="countdown green margin-bottom-35">
                                             {moment().preciseDiff(moment((new Date(parseInt(data.getProjet.DateExperation))).toISOString()))}
                                        </div>
                                        <EncheresForm idProjet={props.match.params.id} refetch={getEncherAgain} CanEnchere={CanEnchere} 
                                        setCanEnchere={setCanEnchere} setDoRefetch={setDoRefetch} min={data.getProjet.MinBudget} max={data.getProjet.MaxBudget} compteProjet={data.getProjet.Compte}/>
{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Sidebar Widget */}
                                        {/*<CandidatureForm idProjet={props.match.params.id} refetch={getEncherAgain} min={10} max={30}/>*/}
{/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Sidebar Widget */}
                                    
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
                                                defaultValue={"http://localhost/projet/"+data.getProjet._id}
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
export default SingleProjetPage

const QUERY_PROJET = gql`
    query($ID: ID!){
        getProjet(ID: $ID){
            _id
            Titre
            MinBudget
            MaxBudget
            CompetecesRequis
            TypePayment
            Attachements{
                Lien
                Type
                Nom
            }
            Categorie{
                Titre
                _id
            }
            Adresse
            Description
            CreatedAt
            Compte{
                Username
                _id
                Image
                TypeCompte
            }
            DateExperation
        }
    }
`;
const QUERY_ENCHE = gql`
    query($ID: ID!){
        getEnchereProjet(ID: $ID)
        {
            _id
            Projet{
                Titre
            }
            Compte{
                _id
                Username
                Email
                Image
            }
            PrixMin
            LivraisonTemps
            CreatedAt
        }
    }

`;
