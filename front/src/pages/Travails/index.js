import React from 'react'
import Header from "../../components/Header";
import {Link} from "react-router-dom"
import Footer from "../../components/Footer2"
import TravailItem from "./TravailItem"

import {Waypoint} from "react-waypoint"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

const Travails = (props) => { 
    document.getElementById('wrapper').className="awrapper-with-transparent-header";    
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    const {loading: loadingCat,data: dataCat, error: errorCat} = useQuery(QUERY_CATEGORIES);
    const {loading, data, error,fetchMore } = useQuery(QUERY_TRAVAILLES,{
        variables: {
            Skip: 0,
            Limit: 5
        },
    });
    return( 
        <>
        <Header transparent={false}  path="travails"/>
        <div className="margin-top-90" />
        <div className="container">
            <div className="row">
                <div className="col-xl-3 col-lg-4">
                    <div className="sidebar-container">
                        <div className="sidebar-widget">
                            <h3>Adresse</h3>
                            <div className="input-with-icon">
                                <div id="autocomplete-container">
                                    <input id="autocomplete-input" type="text" placeholder="Location" />
                                </div>
                                <i className="icon-material-outline-location-on" />
                            </div>
                        </div>
                        
                        <div className="sidebar-widget">
                            <h3>Mots clés</h3>
                            <div className="keywords-container">
                                <div className="keyword-input-container">
                                    <input type="text" className="keyword-input" placeholder="e.g. job title" />
                                    <button className="keyword-input-button ripple-effect"><i className="icon-material-outline-add" /></button>
                                </div>
                                <div className="keywords-list">
                                        
                                </div>
                                <div className="clearfix" />
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
                                <h3>Type de travail</h3>
                                <div className="switches-list">
                                    <div className="switch-container">
                                        <label className="switch"><input type="checkbox" /><span className="switch-button" /> Freelance</label>
                                    </div>
                                    <div className="switch-container">
                                        <label className="switch"><input type="checkbox" /><span className="switch-button" /> Full Time</label>
                                    </div>
                                    <div className="switch-container">
                                        <label className="switch"><input type="checkbox" /><span className="switch-button" /> Part Time</label>
                                    </div>
                                    <div className="switch-container">
                                        <label className="switch"><input type="checkbox" /><span className="switch-button" /> Internship</label>
                                    </div>
                                    <div className="switch-container">
                                        <label className="switch"><input type="checkbox" /><span className="switch-button" /> Temporary</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="sidebar-widget">
                                <h3>Salaire</h3>
                                <div className="margin-top-55" />
                                {/* Range Slider */}
                                <input className="range-slider" type="text" defaultValue data-slider-currency="$" data-slider-min={1500} data-slider-max={15000} data-slider-step={100} data-slider-value="[1500,15000]" />
                            </div>
                            
                            <div className="sidebar-widget">
                                <h3>Etiquesttes</h3>
                                <div className="tags-container">
                                    <div className="tag">
                                        <input type="checkbox" id="tag1" />
                                        <label htmlFor="tag1">front-end dev</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" id="tag2" />
                                        <label htmlFor="tag2">angular</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" id="tag3" />
                                        <label htmlFor="tag3">react</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" id="tag4" />
                                        <label htmlFor="tag4">vue js</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" id="tag5" />
                                        <label htmlFor="tag5">web apps</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" id="tag6" />
                                        <label htmlFor="tag6">design</label>
                                    </div>
                                    <div className="tag">
                                        <input type="checkbox" id="tag7" />
                                        <label htmlFor="tag7">wordpress</label>
                                    </div>
                                </div>
                                <div className="clearfix" />
                                <div className="keywords-container margin-top-20">
                                    <div className="keyword-input-container">
                                        <input type="text" className="keyword-input" placeholder="ajouter plus" />
                                        <button className="keyword-input-button ripple-effect">
                                            <i className="icon-material-outline-add" />
                                        </button>
                                    </div>
                                    <div className="keywords-list">{/* keywords go here */}</div>
                                    <div className="clearfix" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 content-left-offset">
                        
                        <div className="listings-container margin-top-35">
                        {
                            (loading||error)?
                                ([1,2,3,4,5].map(ele=><TravailItem mokeup key={ele}/>))
                                :
                                (data.getTravails.length?
                                    data.getTravails.map(
                                    (ele,i)=>(
                                        <React.Fragment key={ele._id}>
                                            <TravailItem  _id={ele._id}/>
                                            {(i === data.getTravails.length - 5)&&(
                                                <Waypoint onEnter={
                                                    ()=>fetchMore(
                                                        {variables: {
                                                            Skip: i+5,
                                                            Limit: 5
                                                        },
                                                        updateQuery: (prev,{fetchMoreResult})=>{
                                                            if(!fetchMoreResult) return prev;
                                                            return  {
                                                                getTravails: prev.getTravails.concat(fetchMoreResult.getTravails)
                                                            };
                                                        }
                                                })}/>)}
                                            
                                        </React.Fragment>
                                    )
                                ): <h3>aucune resultat</h3>)
                            }
                            <div className="clearfix" />
                            
                        </div>
                            
                    </div>
                </div>
            </div>
            <div id="footer">
                <Footer/>
            </div>        
        </> 
    ) 
} 
export default Travails

const QUERY_TRAVAILLES = gql`
    query($Skip: Int $Limit: Int){
        getTravails(skip: $Skip limit: $Limit){
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