import React from 'react'
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"
import CategorieItem from "./CategorieItem";

const PopularCatigories = (props) => {
    const QUERY = gql`
    query{
        getWelcomeData{
            TopCategories{
                Titre
                _id
                Icon
                NbrUtilisations
            } 
        }
    }
    `;
    const {loading,data,error} = useQuery(QUERY);
        
    return(
        <div className="section margin-top-65 margin-bottom-30">
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="section-headline centered margin-top-0 margin-bottom-45">
                        <h3>Catégories populaires</h3>
                    </div>
                </div>
                {
                    (loading||error)?[1,2,3,4,5,6,7,8].map(ele=>(<CategorieItem key={ele} loading={loading||error}/>))
                    :
                    data.getWelcomeData.TopCategories.map(ele=>(
                        <CategorieItem key={ele._id} 
                        Icon={ele.Icon} 
                        title={ele.Titre}
                        count={ele.NbrUtilisations}
                    />))
                }
            </div>
        </div>
        </div>
    )
}
export default PopularCatigories
// if(error.message === 'Network error: NetworkError when attempting to fetch resource.')
// window.alert("you are offline");