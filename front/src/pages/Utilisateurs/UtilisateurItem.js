import React from 'react'
import {Link} from "react-router-dom"
import A from "../../components/A"
import Skeleton from 'react-loading-skeleton'
import moment from "moment"
import {FRONT_END_URL} from "../../constants"


import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"
 
const UtilisateurItem = (props) => { 
    const {_id,mokeup} = props
    const {loading,error,data} = useQuery(QUERY_UTILISATEUR,{variables:{ID: _id}});
    if(loading||error||mokeup){
        console.log(error);
        return(<LoadingUtilisateur/>)
    }else {
        
    return( 
        <div className="freelancer">
            <div className="freelancer-overview">
                <div className="freelancer-overview-inner">
                    <span className="bookmark-icon" />
                        <div className="freelancer-avatar">
                            <div className="verified-badge" />
                            <Link to={`/Utilisateur/${data.getUtilisateur._id}`}>
                                <img src={data.getUtilisateur.Compte.Image||(FRONT_END_URL+"images/user-avatar-placeholder.png")} alt="" />
                            </Link>
                        </div>
                        <div className="freelancer-name">
                        <h4>
                            <Link to={`/Utilisateur/${data.getUtilisateur._id}`}>
                                {data.getUtilisateur.Prenom} {data.getUtilisateur.Nom} &nbsp;
                                <img className="flag" src={`images/flags/${data.getUtilisateur.Nationalite}.svg`} alt="" title="United Kingdom" data-tippy-placement="top" />
                            </Link>
                        </h4>
                        <span>{data.getUtilisateur.Slogan}</span>
                        <div className="freelancer-rating">
                            <div className="star-rating" data-rating={(Math.random() * (2 - 5) + 5).toFixed(2).toString()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="freelancer-details">
                <div className="freelancer-details-list">
                    <ul>
                        <li>Adresse <strong><i className="icon-material-outline-location-on" /> {data.getUtilisateur.Adresse}</strong></li>
                        <li>Tarif horaire <strong>{data.getUtilisateur.PrixMin} $</strong></li>
                        <li> Enchères gagnée<strong>90%</strong></li>
                    </ul>
                </div>
                <Link to={`/Utilisateur/${data.getUtilisateur._id}`} className="button button-sliding-icon ripple-effect">
                    Voir le profile <i className="icon-material-outline-arrow-right-alt" />
                </Link>
            </div>
        </div>
    )}
} 
export default UtilisateurItem

const QUERY_UTILISATEUR = gql`
    query($ID: ID!){
        getUtilisateur(ID: $ID){
            _id
            Nom
            Prenom
            DateNaissance
            Sexe
            PrixMin
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
const LoadingUtilisateur = ()=>(
    <>
    <div className="freelancer">
        <div className="freelancer-overview">
            <div className="freelancer-overview-inner">
                <span className="bookmark-icon" />
                <div className="freelancer-avatar">
                    <div style={{
                        bottom: -100,
                        right: -80,
                        position: "relative",
                        height: "25px",
                        width: "25px",
                        display: "inline-block",
                        borderRadius: "50%",
                        textAlign: "center",
                        zIndex: 10,
                        fontWeight: 500,
                    }}><Skeleton width={25} height={25} circle/></div>
                    <A ><Skeleton width={100} height={100} circle/></A>
                </div>
                <div className="freelancer-name">
                    <h4>
                        <A>
                            <Skeleton width={150} height={20}/> <Skeleton width={25} height={20}/>
                        </A>
                    </h4>
                    <span><Skeleton width={130} height={18}/></span>
                    <div className="freelancer-rating">
                        <Skeleton width={50} height={30}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="freelancer-details">
            <div className="freelancer-details-list">
                <ul>
                    <li><Skeleton width={80} height={18}/> <strong><Skeleton width={70} height={20}/></strong></li>
                    <li><Skeleton width={60} height={18}/> <strong><Skeleton width={70} height={18}/></strong></li>
                    <li><Skeleton width={90} height={18}/> <strong><Skeleton width={60} height={18}/></strong></li>
                </ul>
            </div>
            <A className="button button-sliding-icon ripple-effect">
                &nbsp;&nbsp;&nbsp;&nbsp;
            </A>
        </div>
    </div>
    </>
);
