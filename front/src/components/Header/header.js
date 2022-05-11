import React,{useEffect,useState} from 'react'
import NavItem from "./NavItem"
import NavList from "./NavList"
import NotificationsList from "./NotificationsList"
import MessagesList from "./MessagesList"
import NavUser from "./NavUser"
import {Link} from "react-router-dom"
import loadjs from "loadjs";
import {useStoreState} from "easy-peasy"
// import A from "../../components/A"
import {FRONT_END_URL} from "../../constants"


import {useQuery,useSubscription} from "@apollo/react-hooks"
import gql from "graphql-tag"
 

const Header = (props) => {
    const {transparent,path} = props
    // const context = useContext(AuthContext);
    useEffect(()=>{
        // loadjs("js/custom.js");
    },[])
    const userData = useStoreState(state=>state.compte.Data);

    const [openedList,setOpenedList] = useState(0)
    // const [trans,setTrans] = useState(false);
    // useEffect(()=>{
    //     // window.alert("line");
    //     // window.console.log(window.location.href)
    //     setTrans((window.location.pathname==="/"));
    // },[window.location.pathname])
    const onDropDownList =  id =>()=>{
        let nextOpened = 0
        if(openedList !== id){
            nextOpened = id
        }
        setOpenedList(nextOpened)
    }
    // const {data ,loading, error} = useSubscription(SUBSCRIPTION);
    // if(error){
    //     window.alert("error")
    //     console.log(error);
    // }else if(data){
    //     window.alert("data")
    //     console.log(data);
    // }

    return(
        <>
        <header id="header-container" className={"fullwidth "+(transparent?"transparent-header":"")}>
            <div id="header">
                <div className="container">
                    <div className="left-side">
                        <div id="logo">
                            <a href="/">
                                <img src={FRONT_END_URL+"images/logo2.png"} data-sticky-logo={FRONT_END_URL+"images/logo.png"} data-transparent-logo={FRONT_END_URL+"images/logo.png"} alt=""/>
                            </a>
                        </div>
                        <nav id="navigation">
                            <ul id="responsive">
                            {
                                (userData)?(
                                    <>
                                        <NavItem active={path==="dashboard"}    title="tableau de bord"    href="/dashboard"   />
                                        <NavItem active={path==="projets"}      title="projets"      href="/projets"     />
                                        <NavItem active={path==="travails"}     title="travails"     href="/travails"    />
                                        <NavItem active={path==="entreprises"}  title="entreprises"  href="/entreprises" />
                                        <NavItem active={path==="utilisateurs"} title="utilisateurs" href="/utilisateurs"/>
                                    </>
                                ):(
                                    <></>
                                )
                            }
                            </ul>
                        </nav>

                        <div className="clearfix" />
                    </div>
                    
                    <div className="right-side">
                        {
                            (userData)?(
                                <>
                                    <div className="header-widget hide-on-mobile">
                                        <NotificationsList user={userData} 
                                            opened={(openedList===1)}
                                            setOpen={onDropDownList(1)}
                                        />
                                        <MessagesList user={userData}
                                            opened={(openedList===2)} 
                                            setOpen={onDropDownList(2)}
                                        />
                                    </div>
                                    <NavUser opened={(openedList===3)} setOpen={onDropDownList(3)}/>
                                </>
                            ):(
                                <div className="header-widget">
                                    <Link to="/login" className=" log-in-button">
                                        <i className="icon-feather-log-in"></i>
                                        <span>Log In / Register</span>
                                    </Link>
                                </div>
                            )
                        }                
                        <span className="mmenu-trigger">
                            <button className="hamburger hamburger--collapse" type="button">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner" />
                                </span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}
export default Header

const SUBSCRIPTION = gql`
    subscription{
        messageCreated(ID: "5e89e14b61a9170afcca7a52"){
            _id
            Contenu
            Emetteur{
                _id
                Username
            }
            CreatedAt
        }
    }
`