import React from 'react'
import Header from "../components/Header";
import SideBar from "../components/Sidebar"
import {Link} from "react-router-dom"
import Footer from "../components/Footer2"
import A from "../components/A"
import gql from "graphql-tag"
import {useQuery,useLazyQuery} from "@apollo/react-hooks"
import {useStoreState} from "easy-peasy"
import moment from "moment"

const Manage = (props) => { 
    const userData = useStoreState(state=>state.compte.Data);
    const {loading,data,error} = useQuery(QUERY_MY_TR,{variables:{ID: userData.ID}});    
    if(loading ||error )return <Header transparent={false}/> ;
    
    
    return( 
        <>
            <Header transparent={false}/>
            <div className="dashboard-container">
                <SideBar page="dashboard"/>
                    <div className="dashboard-content-container" data-simplebar>
                        <div className="dashboard-content-inner" astyle={{padding:"10px 10px 0px 10px"}}>
                            <div className="row">            
                                
                                <div className="col-xl-12">
                                    <div className="dashboard-box margin-top-0">
                                        <div className="headline">
                                            <h3>
                                                <i className="icon-material-outline-business-center" /> Mes listes des travails
                                            </h3>
                                        </div>
                                        <div className="content">
                                            <ul className="dashboard-box-list">
                                                {(data.getTravailsByCompte.length===0)&&<li> Aucune Resultats</li>}
                                                
                                                {data.getTravailsByCompte.map(ele=>(
                                                    <li key={ele._id}>
                                                        <div className="job-listing">
                                                            <div className="job-listing-details">
                                                            {/*<img src="images/company-logo-05.png" alt=""></a> */}
                                                                <div className="job-listing-description">
                                                                    <h3 className="job-listing-title">
                                                                        <Link to={"/travail/"+ele._id}>{ele.Titre}</Link>
                                                                        <span className="dashboard-status-button green">
                                                                            {"En attente de validation"}
                                                                        </span>
                                                                    </h3>
                                                                    <div className="job-listing-footer">
                                                                        <ul>
                                                                            <li>
                                                                                <i className="icon-material-outline-date-range" />
                                                                                Publié le 
                                                                                {moment((new Date(parseInt(ele.CreatedAt))) .toISOString()).format(" D MMM, YYYY")}
                                                                            </li>
                                                                            <li>
                                                                                <i className="icon-material-outline-date-range" />
                                                                                Expirant le {moment((new Date(parseInt(ele.DateExperation))) .toISOString()).format(" D MMM, YYYY")}
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="buttons-to-right always-visible">
                                                            {}
                                                            {(ele.Candidats.length)?
                                                                <Link to={"/manage/travail/"+ele._id} className="button ripple-effect">
                                                                    <i className="icon-material-outline-supervisor-account" />
                                                                    Manage Candidates <span className="button-info">{ele.Candidats.length}</span>
                                                            </Link>
                                                            : <A className="button ripple-effect" style={{backgroundColor: "#e0e0e0",color: "gray"}}>
                                                                Aucune Candidat pour le moment
                                                            </A>
                                                        }
                                                            
                                                            <a href="#" className="button gray ripple-effect ico" title="Edit" data-tippy-placement="top">
                                                                <i className="icon-feather-edit" />
                                                            </a>
                                                            <a href="#" className="button gray ripple-effect ico" title="Remove" data-tippy-placement="top">
                                                                <i className="icon-feather-trash-2" />
                                                            </a>
                                                        </div>
                                                    </li>
                                                ))}
                                                
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> 
        ) 
} 
export default Manage

const QUERY_MY_TR = gql`
    query($ID: ID!){
        getTravailsByCompte(ID: $ID){
            _id
            Titre
            CreatedAt
            DateExperation
            Occupe
            Candidats{
                _id
            }
        }
    }

`;