import React from 'react'
import gql from "graphql-tag"
import {useQuery,useMutation,useLazyQuery} from "@apollo/react-hooks"
import moment from "moment"
import ScrollToBottom from 'react-scroll-to-bottom';
import Skeleton from 'react-loading-skeleton';
import InputElement from "./inputElement"
import MessageItem from "./messageItem"

const Chat = (props) => { 
    
    const {userID,selectedConv} = props
    const height = window.screen.height
    
    
    const [vueConv] = useMutation(MUTATION_VUEMSGs);
    const [Vued,setVued] = React.useState(false);
    const [getConversation,{called,loading,error,data,refetch}] = useLazyQuery(QUERY_CONVERSATION);
    
    if((!called)&&selectedConv){
        getConversation({variables:{ID: selectedConv}});
    }
    
    if(loading||error) return <div className="message-content"><Skeleton/></div>;
    
    if(data){
        if(!Vued){
            vueConv({variables:{ID:data.getConversation._id}});
            setVued(true);
        }    
        const Other = (data.getConversation.Compte1._id===userID)?data.getConversation.Compte2 : data.getConversation.Compte1;
        const Me = (data.getConversation.Compte1._id===userID)?data.getConversation.Compte1 : data.getConversation.Compte2;
        let messages = data.getConversation.Messages;
        const addMsg = (data)=>{
            messages.push(data);
        }
        return (
        <>
            <div className="message-content">
                <div className="messages-headline">
                    <h4>{Other.Username}</h4>
                </div>
                    <ScrollToBottom data-simplebar className="message-content-inner" style={{scrollbarWidth:"none"}}>
                        {messages.map(ele=>(<MessageItem data={ele} key={ele._id} Other={Other} Me={Me}/>))}
                    </ScrollToBottom>
                  <div className="clearfix"/>
            {/* Reply Area */}
            <InputElement Recepteur={Other._id} refetch={refetch}/>
        </div>
        </>
    )
}
return <div className="message-content"><Skeleton height={height}/></div>;
} 
export default Chat

const QUERY_CONVERSATION = gql`
    query($ID: ID! $Skip: Int $Limit: Int){
        getConversation(ID: $ID Skip: $Skip Limit: $Limit){
            _id
            Compte1{
                _id
                Username
                Image
                LastLogin
                IsOnline
                TypeCompte
            }
            Compte2{
                _id
                Username
                Image
                LastLogin
                IsOnline
                TypeCompte
                
            }
            CreatedAt
            Messages{
                _id
                Contenu
                Emetteur{
                    _id
                    Username
                    TypeCompte
                    
                }
                Recepteur{
                    _id
                    Username
                    TypeCompte
                    
                }
                CreatedAt
                Vue
            }
            CountNonVue
        }
    }
`;
const MUTATION_VUEMSGs = gql`
    mutation($ID: ID!){
        VueConversation(Conversation: $ID){
            Compte1{
                _id
                Username
                IsOnline
            }
            Compte2{
                _id
                IsOnline
            }
            CreatedAt
            Messages{
                _id
                Contenu
                Emetteur{
                    _id
                    Username
                }
                Recepteur{
                    _id
                    Username
                }
                CreatedAt
                Vue
            }
            CountNonVue
        }
    }
`;
/*
    <div className="message-time-sign">
    <span>Yesterday</span>
    </div>                    
*/