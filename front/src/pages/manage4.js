import React from 'react'
import Header from "../components/Header";
import SideBar from "../components/Sidebar"
import {Link} from "react-router-dom"
import Footer from "../components/Footer2"
import A from "../components/A"
import {useStoreState} from "easy-peasy"
import moment from "moment"

import gql from "graphql-tag"

import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"

const Manage4 = (props) => { 

    
    const userData = useStoreState(state=>state.compte.Data)
    const {loading,error,data} = useQuery(Q_A,{variables: {ID: userData.ID}});
    if(loading||error)return <Header transparent={false}/>;
    
    return( 
        <>
            <Header transparent={false}/>
            <div className="dashboard-container">
                <SideBar page="dashboard"/>
                <div className="dashboard-content-container" data-simplebar>
                    <div className="dashboard-content-inner" astyle={{padding:"10px 10px 0px 10px"}}>
                    <div className="dashboard-headline">
                    
                        <h3>Manage Projets</h3>
                        </div>
    
                        <div className="row">
    {/* Dashboard Box */}
    <div className="col-xl-12">
      <div className="dashboard-box margin-top-0">
        {/* Headline */}
        <div className="headline">
          <h3>
            <i className="icon-material-outline-assignment" /> Mes projets
          </h3>
        </div>
        <div className="content">
          <ul className="dashboard-box-list">
            
            {data.getProjetsByCompte.map(ele=>(<EncherElement key={ele._id} projet={ele}/>))}
            
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
export default Manage4


const Q_A = gql`
    query($ID: ID!){
        getProjetsByCompte(ID: $ID){
            _id
            Titre
            DateExperation
            CreatedAt
        }
    }
`;
const Q_B = gql`
    query($ID: ID!){
        getEnchereProjet(ID: $ID){
            _id
        }
    }
`;

const EncherElement = ({projet})=>{
    const {loading,data,error} = useQuery(Q_B,{variables:{ID: projet._id}});
    if(loading||error) return <li></li>;
    
    let td = data.getEnchereProjet.map(ele=>ele._id);
    console.log(data);
    
    
    
    return (
        <>
            <li>
                <div className="job-listing width-adjustment">
                    <div className="job-listing-details">
                        <div className="job-listing-description">
                            <h3 className="job-listing-title">
                                <Link to={"/projet/"+projet._id}>{projet.Titre}</Link>{"    "}
                                <span className="dashboard-status-button yellow">Expirant</span>
                            </h3>
                            <div className="job-listing-footer">
                                <ul>
                                    <li>
                                        <i className="icon-material-outline-access-time" />
                                        {moment((new Date(parseInt(projet.CreatedAt))).toISOString()).toNow()}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <ul className="dashboard-task-info">
                    <li>
                        <strong>{data.getEnchereProjet.length}</strong>
                        <span>Enchères</span>
                    </li>
                </ul>
                <div className="buttons-to-right always-visible">
                    { (data.getEnchereProjet.length)?
                        <Link to={"/manage/projet/"+projet._id} className="button ripple-effect">
                            <i className="icon-material-outline-supervisor-account" />
                            Manage Enchères <span className="button-info">1</span>
                        </Link>
                        :
                        <A className="button ripple-effect" style={{color:"gray",backgroundColor:"lightgray"}}>
                            <i className="icon-material-outline-supervisor-account" />
                            aucune Enchères pour le mement
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
        </>
    );
}