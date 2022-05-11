import React from 'react'

import gql from "graphql-tag"
import {useQuery,useLazyQuery} from "@apollo/react-hooks"
import {useStoreState} from "easy-peasy"

const CountersE = (props) => { 
    const userData = useStoreState(state=>state.compte.Data)
    
    const {data: dataA} = useQuery(QUERY_A,{variables:{ID: userData.ID}});
    const {data: dataB} = useQuery(QUERY_B,{variables:{ID: userData.ID}});
    
    return( 
        <>
            <div className="fun-fact" data-fun-fact-color="#36bd78">
                <div className="fun-fact-text">
                    <span>projets poster</span>
                    <h4>{dataA&&dataA.getProjetsByCompte.length}</h4>
                </div>
                <div className="fun-fact-icon"><i className="icon-material-outline-gavel"/></div>
            </div><div className="fun-fact" data-fun-fact-color="#b81b7f">
                    <div className="fun-fact-text">
                        <span>traveaux poster</span>
                        <h4>{dataB&&dataB.getTravailsByCompte.length}</h4>
                    </div>
                    <div className="fun-fact-icon"><i className="icon-material-outline-business-center"/></div>
                </div>
            <div className="fun-fact" data-fun-fact-color="#efa80f">
                <div className="fun-fact-text">
                    <span>Reviews</span>
                    <h4>0</h4>
                </div>
                <div className="fun-fact-icon"><i className="icon-material-outline-rate-review"/></div>
            </div>
        </> 
    ) 
} 
export default CountersE

const QUERY_A = gql`
    query($ID: ID!){
        getProjetsByCompte(ID: $ID){
            _id
        }
    }
`;
const QUERY_B = gql`
    query($ID: ID!){
        getTravailsByCompte(ID: $ID){
            _id
        }
    }
`;











