import React from 'react'
import {Link} from "react-router-dom"
import A from "../../components/A"
import Skeleton from 'react-loading-skeleton'
import moment from "moment"
import {FRONT_END_URL} from "../../constants"


import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

const EntrepriseItem = (props) => { 
    const {_id,mokeup} = props
    const {loading,error,data} = useQuery(QUERY_ENTREPRISE,{variables:{ID: _id}});
    
    if(loading||error||mokeup){
        return(<LoadingUtilisateur/>)
    }else {
        
        
    return( 
        <div className="freelancer">
            <div className="freelancer-overview">
                <div className="freelancer-overview-inner">
                    <span className="bookmark-icon" />
                        <div className="freelancer-avatar">
                            <div className="verified-badge" />
                            <a href={`/Entreprise/${data.getEntreprise._id}`}>
                                <img src={data.getEntreprise.Compte.Image||(FRONT_END_URL+"images/company-logo-placeholder.png")} alt="" />
                            </a>
                        </div>
                        <div className="freelancer-name">
                        <h4>
                            <Link to={`/Entreprise/${data.getEntreprise._id}`}>
                                {data.getEntreprise.Prenom} {data.getEntreprise.Denomination} &nbsp;
                                <img className="flag" src={`images/flags/${data.getEntreprise.Nationalite}.svg`} alt="" title="United Kingdom" data-tippy-placement="top" />
                            </Link>
                        </h4>
                        <span>{data.getEntreprise.Slogan}</span>
                        <div className="freelancer-rating">
                            <div className="star-rating" data-rating={(Math.random() * (2 - 5) + 5).toFixed(2).toString()} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="freelancer-details">
                <div className="freelancer-details-list">
                    
                </div>
                <a href={`/Entreprise/${data.getEntreprise._id}`} className="button button-sliding-icon ripple-effect">
                    Voir le profile <i className="icon-material-outline-arrow-right-alt" />
                </a>
            </div>
        </div>
    )} 
}
export default EntrepriseItem

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
                {/**the commented foe here*/}
            </div>
            <A className="button button-sliding-icon ripple-effect">
                &nbsp;&nbsp;&nbsp;&nbsp;
            </A>
        </div>
    </div>
    </>
);
// <ul>
//     <li><Skeleton width={80} height={18}/> <strong><Skeleton width={70} height={20}/></strong></li>
//     <li><Skeleton width={60} height={18}/> <strong><Skeleton width={70} height={18}/></strong></li>
//     <li><Skeleton width={90} height={18}/> <strong><Skeleton width={60} height={18}/></strong></li>
// </ul>