import React from 'react'
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {Link} from "react-router-dom"
import {useStoreState} from "easy-peasy"
import {FRONT_END_URL} from "../../constants"


const ListEncheres = ({idProjet,CanEnchere,setCanEnchere,DoRefetch,setDoRefetch}) => { 
    const [getEncheres,{called,loading,data,error}] = useLazyQuery(QUERY_ENCHE);
    const userData = useStoreState(state=>state.compte.Data);
    const [updated,setUpdated] = React.useState(false);
    
    if(((!called)&&(idProjet))||DoRefetch){
        getEncheres({variables:{ID: idProjet}});
    }
    
    
    if(data){
        let tmp = data.getEnchereProjet.find(element=>element.Compte._id===userData.ID);;
        if(tmp&&CanEnchere){
            setCanEnchere(false);
            setDoRefetch(false);
        }else if((!tmp)&&(!updated)){
            setCanEnchere(true);
            setUpdated(true)
        }
        ///afffchage de list enchers
        if(data.getEnchereProjet.length===0){
            return <li> Aucune resultats </li>;
        }else {
            return( 
                <>{
                data.getEnchereProjet.map(ele=>(
                    <li key={ele._id}>    
                        <div className="bid">
                            <div className="bids-avatar">
                                <div className="freelancer-avatar">
                                    <div className="verified-badge" />
                                        <a href={FRONT_END_URL +"utilisateur/"+ele.Compte._id}>
                                            <img src={(ele.Compte.Image)?ele.Compte.Image:FRONT_END_URL+"images/user-avatar-placeholder.png"} alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <div className="bids-content">
                                    <div className="freelancer-name">
                                        <h4>
                                            <a href={FRONT_END_URL +"utilisateur/"+ele.Compte._id}> 
                                                {ele.Compte.Username}
                                                <img className="flag" src={FRONT_END_URL+"images/flags/fr.svg"} alt="" title="United Kingdom"
                                                    data-tippy-placement="top"
                                                />
                                            </a>
                                        </h4>
                                        <div className="star-rating" data-rating="4.9" />
                                    </div>
                                </div>
                                <div className="bids-bid">
                                    <div className="bid-rate">
                                        <div className="rate">${ele.PrixMin}</div>
                                        <span>dans {ele.LivraisonTemps}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
                </> 
            ) 
        }
    }
    return <></>;
} 
export default ListEncheres
const QUERY_ENCHE = gql`
    query($ID: ID!){
        getEnchereProjet(ID: $ID)
        {
            _id
            Projet{
                Titre
            }
            Compte{
                _id
                Username
                Email
                Image
            }
            PrixMin
            LivraisonTemps
            CreatedAt
        }
    }

`;