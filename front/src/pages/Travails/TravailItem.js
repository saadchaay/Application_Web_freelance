import React from 'react'
import {Link} from "react-router-dom"
import A from "../../components/A"
import Skeleton from 'react-loading-skeleton'
import moment from "moment"
import {FRONT_END_URL} from "../../constants"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

const TravailItem = (props) => {
    const {_id,mokeup} = props
    
    const {loading,error,data} = useQuery(QUERY_TRAVAIL,{variables:{ID: _id}});
    let logo = FRONT_END_URL;
    if(mokeup){
        return(<LoadingTrav/>)
    }
    if(loading||error){
        return(<LoadingTrav/>)
    }else {
        if(data.getTravail.Compte.Image){
            logo = data.getTravail.Compte.Image;
        }else {
            logo += "images/company-logo-placeholder.png";
        }
        
        return( 
            <>
                <Link to={`/travail/${data.getTravail._id}`} className="job-listing">
                    <div className="job-listing-details">
                        <div className="job-listing-company-logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="job-listing-description">
                            <h4 className="job-listing-company">
                                {data.getTravail.Compte.Username} <span className="verified-badge" title="Verified Employer" data-tippy-placement="top" />
                            </h4>
                            <h3 className="job-listing-title">{data.getTravail.Titre}</h3>
                            <p className="job-listing-text">
                                {(data.getTravail.Description).substring(0,300)+" ..."}
                            </p>
                        </div>
                        <span className="bookmark-icon" />
                    </div>
                    <div className="job-listing-footer">
                        <ul>
                            <li><i className="icon-material-outline-location-on" /> {data.getTravail.Adresse}</li>
                            <li><i className="icon-material-outline-business-center" /> {data.getTravail.Titre}</li>
                            <li><i className="icon-material-outline-account-balance-wallet" /> ${data.getTravail.MinSalaire}-${data.getTravail.MaxSalaire}</li>
                            <li><i className="icon-material-outline-access-time" /> {moment((new Date(parseInt(data.getTravail.CreatedAt))).toISOString()).fromNow()}</li>
                        </ul>
                    </div>
                </Link>
            </>
        )
    }
} 
export default TravailItem
        
const QUERY_TRAVAIL = gql`
    query($ID: ID!){
        getTravail(ID: $ID){
            _id
            Titre
            Type
            Categorie{
                _id
                Titre
            }
            Adresse
            Description
            Attachements{
                Lien
                Type
                Nom
            }
            Etiquesttes
            MinSalaire
            MaxSalaire
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
const LoadingTrav = ()=>(
    <>
        <A className="job-listing">
            <div className="job-listing-details">
                <div className="job-listing-company-logo"><Skeleton width={55} height={55}/></div>
                <div className="job-listing-description">
                    <h4 className="job-listing-company"><Skeleton width={255}/></h4>
                    <h3 className="job-listing-title"><Skeleton width={355} height={25}/></h3>
                    <p className="job-listing-text"><Skeleton count={3}/></p>
                </div>
                <Skeleton width={39} height={39} circle/>
            </div>
            <div className="job-listing-footer"><Skeleton height={25}/></div>
        </A>
    </>
);
