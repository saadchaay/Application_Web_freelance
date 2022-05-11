
import React from 'react'
import {Link }from "react-router-dom"
import Skeleton from 'react-loading-skeleton'
import moment from "moment"
import gql from "graphql-tag"
import ReactEmoji from "react-emoji"
import { useStoreActions,useStoreState } from "easy-peasy"
import {useQuery,useSubscription} from "@apollo/react-hooks"

import A from "../A"
import {FRONT_END_URL} from "../../constants"


const MessagesList = (props) => {
    const {opened,setOpen,user} = props
    
    const userData = useStoreState(state=>state.compte.Data);
    const MessagesData = useStoreState(state=>state.compte.Messages);
    const NewMessage = useStoreActions(actions=>actions.compte.newMessage);
    const InitMessages = useStoreActions(actions=>actions.compte.intMessages);
    
    const {loading,data,error} = useQuery(QUERY_NonVueMessages,{
        onCompleted: (data)=>{
            InitMessages(data.getNonVueMessages);
        }
    });
    // console.log("MessagesData",MessagesData);
    const {data: dataSub} =  useSubscription( SUBSCRIPTION_MessageCreated,
        {
            variables: { ID: user.ID },
            onSubscriptionData: ({ subscriptionData }) => {
                // console.log(subscriptionData);
                if(subscriptionData.data.messageCreated.Emetteur._id !== userData.ID){
                    console.log(subscriptionData);
                    NewMessage({...subscriptionData.data.messageCreated});
                }
            },
        }
    );
    if(loading||error){
        return (
            <>
                <div className={"header-notifications "+((opened)&&" active")}>
                    <div className="header-notifications-trigger" onClick={setOpen}>
                        <A><i className="icon-feather-mail"/><span>??</span></A>
                    </div>
                </div>
            </>
        );
    }else if(data) {
         return(
            <>
                <div className={"header-notifications "+((opened)&&" active")}>
                    <div className="header-notifications-trigger" onClick={setOpen}>
                        <A><i className="icon-feather-mail"/><span>{MessagesData.length}</span></A>
                    </div>
                    
                    <div className="header-notifications-dropdown">
                        <div className="header-notifications-headline">
                            <h4>Messages</h4>
                            <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                                <i className="icon-feather-check-square" />
                            </button>
                        </div>
                        <div className="header-notifications-content">
                            <div className="header-notifications-scroll" data-simplebar>
                                <ul style={{overflowY: "auto",maxHeight: "18.7em"}}>
                                {opened&&(
                                    (MessagesData.length===0)?
                                        <span style={{textAlign: "center",display:"block",padding:"10px"}}> pas de message</span>
                                    :
                                        MessagesData.map(ele=>(<Message key={ele._id} _id={ele._id}/>))
                                    )
                                }
                                </ul>
                            </div>
                        </div>
                        <Link to="/messages" className="header-notifications-button ripple-effect button-sliding-icon">
                            View All Messages <i className="icon-material-outline-arrow-right-alt" />
                        </Link>
                    </div>
                </div>
            </>
         )
     }
 }
                            
export default MessagesList

const Message = (props)=>{
    const {_id} = props
    
    const {loading,data,error} = useQuery(QUERY_Message,{
        variables:{
        ID: _id}
    });
    if(loading||error){
        return <LoadingMessage/>
    }else {
        let avatar = (data.getMessage.Emetteur.Image)?FRONT_END_URL+data.getMessage.Emetteur.Image:FRONT_END_URL+"images/user-avatar-small-01.jpg";
        return(
            <>
                <li className="notifications-not-read">
                    <Link to={"/messages/"+data.getMessage.Conversation}>
                        <span className={"notification-avatar status-online"}>
                            <img src={avatar} alt=""/>
                        </span>
                        <div className="notification-text">
                            <strong>{data.getMessage.Emetteur.Username}</strong>
                            &nbsp;&nbsp;<p className="notification-msg-text">
                                {ReactEmoji.emojify(data.getMessage.Contenu)}
                            </p>
                            <br/>
                            <span className="color">{moment((new Date(parseInt(data.getMessage.CreatedAt))).toISOString()).fromNow()}</span>
                        </div>
                    </Link>
                </li>
            </>
        )
    }
}
const LoadingMessage = (props)=>{
    return (
        <>
            <li className="notifications-not-read">
                <A>
                    <span className="notification-avatar status-offline">
                        <Skeleton circle={true} height={42} width={42} />
                    </span>
                    <div className="notification-text">
                        <Skeleton/>
                        <Skeleton count={2} height="12px"/>
                        <Skeleton width="10em" height="12px"/>
                    </div>
                </A>
            </li>
        </>
    )
}
const QUERY_NonVueMessages = gql`
    query{
        getNonVueMessages{
            _id
        }
    }
`;
const QUERY_Message = gql`
    query($ID: ID!){
        getMessage(ID: $ID){
            _id
            Contenu
            Conversation
            Emetteur{
                _id
                Username
                Image
            }
            CreatedAt
        }
    }
`;
const SUBSCRIPTION_MessageCreated = gql`
    subscription($ID: ID!){
        messageCreated(ID: $ID){
            _id
            Contenu
            Conversation
            Emetteur{
                _id
                Username
                Image
            }
            CreatedAt
        }
    }
`;