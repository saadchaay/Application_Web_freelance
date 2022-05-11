import React from 'react'
import A from "../../components/A"
import moment from "moment"
import ReactEmoji from "react-emoji"
import {FRONT_END_URL} from "../../constants"
 
 
const ConversationItem = (props) => { 
    const {userID,data,selectedConv,setSelectedConv} = props
    const onClick = (e)=>{
        setSelectedConv(data._id);
    }
    const othersCompte = (data.Compte1._id===userID)?data.Compte2 : data.Compte1;
    const status = (othersCompte.IsOnline)?"status-icon status-online":"status-icon status-offline";
    const indexOfLast = data.Messages.length - 1
    
    return( 
        <li className={(data._id===selectedConv)?"active-message":""} onClick={onClick}>
            <A>
                <div className="message-avatar">
                    <i className={status} />
                    <img src={othersCompte.Image||(FRONT_END_URL+"images/"+((othersCompte.TypeCompte==="Utilisateur")?"user-avatar":"company-logo")+"-placeholder.png")} alt=""/>
                </div>
                <div className="message-by">
                    <div className="message-by-headline">
                        <h5>{othersCompte.Username}</h5>
                        <span>{moment((new Date(parseInt(othersCompte.LastLogin))).toISOString()).fromNow()}</span>
                    </div>
                    <p>{ReactEmoji.emojify(data.Messages[indexOfLast].Contenu)}</p>
                </div>
            </A >
        </li>
    )
} 
export default ConversationItem
// 