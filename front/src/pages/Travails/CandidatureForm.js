import React from 'react'
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"
import {useStoreState} from "easy-peasy"

const CandidatureForm = ({idTravail,refetch,min,max,idCompte}) => { 
    const userData = useStoreState(state=>state.compte.Data)
    
    const [addCondidat,{loading: laodingCand,data: dataCand,errorCand}] = useMutation(MUTATION_add_CAND);
    const {loading, data:dataQMC,error} = useQuery(QUERY_MY_CANDIDATURE);
    
    
    
    
    if(loading||error){
        return null;
    }else if(dataQMC) {
        let resultat = dataQMC.getmyCandidatures.find(element=>(idTravail===element.Travail._id))
        
        if(dataCand){
            resultat = dataCand.addCandidatureTravail;
        }
        
        const onSubmit = (e)=>{
            let ID = idTravail;
            // let PrixMin = parseInt(TarifMin);
            // let LivraisonDans = parseInt(DelaiLNumber)+" "+DelaiLType;
            addCondidat({variables:{ID}});
        }
        
        if((!resultat)&&(userData.ID!==idCompte)){
            return (
                <>
                    <a href="#asmall-dialog" className="apply-now-button popup-with-zoom-anim" 
                        onClick={e=>{
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        Postulez maintenant<i className="icon-material-outline-arrow-right-alt" />
                    </a>
                </>
            );
        }else if(userData.ID!==idCompte){
            return( 
                <>
                    <a onClick={e=>{e.preventDefault()}} href="/" className="apply-now-button popup-with-zoom-anim" style={{background: "#56ce56"}}>
                        Votre Candidature a ete envoye  
                    </a>
                </> 
            ) 
        }
        return <>
        </>;
    }
} 
    
    
    
    
export default CandidatureForm

const MUTATION_add_CAND = gql`
    mutation($ID: ID!){
        addCandidatureTravail(ID: $ID){
            _id
            CreatedAt
            Travail{
                _id
            }
        }
    }
`;
const QUERY_MY_CANDIDATURE = gql`
    query{
        getmyCandidatures{
            Travail{
                _id
            }
            _id
            
        }
    }


`
