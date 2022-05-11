import React from 'react'
import {useQuery} from "@apollo/react-hooks"
import gql from "graphql-tag"

const Counters = (props) => {
    
    const {loading, error, data} = useQuery(FEATCH_WELCOME);
    if(loading || error) return <h1>loading</h1>;
    
    return(
        <>
            <div className="section padding-top-70 padding-bottom-75">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="counters-container">
                                <div className="single-counter">
                                    <i className="icon-line-awesome-suitcase" />
                                    <div className="counter-inner">
                                        <h3><span className="counter">{data.getWelcomeData.CountTravails}</span></h3>
                                        <span className="counter-title">Offres d'emploi Publié</span>
                                    </div>
                                </div>
                                <div className="single-counter">
                                    <i className="icon-line-awesome-legal" />
                                    <div className="counter-inner">
                                        <h3><span className="counter">{data.getWelcomeData.CountProjets}</span></h3>
                                        <span className="counter-title">Travaux publié</span>
                                    </div>
                                </div>
                                <div className="single-counter">
                                    <i className="icon-line-awesome-user" />
                                    <div className="counter-inner">
                                        <h3><span className="counter">{data.getWelcomeData.CountUtilisateurs}</span></h3>
                                        <span className="counter-title">Membres actifs</span>
                                    </div>
                                </div>
                                <div className="single-counter">
                                    <i className="icon-line-awesome-trophy" />
                                    <div className="counter-inner">
                                        <h3><span className="counter">99</span>%</h3>
                                        <span className="counter-title">taux de satisfaction</span>
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
export default Counters
const FEATCH_WELCOME = gql`
query{
    getWelcomeData{
        CountProjets
        CountTravails
        CountUtilisateurs
        DerniereProjets{
            Titre
            _id
        }
    }
}
`;