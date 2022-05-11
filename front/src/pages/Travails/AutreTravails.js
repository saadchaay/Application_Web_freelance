import React from 'react'
import moment from "moment"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"
import {Link} from "react-router-dom"
import gql from "graphql-tag"


 
const AutreTravails = ({idCompte}) => { 
    
    const [TravailsByCompte,{called,loading:laodingTC, data: dataTC, error:errorTC}] = useLazyQuery(QUERY_TRAVAIL_By_Compte);    
    
    if((!called)&&idCompte){
        TravailsByCompte({variables:{ID: idCompte}});
    }
    if(dataTC){
        return (
            <> 
            {
                dataTC.getTravailsByCompte.map(ele=>(
                    <Link to={"/travail/"+ele._id} className="job-listing" key={ele._id}>
                        <div className="job-listing-details">                        
                            <div className="job-listing-company-logo">
                                <img src={ele.Compte.Image||(FRONT_END_URL+"images/company-logo-placeholder.png")} alt="" />
                            </div>
                            <div className="job-listing-description">
                                <h4 className="job-listing-company">{ele.Compte.Username}
                                    <span className="verified-badge" title="Verified Employer" data-tippy-placement="top" />
                                </h4>
                                <h3 className="job-listing-title">{ele.Titre}</h3>
                            </div>
                        </div>
                        <div className="job-listing-footer">
                            <ul>
                                <li>
                                    <i className="icon-material-outline-location-on" /> {ele.Adresse}
                                </li>
                                <li>
                                    <i className="icon-material-outline-business-center" /> {ele.Type}
                                </li>
                                <li>
                                    <i className="icon-material-outline-account-balance-wallet" /> ${ele.MinSalaire} - ${ele.MaxSalaire}
                                </li>
                                <li>
                                    <i className="icon-material-outline-access-time" /> {moment((new Date(parseInt(ele.CreatedAt))).toISOString()).fromNow()}
                                </li>
                            </ul>
                        </div>
                    </Link>
                ))
            }
            </>
        );
    }
    
    
    return( 
        <>
        </> 
    ) 
} 
export default AutreTravails

const QUERY_TRAVAIL_By_Compte = gql`
    query($ID: ID!){
        getTravailsByCompte(ID:$ID){_id
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