import React from 'react'
import Header from "../components/Header";
import SideBar from "../components/Sidebar"
import {Link} from "react-router-dom"
import Footer from "../components/Footer2"
import A from "../components/A"
import {useStoreState} from "easy-peasy"
import moment from "moment"
import {FRONT_END_URL} from "../constants"

import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"

const Manage3 = ({props}) => { 
    
    const {loading,data,error} = useQuery(Q_A,{variables:{ID: props.match.params.id}});
    if(loading||error) return <Header transparent={false}/>;
    
    return( 
        <>
            <Header transparent={false}/>
            <div className="dashboard-container">
                <SideBar page="dashboard"/>
                <div className="dashboard-content-container" data-simplebar>
                    <div className="dashboard-content-inner" astyle={{padding:"10px 10px 0px 10px"}}>
                    
                    <div className="dashboard-headline">
                        <h3>Manage Enchères</h3>
                        <span className="margin-top-7">
                            Enchères pour <Link to={"/projet/"+data.getEnchereProjet[0].Projet._id}>{data.getEnchereProjet[0].Projet.Titre}</Link>
                        </span>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="dashboard-box margin-top-0">
                                <div className="headline">
                                    <h3>
                                        <i className="icon-material-outline-supervisor-account" /> {data.getEnchereProjet.length} Enchères
                                    </h3>
          
                                </div>
                                <div className="content">
                                    <ul className="dashboard-box-list">
                                    
                                    {
                                        data.getEnchereProjet.map(ele=><UtilisateurElement key={ele._id}  data={ele}/>)
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Row / End */}
  
                    </div>
                </div>
            </div>
        </> 
    ) 
} 
export default Manage3


const Q_A = gql`
    query($ID: ID!){
        getEnchereProjet(ID: $ID){
            _id
            Projet{
                _id
                Titre
                TypePayment
                TypePayment
            }
            Compte{
                _id
                Username
                TypeCompte
                Image
                Email
            }
            PrixMin
            LivraisonTemps
            CreatedAt
            Accepted
        }
    }
`;
const UtilisateurElement = ({data})=>{
    
    //0 off
    //1 on non Sent
    //2 off sent
    const [MessageOn,setMessageOn] = React.useState(0);
    const [accepte,{data:dataM}] = useMutation(MUTATION_A)
    const [MsgTxt,setMsgTxt] = React.useState("");
    const [sendMSG,{loading,data:dataMsg,error}] = useMutation(MUTATION_ADD_MSG);

    const onClickMsg = (e)=>{
        e.preventDefault()
        if(MessageOn){
            if(MsgTxt===""){
                setMessageOn(false);
            }else {
                //send
                sendMSG({variables:{Recepteur: data.Compte._id ,Contenu: MsgTxt}});
                setMsgTxt("");
                setMessageOn(false);
            }
        }else {
            setMessageOn(true);
        }
    }
    
    const onAccepted = (e)=>{
        accepte({variables:{ID: data._id}});
    }
    
    return (
        <>
            <li>
                <div className="freelancer-overview manage-candidates">
                    <div className="freelancer-overview-inner">
                        <div className="freelancer-avatar">
                            <div className="verified-badge" />
                            <a href="#">
                                <img src={data.Compte.Image||(FRONT_END_URL+"images/user-avatar-placeholder.png")} alt="" />
                            </a>
                        </div>
                        <div className="freelancer-name">
                            <h4>
                                <a href="#">
                                    {data.Compte.Username}{" "}<img className="flag" src={FRONT_END_URL+"images/flags/ma.svg"} alt title="Germany" data-tippy-placement="top"/>
                                </a>
                            </h4>
                            <span className="freelancer-detail-item">
                                <a href="#">
                                    <i className="icon-feather-mail" /> {data.Compte.Email}
                                </a>
                            </span>
                            
                            <ul className="dashboard-task-info bid-info">
                                <li>
                                    <strong>${data.PrixMin}</strong>
                                    <span>{data.Projet.TypePayment}</span>
                                </li>
                                <li>
                                    <strong>{data.LivraisonTemps}</strong>
                                    <span>Temps de Livraison</span>
                                </li>
                            </ul>
                            {
                                (data.Accepted||(dataM&&dataM.Accepted))?
                            <div className="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                                <A className="popup-with-zoom-anim button ripple-effect">
                                    En attente de réalisation
                                </A>
                            </div>:
                            <div className="buttons-to-right always-visible margin-top-25 margin-bottom-0">
                                <a href="#" className="popup-with-zoom-anim button ripple-effect" onClick={onAccepted}>
                                    <i className="icon-material-outline-check" /> Accepter l'Offer
                                </a>
                                {
                                (dataMsg)?
                                    <Link to={"/messages"} className="popup-with-zoom-anim button dark ripple-effect">
                                        <i className="icon-feather-mail" /> consulter la conversation
                                    </Link>
                                :
                                    <a href="/" className="popup-with-zoom-anim button dark ripple-effect" onClick={onClickMsg}>
                                        <i className="icon-feather-mail" /> Envoyer le message
                                    </a>
                            }
                                
                                <a href="#" className="button gray ripple-effect ico" title="Remove Bid" data-tippy-placement="top">
                                    <i className="icon-feather-trash-2" />
                                </a>
                                {
                                    (MessageOn)?<div className="row">
                                        <div className="col-xl-5">
                                            <textarea  style={{minHeight: 80,maxHeight:80,border: "2px solid blue"}} cols={80} rows={3} value={MsgTxt} 
                                                onChange={e=>{setMsgTxt(e.target.value)}}
                                            />
                                                <a href="/" className="popup-with-zoom-anim button full-width button-sliding-icon" onClick={onClickMsg}>
                                                Envoyer <i className="icon-material-outline-arrow-right-alt" />
                                            </a>
                                        </div>
                                    <div className="col-xl-5">
                                </div>
                            </div>:<></>
                                }
                                
                                
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

const MUTATION_A = gql`
    mutation($ID: ID!){
        AccepterEnchereProjet(ID: $ID){
            _id
            Projet{
                _id
                Titre
            }
            Compte{
                _id
                Username
                Image
            }
            Accepted
        }
    }
`;
const MUTATION_ADD_MSG = gql`
    mutation($Recepteur: ID! $Contenu:String!){
        addMessage(Recepteur: $Recepteur Contenu: $Contenu){
            Contenu
            _id
            Conversation
        }
    }
`

