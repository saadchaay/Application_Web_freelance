import React from 'react'
import A from "../A"
import {Link }from "react-router-dom"
import Skeleton from 'react-loading-skeleton'
import moment from "moment"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"

const NotificationsList = (props) => {
    const {opened,setOpen} = props
    const {loading,data,error} = useQuery(QUERY_NonVueNotifications);
    if(loading||error){
        return (
            <>
                <div className={"header-notifications "+((opened)&&" active")}>
                    <div className="header-notifications-trigger" onClick={setOpen}>
                        <A><i className="icon-feather-bell"/><span>??</span></A>
                    </div>
                </div>
            </>
        );
    }else if(data) {
        return(
            <>
                <div className={"header-notifications "+((opened)&&" active")}>
                    <div className="header-notifications-trigger" onClick={setOpen}>
                        <A><i className="icon-feather-bell"/><span>{data.getNonVueNotifications.length}</span></A>
                    </div>
                    <div className="header-notifications-dropdown">
                        <div className="header-notifications-headline">
                            <h4>Notifications</h4>
                            <button className="mark-as-read ripple-effect-dark" title="Mark all as read" data-tippy-placement="left">
                                <i className="icon-feather-check-square" />
                            </button>
                        </div>
                        <div className="header-notifications-content">
                            <div className="header-notifications-scroll" data-simplebar>
                                <ul>
                                {
                                    opened&&(
                                        (data.getNonVueNotifications.length===0)?<span style={{textAlign: "center",display:"block",padding:"10px"}}>pas de notifications</span>:
                                        data.getNonVueNotifications.map(ele=>(<Notification key={ele._id} _id={ele._id}/>))
                                    )
                                }
                                </ul>
                            </div>
                        </div>
                        <Link to="/dashboard" className="header-notifications-button ripple-effect button-sliding-icon">
                            View All Notifications <i className="icon-material-outline-arrow-right-alt"/>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}
export default NotificationsList

const Notification = (props)=>{
    const {_id} = props
    const {loading,data,error} = useQuery(QUERY_Notification,{
        variables:{
        ID: _id}
    });
    if(loading||error){
        return <LoadingNotification/>
    }else {
        return(
            <>
                <li className="notifications-not-read">
                    <a href="dashboard-manage-candidates.html">
                        <span className="notification-icon">
                            <i className={data.getNotification.Type} />
                        </span>
                        <span className="notification-text">
                            <strong>{data.getNotification.Emetteur.Username}</strong> 
                            &nbsp;&nbsp;{data.getNotification.Contenu}
                            <br/>
                            <span className="color">{moment((new Date(parseInt(data.getNotification.CreatedAt))).toISOString()).fromNow()}</span>
                        </span>
                    </a>
                </li>
            </>
        )
    }
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
const QUERY_NonVueNotifications = gql`
    query{
        getNonVueNotifications{
            _id
        }
    }
`;
const QUERY_Notification = gql`
    query($ID: ID!){
        getNotification(ID: $ID){
            _id
            Emetteur{
                Username
                Image
            }
            Icon
            Type
            Contenu
            CreatedAt
        }
    }
`;