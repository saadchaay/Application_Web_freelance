import React from 'react'
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar"
import {Link} from "react-router-dom"
import Footer from "../../components//Footer2"
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"
import {useStoreState} from "easy-peasy"
import Part1 from "./Part1" 
import Part2U from "./Part2U" 
import Part2 from "./Part2" 
import Part2E from "./Part2E" 
import Part3 from "./Part3" 
 
const Parametres = (props) => { 
    const {loading:loadingC,data:dataC,error:errorC} = useQuery(QUERY_COMPTE);
    // const [getUtilisateur,{called:calledU,loading:loadingU,data:dataU,error:errorU}] = useLazyQuery(QUERY_UTILISATEUR);
    // const [getEntreprise,{called:calledE,loading:loadingE,data:dataE,error:errorE}] = useLazyQuery(QUERY_ENTREPRISE);
    // const [getupload,{loading:loadingUpload,data:dataUpload,error:errorUpload}] = useMutation();
    if(loadingC||errorC){
        return (<><Header transparent={false}/></>);
    }
    // if((!calledU)&&(!calledE)){
    //     if(dataC.getCompte.TypeCompte==="Utilisateur"){
    //         getUtilisateur({variables:{ID: dataC.getCompte._id}});
    //     }else {
    //         getEntreprise({variables:{ID: dataC.getCompte._id}});
    //     }
    // }
    return( 
        <>
            <Header transparent={false}/>
            <div className="dashboard-container">
                <SideBar page="Parametres"/>
                <div className="dashboard-content-container">
                    <div className="dashboard-content-inner" astyle={{padding:"10px 10px 0px 10px"}}>
                    
                    
                    <div className="dashboard-headline">
                        <h3>Settings</h3>
                    </div>
                    <div className="row">
                    
                        <Part1 Compte={dataC.getCompte}/>    
                        
                        {(dataC.getCompte.TypeCompte==="Utilisateur")?
                            <Part2U Compte={dataC.getCompte}/> :
                        <Part2E Compte={dataC.getCompte}/>}    
                    {/*<Part2E Compte={dataC.getCompte}/>   */}  
                        <Part3 Compte={dataC.getCompte}/>   
                    
                    
    {/* Dashboard Box */}
            
    {/* Button */}
    <div className="col-xl-12">
      <a href="#" className="button ripple-effect big margin-top-30">
        enregistrer les Changement
      </a>
    </div>
  </div>
                    
                    
                    
                    
                    
                    
                    
                    
                    </div>
                </div>
            </div>
        </> 
    ) 
} 
export default Parametres

const QUERY_COMPTE = gql`
    query{
        getCompte{
            _id
            TypeCompte
            Username
            Image
            Email
        }
    }
`;
const QUERY_UTILISATEUR = gql`
    query($ID:ID!){
        getUtilisateurByCompte(ID: $ID){
            _id
            Nom
            Prenom
            Adresse
            Description
            Nationalite
            
        }
    }
`;
const QUERY_ENTREPRISE = gql`
    query($ID:ID!){
        getEntrepriseByCompte(ID: $ID){
            _id
        }
    }
`;
