import React from 'react'
import A from "../../components/A"
import ConversationItem from "./ConversationItem"

import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

const Conversations = (props) => { 
    const {userID,selectedConv,setSelectedConv} = props
    const {loading,data,error} = useQuery(QUERY_CONVERSATIONS);
    if(loading||error)return <h1>loading...</h1>;
    
    if(data){
        if(data.getConversations.length===0){
            return (
                <>
                    <div className="messages-inbox col-md-4" id="test0" data-simplebar>
                        <div className="messages-headline">
                            <div className="input-with-icon">
                                <input id="autocomplete-input" type="text" placeholder="Search" />
                                <i className="icon-material-outline-search" />
                            </div>
                        </div>
                        <ul style={{overflowY:"hidden"}}>
                            <li style={{textAlign: "center"}}> Aucune Conversation </li>
                        </ul>
                    </div>
                </>
            );
        }
        if(!selectedConv){
            setSelectedConv(data.getConversations[0]._id)
        }
    }
    // if(error)return <h1>error...</h1>;
    return( 
        <>
            <div className="messages-inbox col-md-4" id="test0" data-simplebar>
                <div className="messages-headline">
                    <div className="input-with-icon">
                        <input id="autocomplete-input" type="text" placeholder="Search" />
                        <i className="icon-material-outline-search" />
                    </div>
                </div>
                <ul style={{overflowY:"hidden"}}>
                    {
                        (data.getConversations.map(ele=>(
                            <ConversationItem key={ele._id}
                                data={ele}
                                userID={userID}
                                selectedConv={selectedConv}
                                setSelectedConv={setSelectedConv}
                            />
                        )))
                    }
                    
                </ul>
        </div>
        </>
    ) 
}
export default Conversations

const QUERY_CONVERSATIONS = gql`
    query{
        getConversations{
            _id
            Compte1{
                _id
                Username
                Image
                TypeCompte
                LastLogin
                IsOnline
            }
            Compte2{
                _id
                Username
                Image
                TypeCompte
                LastLogin
                IsOnline
            }
            CreatedAt
            Messages{
                _id
                Contenu
                CreatedAt
            }
            CountNonVue
        }
    }
`;