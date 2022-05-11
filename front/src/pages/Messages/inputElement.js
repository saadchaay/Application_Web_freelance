import React from 'react'
import gql from "graphql-tag"
import {useMutation} from "@apollo/react-hooks"

const InputElement = (props) => { 
    
    const {Recepteur,refetch} = props
    const [message,setMessage] = React.useState("");
    const onChage = (e)=>{
        setMessage(e.target.value);
        e.target.style.height = "";
        e.target.style.height = e.target.scrollHeight + "px"
    }
    const [addMessage,{loading,error}] = useMutation(MUTATION,{
        update(root,result){
            setMessage("");
            refetch();
        }
    });
    const onSend = (e)=>{
        if(message.trim().length>0){
            addMessage({variables:{
                Recepteur,
                Contenu: message
            }});
        }else {
            setMessage("");
        }
    }    
    if(loading||error)return <h2>loading</h2>;
    
    return(
        <div className="message-reply" style={{boxShadow: "0px 0px 5px #2a41e8",marginTop: "10px"}}>
            <textarea cols={1} onChange={onChage} rows={1} placeholder="Your Message" style={{lineHeight:"0.9",color:"black"}} data-autoresize value={message}/>
            <button onClick={onSend} className="button ripple-effect">Send</button>
        </div>
    ) 
} 
export default InputElement

const MUTATION = gql`
    mutation($Recepteur: ID! $Contenu: String!){
        addMessage(Recepteur: $Recepteur Contenu: $Contenu){
            _id
            Conversation
            Contenu
            Recepteur{
                _id
                Username
                IsOnline
                LastLogin
                Image
            }
            CreatedAt
            Vue
        }
    }
    
`