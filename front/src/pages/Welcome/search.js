import React from 'react'
import {useQuery} from "@apollo/react-hooks"
import gql from "graphql-tag"
 
const Search = (props) => { 
    const {loading, data,error} = useQuery(QUERY_Categories);
    if(loading){
        return <div  className="intro-search-field">loading...</div>;
    }else if(data) {
        return( 
            <>
                <div className="intro-banner-search-form margin-top-95">
                    <div className="intro-search-field with-autocomplete">
                        <label htmlFor="autocomplete-input" className="field-title ripple-effect">Où?</label>
                        <div className="input-with-icon">
                            <input id="autocomplete-input" type="text" placeholder="Travail en ligne" />
                            <i className="icon-material-outline-location-on" />
                        </div>
                    </div>
                    <div className="intro-search-field">
                        <label htmlFor="intro-keywords" className="field-title ripple-effect">Que devez-vous faire?</label>
                        <input id="intro-keywords" type="text" placeholder="ex. construisez-moi un site web" />
                    </div>
                    
                    <div className="intro-search-field">
                    {
                        <select className="aselectpicker adefault" style={{margin:"0px"}} >
                            <option>tout les catégories</option>
                            {
                                data.getCategories.map(ele=>(<option key={ele._id} value={ele._id}>{ele.Titre}</option>))
                            }
                        </select>
                    }
                    </div>
                
                    <div className="intro-search-button">
                        <button className="button ripple-effect" onClick={()=>{window.location.href='freelancers-grid-layout-full-page.html'}}>Chercher</button>
                    </div>
                </div>
            </>
        ) 
    }else if(error) {
        return <div  className="intro-search-field">error ...</div>;
    }
} 
export default Search

const QUERY_Categories = gql`
    query{
        getCategories{
            _id
            Titre
        }
    }
`;