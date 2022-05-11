import React from 'react'
import gql from "graphql-tag"
import {useQuery,useLazyQuery} from "@apollo/react-hooks"
import {useStoreState} from "easy-peasy"

const CountersU = (props) => { 
    const {data: dataA} = useQuery(QUERY_A);
    const {data: dataB} = useQuery(QUERY_B);
    
    return( 
        <>
            <div className="fun-fact" data-fun-fact-color="#36bd78">
                <div className="fun-fact-text">
                    <span>Enchères de projets</span>
                    <h4>{dataB&&dataB.getmyEncheres.length}</h4>
                </div>
                <div className="fun-fact-icon"><i className="icon-material-outline-gavel"/></div>
            </div>
            <div className="fun-fact" data-fun-fact-color="#b81b7f">
                <div className="fun-fact-text">
                    <span>candidature des traveaux</span>
                    <h4>{dataA&&dataA.getmyCandidatures.length}</h4>
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
export default CountersU

const QUERY_A = gql`
    query{
        getmyCandidatures{
            _id
        }
    }
`;
const QUERY_B = gql`
    query{
        getmyEncheres{
            _id
        }
    }
`;