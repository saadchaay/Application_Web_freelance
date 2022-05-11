import React from 'react'
import Header from "../components/Header";
import SideBar from "../components/Sidebar"
import {Link} from "react-router-dom"
import Footer from "../components//Footer2"
import gql from "graphql-tag"
import {useQuery,useLazyQuery} from "@apollo/react-hooks"
import Manage2Item from "./manage2Item.js"
const Manage2 = ({props}) => { 
    const id = props.match.params.id
    const {loading,data,error} = useQuery(QUERY_CANDS,{variables:{ID: id}});
    if(loading||error) return <><Header transparent={false}/></>;
    
    
    return( 
        <>
            <Header transparent={false}/>
            <div className="dashboard-container">
                <SideBar page="dashboard"/>
                <div className="dashboard-content-container" data-simplebar>
                    <div className="dashboard-content-inner" astyle={{padding:"10px 10px 0px 10px"}}>
                    
                    
                    <div className="dashboard-headline">
                    <h3>Manage Candidates</h3>
                    <span className="margin-top-7">
                        candidatures de <Link to={"/travail/"+id}>{data.getCandidatsByTravail[0].Travail.Titre}</Link>
                    </span>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="dashboard-box margin-top-0">
                            <div className="headline">
                                <h3>
                                    <i className="icon-material-outline-supervisor-account" /> {data.getCandidatsByTravail.length} Candidates
                                </h3>
                            </div>
                            <div className="content">
                                <ul className="dashboard-box-list">
                                {
                                    data.getCandidatsByTravail.map(ele=><Manage2Item key={ele._id} data={ele}/>)
                                }
                                    
                                    
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
export default Manage2
const QUERY_CANDS = gql`
    query($ID: ID!){
        getCandidatsByTravail(ID: $ID){
            _id
            Candidat{
                _id
                Username
                TypeCompte
                Email
                Image
            }
            Travail{
                _id
                Titre
            }
        }
    }

`