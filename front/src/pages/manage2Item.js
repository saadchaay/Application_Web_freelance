import React from 'react'
import {Link} from "react-router-dom"
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../constants"


const Manage2Item = ({data}) => { 
    //0 off
    //1 on non Sent
    //2 off sent
    const [MessageOn,setMessageOn] = React.useState(0);
    const [MsgTxt,setMsgTxt] = React.useState("");
    const [sendMSG,{loading,data:dataM,error}] = useMutation(MUTATION_ADD_MSG);

    const onClickMsg = (e)=>{
        e.preventDefault()
        if(MessageOn){
            if(MsgTxt===""){
                setMessageOn(false);
            }else {
                //send
                sendMSG({variables:{Recepteur: data.Candidat._id ,Contenu: MsgTxt}});
                setMessageOn(false);
            }
        }else {
            setMessageOn(true);
        }
    }
    
    return( 
        <>
        <li>
            <div className="freelancer-overview manage-candidates">
                <div className="freelancer-overview-inner">
                    <div className="freelancer-avatar">
                        <div className="verified-badge" />
                        <a href="#">
                            <img src={data.Image||(FRONT_END_URL+"/images/user-avatar-placeholder.png")} alt />
                        </a>
                    </div>
                    <div className="freelancer-name">
                        <h4>
                            <Link to={"/"+data.Candidat.TypeCompte+"/"+data.Candidat._id}> {data.Candidat.Username}
                                <img src={FRONT_END_URL+"images/flags/ma.svg"} className="flag" alt title="Australia" data-tippy-placement="top"/>
                            </Link>
                        </h4>
                        <span className="freelancer-detail-item">
                            <a href="#">
                                <i className="icon-feather-mail" /> {data.Candidat.Email}
                            </a>
                        </span>
                        
                        {/*<div className="freelancer-rating">
                            <div className="star-rating" data-rating={4.0} />
                        </div>*/}
                        <div className="buttons-to-right always-visible margin-top-25 margin-bottom-5">
                            <a href="#" className="button ripple-effect">
                                <i className="icon-feather-file-text" /> Télécharger CV
                            </a>
                            {
                                (dataM)?
                                    <Link to={"/messages"} className="popup-with-zoom-anim button dark ripple-effect">
                                        <i className="icon-feather-mail" /> consulter la conversation
                                    </Link>
                                :
                                    <a href="/" className="popup-with-zoom-anim button dark ripple-effect" onClick={onClickMsg}>
                                        <i className="icon-feather-mail" /> Envoyer le message
                                    </a>
                            }
                            <a href="/" className="button gray ripple-effect ico" title="Remove Candidate" data-tippy-placement="top">
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
                    </div>
                </div>
            </div>
        </li>
        </> 
    ) 
} 
export default Manage2Item

const MUTATION_ADD_MSG = gql`
    mutation($Recepteur: ID! $Contenu:String!){
        addMessage(Recepteur: $Recepteur Contenu: $Contenu){
            Contenu
            _id
            Conversation
        }
    }
`