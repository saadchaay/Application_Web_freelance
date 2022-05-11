import React from 'react'
import {Link} from "react-router-dom"
import moment from "moment"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants" 
import A from "../../components/A"

const ListTravailsEntreprise = ({idCompte}) => { 

    const {loadig,data,error} = useQuery(QUERY,{variables:{ID: idCompte}})
    if(data){
        if(data.getTravailsByCompte.length===0){
            return <A className="job-listing"><h3>Aucune resultats</h3></A>;
        }
        return( 
            <>
            {data.getTravailsByCompte.map(ele=>(
                <Link to={"/travail/"+ele._id} className="job-listing">
                    <div className="job-listing-details">
                        {/* Details */}
                        <div className="job-listing-description">
                            <h3 className="job-listing-title">{ele.Titre}</h3>
                            {/* Job Listing Footer */}
                            <div className="job-listing-footer">
                                <ul>
                                    <li>
                                        <i className="icon-material-outline-location-on" />{ele.Adresse}
                                    </li>
                                    <li>
                                        <i className="icon-material-outline-business-center" /> {ele.Type}
                                    </li>
                                    <li>                
                                        <i className="icon-material-outline-access-time" /> {moment((new Date(parseInt(ele.CreatedAt))).toISOString()).fromNow()}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <span className="bookmark-icon" />
                </Link>
            ))}
            </> 
        ) 
    }
    return(<></>) 
} 
export default ListTravailsEntreprise

const QUERY= gql`
    query($ID: ID!){
        getTravailsByCompte(ID: $ID){
            _id
            Titre
            Type
            Adresse
            CreatedAt
        }
    }
`