import React from 'react'
import A from "../A"
import {Link }from "react-router-dom"
import Skeleton from 'react-loading-skeleton'

import {useQuery} from "@apollo/react-hooks"

const NavList = (props) => {
    const {query,type,count,opened,setOpen} = props
    const iconButton = (type==="messages")?"icon-feather-mail":"icon-feather-bell"
    
    const {loading,data,error} = useQuery(query);
    if(loading){
        return (
            <>
                <div className={"header-notifications "+((opened)&&" active")}>
                    <div className="header-notifications-trigger" onClick={setOpen}>
                        <A><i className={iconButton}/><span>{count}</span></A>
                    </div>
                </div>
            </>
        );
    }else if(error) {
        return (
            <>
                <div className={"header-notifications "+((opened)&&" active")}>
                    <div className="header-notifications-trigger" onClick={setOpen}>
                        <A><i className={iconButton}/><span>99</span></A>
                    </div>
                </div>
            </>
        );
    }else if(data) {
        return(
            <>
                <div className={"header-notifications "+((opened)&&" active")}>
                    <div className="header-notifications-trigger" onClick={setOpen}>
                        <A><i className={iconButton}/><span>{count}</span></A>
                    </div>
                    <div className="header-notifications-dropdown">
                        <div className="header-notifications-headline">
                            <h4>{type}</h4>
                            <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                                <i className="icon-feather-check-square" />
                            </button>
                        </div>
                        <div className="header-notifications-content">
                            <div className="header-notifications-scroll" data-simplebar>
                                <ul>
                                {
                                    (type==="messages")?
                                        (<>
                            <Message loading={false} sender={{name:"mohamed",avatar:"images/user-avatar-small-03.jpg",status:"online"}} href="/" content="Thanks for reaching out. I'm quite busy right now on many..." time="1 hours ago"/>
                            
                            <Message loading sender={{name:"mohamed",avatar:"images/user-avatar-small-03.jpg",status:"online"}} href="/" content="Thanks for reaching out. I'm quite busy right now on many..." time="1 hours ago"/>
                            </>)
                            :
                            (<>
                                <Notification loading/>
                                <Notification loading/>
                                <Notification loading/>
                                </>)
                            }
                            </ul>
                            </div>
                            </div>
                            <Link to="/messages" className="header-notifications-button ripple-effect button-sliding-icon">View All {type}<i className="icon-material-outline-arrow-right-alt" /></Link>
                            </div>
                            </div>
                            </>
                        )
    
    
    
    
    
    
    
    
    
    
    
    
    
        
}
}
export default NavList
///for messages
const Message = (props)=>{
    const {sender,href,content,time} = props
    const {name,avatar,status} = sender
    const {loading} = props
    if(loading){
        return <LoadingMessage/>
    }else {
        return(
            <>
                <li className="notifications-not-read">
                    <Link to={href}>
                        <span className={"notification-avatar status-"+status}>
                            <img src={avatar} alt=""/>
                        </span>
                        <div className="notification-text">
                            <strong>{name}</strong>
                            <p className="notification-msg-text">
                                {content}
                            </p>
                            <span className="color">{time}</span>
                        </div>
                    </Link>
                </li>
            </>
        )
    }
}
// for notifications
const Notification = (props)=>{
    const {content,icon} = props
    const {loading} = props
    if(loading){
        return <LoadingNotification/>
    }else {
        return(
            <>
                <li className="notifications-not-read">
                    <a href="dashboard-manage-candidates.html">
                        <span className="notification-icon">
                            <i className={icon} />
                        </span>
                        <span className="notification-text">
                            <strong>{content.from}</strong> {content.type} <span className="color">{content.job}</span>
                        </span>
                    </a>
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
const LoadingNotification =  (props)=>{
    return (
        <>
            <li>
                <A>
                    <span className="notification-icon">
                        <Skeleton width={40} height={30}/>
                    </span>
                    <span className="notification-text">
                        <Skeleton count={2}/>
                    </span>
                </A>
            </li>
        </>
    )
}
