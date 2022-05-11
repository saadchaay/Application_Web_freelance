import React from 'react'
import moment from "moment"

import ReactEmoji from "react-emoji"
import {FRONT_END_URL} from "../../constants"


const MessageItem = (props) => { 
    const {data,Other,Me} = props;
    const isMine = data.Emetteur._id===Me._id
    return( 
        <>
            <div className={isMine?"message-bubble me":"message-bubble"}>
                <div className="message-bubble-inner">
                    <div className="message-avatar">
                        <img src={data.Emetteur.Image||(FRONT_END_URL+"images/"+((data.Emetteur.TypeCompte==="Utilisateur")?"user-avatar":"company-logo")+"-placeholder.png")} alt="" />
                    </div>
                    <div className="message-text">
                        <p>{ReactEmoji.emojify(data.Contenu)}</p>
                        <i style={{
                            background: "white",
                            paddingBottom: 0,
                            marginBottom: "-34px",
                            position: "relative",
                            bottom: "-12px",
                            color: "#2a41e8",
                            fontSize: "15px",
                            padding: "0px 10px"
                        }}>
                        {moment((new Date(parseInt(data.CreatedAt))).toISOString()).fromNow()}
                        </i>
                    </div>
                </div>
                <div className="clearfix" />
            </div>
        </> 
    ) 
} 
export default MessageItem