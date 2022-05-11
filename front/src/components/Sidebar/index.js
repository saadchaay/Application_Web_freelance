import React,{Fragment} from 'react'
import {Link} from "react-router-dom"
import A from "../A"
import {useStoreState} from "easy-peasy"

const Sidebar = (props) => {
    const {page}= props;
    const userData = useStoreState(state=>state.compte.Data);
    return(
        <Fragment>
            <div className="dashboard-sidebar">
                <div className="dashboard-sidebar-inner" data-simplebar>
                    <div className="dashboard-nav-container">
                        <A className="dashboard-responsive-nav-trigger">
                            <span className="hamburger hamburger--collapse">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner" />
                                </span>
                            </span>
                        </A>

                        <div className="dashboard-nav">
                            <div className="dashboard-nav-inner">

                                <ul data-submenu-title="">
                                    <li className={(page==="bookmarks")?"active":undefined}>
                                        <a href="/bookmarks">
                                            <i className="icon-material-outline-star-border" /> Marquer-page
                                        </a>
                                    </li>
                                    
                                    <li className="activea">
                                        <a href="/reviews">
                                            <i className="icon-material-outline-rate-review" /> Reviews
                                        </a>
                                    </li>
                                    
                                </ul>

                                <ul data-submenu-title="Organiser et gérer">
                                    
                                    {(userData.TypeCompte==="Entreprise")&&
                                        <li>
                                        <A><i className="icon-material-outline-business-center" /> Travailes</A>
                                        <ul>
                                            <li><a href="/manage/travails">Manage Travailes </a></li>
                                            <li><a href="/addTravail">poster un travail</a></li>
                                        </ul>
                                    </li>
                                }
                                    
                                    <li>
                                        <A><i className="icon-material-outline-assignment" /> projets</A>
                                        <ul>
                                            <li>
                                                <a href="/manage/projets">Manage projets</a>
                                            </li>
                                            {/*<li>
                                                <a href="/bids">My Active Enchers <span className="nav-tag">4</span></a>
                                            </li>*/}
                                            <li>
                                                <a href="/addProjet">poster un projet</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul data-submenu-title="Compte">
                                    <li>
                                        <a href="/parameteres">
                                            <i className="icon-material-outline-settings" />Parameteres
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/bookmarks">
                                            <i className="icon-material-outline-power-settings-new" /> Deconnecter
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Sidebar
