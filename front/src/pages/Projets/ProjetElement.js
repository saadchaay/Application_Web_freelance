import React from 'react'
import {Link} from "react-router-dom"
import A from "../../components/A"
import Skeleton from 'react-loading-skeleton'
import moment from "moment"

import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

 
const ProjetElement = (props) => { 
    const {_id,mokeup} = props
    const {loading,error,data} = useQuery(QUERY_TRAVAIL,{variables:{ID: _id}});
    if(mokeup){
        return(<LoadingProjet/>)
    }
    if(loading||error){
        return(<LoadingProjet/>)
    }else {
        return( 
            <>
                <Link to={`/projet/${data.getProjet._id}`} className="task-listing">
                    <div className="task-listing-details">
                        <div className="task-listing-description">
                            <h3 className="task-listing-title">{data.getProjet.Titre}</h3>
                            <ul className="task-icons">
                                <li><i className="icon-material-outline-location-on" /> {data.getProjet.Adresse}</li>
                                <li><i className="icon-material-outline-access-time" /> {moment((new Date(parseInt(data.getProjet.CreatedAt))).toISOString()).fromNow()}</li>
                            </ul>
                            <p className="task-listing-text">
                                {(data.getProjet.Description).substring(0,300)+" ..."}
                            </p>
                            <div className="task-tags">
                                {
                                    data.getProjet.CompetecesRequis.map((ele,i)=>(ele.length?<span key={i}>{ele}</span>:null))
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="task-listing-bid">
                        <div className="task-listing-bid-inner">
                            <div className="task-offers">
                                <strong>${data.getProjet.MinBudget}-${data.getProjet.MaxBudget}</strong>
                                <span>{data.getProjet.TypePayment}</span>
                            </div>
                            <span className="button button-sliding-icon ripple-effect">
                                Enchérir maintenant <i className="icon-material-outline-arrow-right-alt" />
                            </span>
                        </div>
                    </div>
                </Link>
            </>
        )
    }
} 
export default ProjetElement

const QUERY_TRAVAIL = gql`
    query($ID: ID!){
        getProjet(ID: $ID){
            _id
            Titre
            TypePayment
            Categorie{
                Titre
                _id
            }
            Adresse
            Description
            CompetecesRequis
            MinBudget
            MaxBudget
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
const LoadingProjet = ()=>(
    <>
    <A  className="task-listing">
        <div className="task-listing-details">
            <div className="task-listing-description">
                <h3 className="task-listing-title"><Skeleton width={300} height={27}/></h3>
                <ul className="task-icons">
                    <Skeleton width={355} height={20}/>
                </ul>
                <p className="task-listing-text"><Skeleton count={3}/></p>
                <div style={{margin: "23px 0 3px 0"}}>
                    <Skeleton width={355} height={35}/>
                </div>
            </div>
        </div>
        <div className="task-listing-bid">
            <div className="task-listing-bid-inner">
                <div className="task-offers">
                    <Skeleton height={60}/>
                </div>
                <Skeleton width={170} height={45}/>
            </div>
        </div>
    </A>
    </>
);