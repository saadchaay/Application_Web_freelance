import React from 'react'
import Header from "../../components/Header";
import {Link} from "react-router-dom"
import Footer from "../../components/Footer2"
import EntrepriseItem from "./EntrepriseItem"

import {Waypoint} from "react-waypoint"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

const Entreprises = (props) => { 
    document.getElementById('wrapper').className="awrapper-with-transparent-header";    
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    
    const {loading: loadingCat,data: dataCat, error: errorCat} = useQuery(QUERY_CATEGORIES);
    const {loading, data, error,fetchMore } = useQuery(QUERY_UTILISATEURS,{variables: { Skip: 0, Limit: 5}});
    
    return( 
        <>
            <Header transparent={false}  path="entreprises"/>
            <div className="margin-top-90" />
                <div className="container">
                    <div className="row">
                        {loading?(<div className="col-xl-3 col-lg-4"></div>):(
                            <div className="col-xl-3 col-lg-4">
                                <div className="sidebar-container">
                                    <div className="sidebar-widget">
                                        <h3>Location</h3>
                                        <div className="input-with-icon">
                                            <div id="autocomplete-container">
                                                <input id="autocomplete-input" type="text" placeholder="Location" />
                                            </div>
                                            <i className="icon-material-outline-location-on" />
                                        </div>
                                    </div>
                                    
                                    <div className="sidebar-widget">
                                        <h3>Categories</h3>
                                        <select style={{margin:0}}>
                                            <option>Tout les categories</option>
                                            {
                                                (loadingCat||errorCat)?<option>Loading ...</option>: 
                                                (dataCat.getCategories.map(ele=>(<option key={ele._id} value={ele._id}>{ele.Titre}</option>)))
                                            }
                                        </select>
                                    </div>
                                    <div className="sidebar-widget">
                                        <h3>Mots clés</h3>
                                        <div className="keywords-container">
                                            <div className="keyword-input-container">
                                                <input type="text" className="keyword-input" placeholder="e.g. task title" />
                                                <button className="keyword-input-button ripple-effect"><i className="icon-material-outline-add" /></button>
                                            </div>
                                            <div className="keywords-list">{/* keywords go here */}</div>
                                            <div className="clearfix" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="col-xl-9 col-lg-8 content-left-offset">
                                
                                <div className="freelancers-container freelancers-list-layout margin-top-35">
                                    
                                {
                                    (loading||error)?
                                        ([1,2,3,4,5].map(ele=>(<EntrepriseItem mokeup key={ele}/>)))
                                        : 
                                        data.getEntreprises.map(
                                            (ele,i)=>(
                                                <React.Fragment key={ele._id}>
                                                    <EntrepriseItem  _id={ele._id}/>
                                                    {(i === data.getEntreprises.length - 5)&&(
                                                        <Waypoint onEnter={
                                                            ()=>fetchMore(
                                                                {variables: {
                                                                    Skip: i+5,
                                                                    Limit: 5
                                                                },
                                                                updateQuery: (prev,{fetchMoreResult})=>{
                                                                    if(!fetchMoreResult) return prev;
                                                                    return  {
                                                                        getEntreprises: prev.getEntreprises.concat(fetchMoreResult.getEntreprises)
                                                                    };
                                                                }
                                                            })
                                                        }/>
                                                    )}
                                                    
                                                </React.Fragment>
                                            )
                                        )
                                    }
                                    
                                </div>
                                <div className="clearfix" />
                            </div>
                        </div>
                    </div>
                    <div id="footer">
                        <Footer/>
                    </div>   
                </> 
    ) 
} 
export default Entreprises

const QUERY_UTILISATEURS = gql`
    query($Skip: Int $Limit: Int){
        getEntreprises(skip: $Skip limit: $Limit){
            _id
        }
    }
`;
const QUERY_CATEGORIES = gql`
    query{
        getCategories{
            _id
            Titre
        }
    }
`;