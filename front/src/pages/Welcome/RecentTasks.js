import React from 'react'

import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

import Skeleton from 'react-loading-skeleton'
import A from "../../components/A"
import {Link } from "react-router-dom"
import moment from "moment"


const RecentTasks = (props) => {
    
    // const {loading:loadingCat,data:dataCat,error:errorCat} = useQuery(QUERY_CATEGORIES);
    const {loading,error,data} = useQuery(QUERY_TRAVAIL);
    
    return(
        <>
        <div className="section gray margin-top-45 padding-top-65 padding-bottom-75">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                    
                        <div className="section-headline margin-top-0 margin-bottom-35">
                            <h3>Les projets récents</h3>
                            <a href="tasks-list-layout-1.html" className="headline-link">Parcourir toutes les projets</a>
                        </div>
                        
                        <div className="tasks-list-container compact-list margin-top-35">
                            {
                                (loading||error)?
                                    [1,2,3,4,5,6,7,8].map(ele=>(<TaskItem key={ele} loading={loading||error}/>))
                                    :
                                    (data.getWelcomeData.DerniereProjets.splice(0, 10)).map(ele=>(<TaskItem key={ele._id} data={ele}/>))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default RecentTasks

const TaskItem = (props) => {
    const {loading,data} = props
    if(loading){
        return (
            <>
            <A className="task-listing">
                {/* Job Listing Details */}
                <div className="task-listing-details">
                    {/* Details */}
                    <div className="task-listing-description">
                        <h3 className="task-listing-title"><Skeleton height={30}/></h3>
                        <ul className="task-icons">
                            <li><i className="icon-material-outline-access-time" /> <Skeleton height={20} width={120} /></li>
                            <li><i className="icon-material-outline-location-on" /> <Skeleton height={20} width={120}/></li>
                        </ul>
                        <Skeleton height={40}/>            
                    </div>
                </div>
                <div className="task-listing-bid">
                    <div className="task-listing-bid-inner">
                        <div className="task-offers">
                            <strong><Skeleton height={30} width={180}/></strong>
                            <span className="margin-top-15"><Skeleton height={20}  width={180}/></span>
                        </div>
                        <Skeleton height={50}  width={180}/>
                    </div>
                </div>
            </A>
            </>    
        );
    }
    return(
        <>
        <Link to={`/projet/${data._id}`} href="single-task-page.html" className="task-listing">
            <div className="task-listing-details">
                <div className="task-listing-description">
                    <h3 className="task-listing-title">{data.Titre}</h3>
                    <ul className="task-icons">
                        <li><i className="icon-material-outline-location-on" /> {data.Adresse}</li>
                        <li><i className="icon-material-outline-access-time" /> {moment((new Date(parseInt(data.CreatedAt))).toISOString()).fromNow()}</li>
                    </ul>
                    <div className="task-tags margin-top-15">
                        {
                            data.CompetecesRequis.map((ele,i)=>{
                                return (ele.trim().length>0)?<span key={i}>{ele}</span>:null;
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="task-listing-bid">
                <div className="task-listing-bid-inner">
                    <div className="task-offers">
                        <strong>${data.MinBudget} - ${data.MaxBudget}</strong>
                        <span>{(data.TypePayment==="fixe")?"Prix fixe":"Tarif horaire"}</span>
                    </div>
                    <span className="button button-sliding-icon ripple-effect">Offrez maintenant<i className="icon-material-outline-arrow-right-alt" /></span>
                </div>
            </div>
        </Link>
        </>
    )
}
// const QUERY_CATEGORIES = gql`
//     query{
//         getWelcomeData{
//             DerniereProjets{
//                 Titre
//                 _id
//             }
//         }
//     }
// `;
 const QUERY_TRAVAIL = gql`
     query{
         getWelcomeData{
             DerniereProjets{
                 _id
                 Titre
                 Adresse
                 CreatedAt
                 MinBudget
                 MaxBudget
                 CompetecesRequis
                 TypePayment     
             }
         }
     }
`;
                 
                 
