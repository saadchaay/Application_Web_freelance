import React from 'react'
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"
import {useStoreState} from "easy-peasy"

import Header from "../../components/Header";
import "./messages.css"
// import {Link} from "react-router-dom"
// import Footer from "../components/Footer";
// import SideBar from "../components/Sidebar"
import Conversations from "./Conversations"
import Chat from "./Chat"
import include  from "../../utils/includer.js"
import {FRONT_END_URL} from "../../constants"

// import MessageItem from "./Messages/MessageItem"
 
const MessagesPage = ({props}) => {
    document.getElementById('wrapper').className="awrapper-with-transparent-header";    
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    
    const userData = useStoreState(state=>state.compte.Data);
    
    const [selectedConv,setSelectedConv] = React.useState(props?props.match.params.id:null)
    // if(props.match&&props.match.params&&props.match.params.id){
    //     setSelectedConv(props.match.params.id)
    // }
    return( 
        <>
        <Header transparent={false}  path="messages"/>
        <div className="dashboard-container" style={{overflow: "hidden"}}>
            <div className="dashboard-content-container" data-simplebare style={{overflow: "hidden"}}>
                <div className="dashboard-content-inner" style={{padding:"10px 10px 0px 10px",overflow: "hidden"}}>
                    <div className="messages-container margin-top-0" style={{overflow: "hidden"}}>
                        <div className="messages-container-inner" style={{
                            display: "flex",
                            overflow: "hidden",
                            height: "100vh",
                            marginTop: "-100px",
                            paddingTop: "100px",
                            position: "relative",
                            width: "100%",
                            backfaceVisibility: "hidden",
                            willChange: "overflow",
                        }}>                      
                        
                            <Conversations userID={userData.ID} selectedConv={selectedConv} setSelectedConv={setSelectedConv}/>
                            <Chat selectedConv={selectedConv} userID={userData.ID}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </>
    ) 
} 
export default MessagesPage















 const Conversationsa = (props)=>{
     return (
         <>
         <div className="messages-inbox" id="test0" data-simplebar>
             <div className="messages-headline">
                 <div className="input-with-icon">
                     <input id="autocomplete-input" type="text" placeholder="Search" />
                     <i className="icon-material-outline-search" />
                 </div>
             </div>
             <ul style={{overflowY:"hidden"}}>
             <li>
                 <a href="/">
                     <div className="message-avatar">
                         <i className="status-icon status-offline" /><img src="images/user-avatar-small-02.jpg" alt="" />
                     </div>
                     <div className="message-by">
                         <div className="message-by-headline">
                             <h5>Sindy Forest</h5>
                             <span>Yesterday</span>
                         </div>
                         <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                     </div>
                 </a></li>
             <li>
                 <a href="/">
                     <div className="message-avatar">
                         <i className="status-icon status-offline" /><img src="images/user-avatar-small-02.jpg" alt="" />
                     </div>
                     <div className="message-by">
                         <div className="message-by-headline">
                             <h5>Sindy Forest</h5>
                             <span>Yesterday</span>
                         </div>
                         <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                     </div>
                 </a></li>
             <li >
                 <a href="/">
                     <div className="message-avatar">
                         <i className="status-icon status-offline" /><img src="images/user-avatar-small-02.jpg" alt="" />
                     </div>
                     <div className="message-by">
                         <div className="message-by-headline">
                             <h5>Sindy Forest</h5>
                             <span>Yesterday</span>
                         </div>
                         <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                     </div>
                 </a></li>
             <li className="active-message">
                 <a href="/">
                     <div className="message-avatar">
                         <i className="status-icon status-offline" /><img src="images/user-avatar-small-02.jpg" alt="" />
                     </div>
                     <div className="message-by">
                         <div className="message-by-headline">
                             <h5>Sindy Forest</h5>
                             <span>Yesterday</span>
                         </div>
                         <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                     </div>
                 </a></li>
             <li className="active-message">
                 <a href="/">
                     <div className="message-avatar">
                         <i className="status-icon status-offline" /><img src="images/user-avatar-small-02.jpg" alt="" />
                     </div>
                     <div className="message-by">
                         <div className="message-by-headline">
                             <h5>Sindy Forest</h5>
                             <span>Yesterday</span>
                         </div>
                         <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                     </div>
                 </a></li>
             <li className="active-message">
                 <a href="/">
                     <div className="message-avatar">
                         <i className="status-icon status-offline" /><img src="images/user-avatar-small-02.jpg" alt="" />
                     </div>
                     <div className="message-by">
                         <div className="message-by-headline">
                             <h5>Sindy Forest</h5>
                             <span>Yesterday</span>
                         </div>
                         <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                     </div>
                 </a></li>
             <li className="active-message">
                 <a href="/">
                     <div className="message-avatar">
                         <i className="status-icon status-offline" /><img src="images/user-avatar-small-02.jpg" alt="" />
                     </div>
                     <div className="message-by">
                         <div className="message-by-headline">
                             <h5>Sindy Forest</h5>
                             <span>Yesterday</span>
                         </div>
                         <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                     </div>
                 </a></li>
             <li className="active-message">
                 <a href="/">
                     <div className="message-avatar">
                         <i className="status-icon status-offline" /><img src="images/user-avatar-small-02.jpg" alt="" />
                     </div>
                     <div className="message-by">
                         <div className="message-by-headline">
                             <h5>Sindy Forest</h5>
                             <span>Yesterday</span>
                         </div>
                         <p>Hi Tom! Hate to break it to you but I'm actually on vacation</p>
                     </div>
                 </a></li>
             </ul>
         </div>
         </>
     );
 }
/*
var groupBy = function(xs, key) {
 return xs.reduce(function(rv, x) {
   (rv[x[key]] = rv[x[key]] || []).push(x);
   return rv;
 }, {});
}; 
*/