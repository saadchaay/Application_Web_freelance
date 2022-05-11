import React from 'react'
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import {Link} from "react-router-dom"
// import Footer from "../components/Footer";
// import SideBar from "../components/Sidebar"
import Footer from "../../components/Footer2"
import ProjetElement from "./ProjetElement"
import {useInput,useSwitch } from "../../hooks"

import {Waypoint} from "react-waypoint"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

const Projets = (props) => { 
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    const CategorieInput        = useInput("");
    
    const {loading: loadingCat,data: dataCat, error: errorCat} = useQuery(QUERY_CATEGORIES);
    const {loading, data, error,fetchMore,refetch } = useQuery(QUERY_PROJETS,{
        variables: {
            Skip: 0,
            Limit: 5
        }
    });
    const onCategorieChange = (e)=>{
        if(CategorieInput.value){
            refetch({variables:{Skip: 0,Limit: 5,Categorie: CategorieInput.value}});
        }
    }
    let Resultats = null;
    if(data){
        if(data.getProjets.length===0){
            Resultats = <h3 style={{textAlign: "center"}}>Aucun Resultats</h3>
            
        }else {
            Resultats = data.getProjets.map((ele,i)=>(
                <React.Fragment key={ele._id}>
                    <ProjetElement _id={ele._id}/>
                    {(i === data.getProjets.length - 5)&&(
                    <Waypoint onEnter={
                        ()=>fetchMore(
                            {variables: {
                                Skip: i+5,
                                Limit: 5
                            },
                            updateQuery: (prev,{fetchMoreResult})=>{
                                if(!fetchMoreResult) return prev;
                                return  {
                                    getProjets: prev.getProjets.concat(fetchMoreResult.getProjets)
                                };
                            }}
                        )
                    }/>
                    )}
                </React.Fragment>
            ))
        }
    }
    
    return( 
        <>
            <Header transparent={false}  path="projets"/>
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
                                        <button className="keyword-input-button ripple-effect">
                                            <i className="icon-material-outline-add" />
                                        </button>
                                    </div>
                                    <div className="keywords-list">{/* keywords go here */}</div>
                                    <div className="clearfix" />
                                </div>
                            </div>
                            <div className="sidebar-widget">
                                <h3>Prix fixe</h3>
                                <div className="margin-top-55" />
                                    <input className="range-slider" type="text" defaultValue data-slider-currency="$" data-slider-min={10} data-slider-max={2500} data-slider-step={25} data-slider-value="[50,2500]" />
                                </div>
                                <div className="sidebar-widget">
                                    <h3>Tarif horaire</h3>
                                    <div className="margin-top-55" />
                                    <input className="range-slider" type="text" defaultValue data-slider-currency="$" data-slider-min={10} data-slider-max={150} data-slider-step={5} data-slider-value="[10,200]" />
                                </div>
                                <div className="sidebar-widget">
                                    <h3>Compétences</h3>
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
                                <div className="clearfix" />
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 content-left-offset">
                            {/*<h3 className="page-title">Search Results</h3>
                            <div className="notify-box margin-top-15">
                                <div className="switch-container">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="switch-button" />
                                        <span className="switch-text">Turn on email alerts for this search</span>
                                    </label>
                                </div>
                                <div className="sort-by">
                                    <span>Sort by:</span>
                                    <select className="selectpicker hide-tick">
                                        <option>Relevance</option>
                                        <option>Newest</option>
                                        <option>Oldest</option>
                                        <option>Random</option>
                                    </select>
                                </div>
                            </div>*/}
                            <div className="tasks-list-container margin-top-35">
                            {
                                loading&&([1,2,3,4,5].map(ele=>(<ProjetElement key={ele} mokeup />)))
                            }
                            
                            {
                                error&&([1,2,3,4,5].map(ele=>(<ProjetElement key={ele} mokeup />)))
                            }
                            
                                { Resultats }
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
export default Projets

const QUERY_PROJETS = gql`
    query($Skip: Int $Limit: Int){
        getProjets(skip: $Skip limit: $Limit){
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