import React from 'react'
import {Link} from "react-router-dom"
import { useStoreActions } from "easy-peasy"
import {useStoreState} from "easy-peasy"
import {useQuery,useMutation} from "@apollo/react-hooks"
import gql from "graphql-tag"

import A from "../../components/A"
import {FRONT_END_URL} from "../../constants"

const NavUser = (props) => {
    const {opened,setOpen} = props
    const [OnlineSatatus,setOnlineSatatus] = React.useState(true)
    let avatar = FRONT_END_URL;
    
    const userData = useStoreState(state=>state.compte.Data);
    const logout_user = useStoreActions(actions=>actions.compte.logout);
    const [toggelStatus] = useMutation(MUTATION_TOGGLE_STATUS,{
        onCompleted: (data)=>{
            console.log(data.toggelOnline);
            setOnlineSatatus(data.toggelOnline);
        }
    });
    const {loading,data,error} = useQuery(QUERY_COMPTE,{
        onCompleted: data=>{
            setOnlineSatatus(data.getCompte.IsOnline);
        }
    });
    
    const handelLogOut = ()=>{
        logout_user();
        localStorage.removeItem('token');
        setOpen();
        window.location.pathname = "/"
    }
    
    // "Online";
    
    if(error){
        console.log(error);// window.alert("eeeeeeeeeerrrqsvdfbgn chn h");
    }else if(data){            
        if(data.getCompte.Image){
            avatar = data.getCompte.Image;
        }else {
            if(data.getCompte.TypeCompte==="Utilisateur"){
                avatar += "images/user-avatar-placeholder.png";
            }else {
                avatar += "images/company-logo-placeholder.png";
            }
        }
    }
    
    return(
        <>
            <div className="header-widget">
                <div className={"header-notifications user-menu "+((opened)&&" active")}>
                    <div className="header-notifications-trigger" onClick={setOpen}>
                        <A>
                            <div className={(OnlineSatatus)?"user-avatar status-online":"user-avatar status-offline"}>
                                <img src={avatar} alt="avatar" />
                            </div>
                        </A>
                    </div>
                
                    <div className="header-notifications-dropdown">
                        <div className="user-status">
                            <div className="user-details">
                                <div className={(OnlineSatatus)?"user-avatar status-online":"user-avatar status-offline"}>
                                    <img src={avatar} alt="" />
                                </div>
                                <div className="user-name">
                                    {(data)?data.getCompte.Username:userData.Username} <span>{(data)?data.getCompte.TypeCompte:""}</span>
                                </div>
                            </div>
                        
                            <div className="status-switch" id="snackbar-user-status" onClick={toggelStatus}>
                                <label className={OnlineSatatus?"user-online current-status":"user-online"}>Online</label>
                                <label className={OnlineSatatus?"user-invisible":"user-invisible current-status"}>Invisible</label>
                                <span className={(OnlineSatatus)?"status-indicator":"status-indicator right"} aria-hidden="true" />
                            </div>
                        
                        </div>
                        
                        <ul className="user-menu-small-nav">
                            <li>
                                <Link to="/dashboard"><i className="icon-material-outline-dashboard" /> Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/parameteres"><i className="icon-material-outline-settings" /> Settings</Link>
                            </li>
                            <li>
                                <a href="/" onClick={e=>{e.preventDefault();handelLogOut()}}>
                                    <i className="icon-material-outline-power-settings-new"/> Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavUser

const QUERY_COMPTE = gql`
    query{
        getCompte{
            _id
            Username
            Image
            TypeCompte
            IsOnline
        }
    }
`;
const MUTATION_TOGGLE_STATUS = gql`
    mutation{
        toggelOnline
    }
`;