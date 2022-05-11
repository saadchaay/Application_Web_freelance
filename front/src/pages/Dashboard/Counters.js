import React from 'react'
import gql from "graphql-tag"
import {useQuery,useLazyQuery} from "@apollo/react-hooks"
import CountersE from "./CountersE"
import CountersU from "./CountersU"
const Counters = ({Compte}) => { 
    if(Compte.TypeCompte==="Utilisateur"){
        return (<CountersU/>);
    }else {
        return (<CountersE/>);
        
    }
} 
export default Counters
