import React from 'react'
import {useQuery} from "@apollo/react-hooks"
import gql from "graphql-tag" 

const Notifications = (props) => { 
    return( 
        <>
        <div className="col-xl-6">
            <div className="dashboard-box">
                <div className="headline">
                    <h3><i className="icon-material-baseline-notifications-none" /> Notifications</h3>
                    <button className="mark-as-read ripple-effect-dark" data-tippy-placement="left" title="Mark all as read">
                        <i className="icon-feather-check-square" />
                    </button>
                </div>
                <div className="content">
                    <ul className="dashboard-box-list">
                    <li>
                    <h3> aucune notification</h3>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
        </> 
    ) 
} 
export default Notifications

// <li>
//     <span className="notification-icon"><i className="icon-material-outline-group" /></span>
//     <span className="notification-text">
//         <strong>Michael Shannah</strong> applied for a job <a href="#">Full Stack Software Engineer</a>
//     </span>
//     {/* Buttons */}
//     <div className="buttons-to-right">
//         <a href="#" className="button ripple-effect ico" title="Mark as read" data-tippy-placement="left">
//             <i className="icon-feather-check-square" />
//         </a>
//     </div>
// </li>
// <li>
//     <span className="notification-icon"><i className=" icon-material-outline-gavel" /></span>
//     <span className="notification-text">
//         <strong>Gilber Allanis</strong> placed a bid on your <a href="#">iOS App Development</a> project
//     </span>
//     {/* Buttons */}
//     <div className="buttons-to-right">
//         <a href="#" className="button ripple-effect ico" title="Mark as read" data-tippy-placement="left">
//             <i className="icon-feather-check-square" />
//         </a>
//     </div>
// </li>
// <li>
//     <span className="notification-icon"><i className="icon-material-outline-autorenew" /></span>
//     <span className="notification-text">
//         Your job listing <a href="#">Full Stack Software Engineer</a> is expiring
//     </span>
//     {/* Buttons */}
//     <div className="buttons-to-right">
//         <a href="#" className="button ripple-effect ico" title="Mark as read" data-tippy-placement="left">
//             <i className="icon-feather-check-square" />
//         </a>
//     </div>
// </li>
// <li>
//     <span className="notification-icon"><i className="icon-material-outline-group" /></span>
//     <span className="notification-text">
//         <strong>Sindy Forrest</strong> applied for a job <a href="#">Full Stack Software Engineer</a>
//     </span>
//     {/* Buttons */}
//     <div className="buttons-to-right">
//         <a href="#" className="button ripple-effect ico" title="Mark as read" data-tippy-placement="left">
//             <i className="icon-feather-check-square" />
//         </a>
//     </div>
// </li>
// <li>
//     <span className="notification-icon"><i className="icon-material-outline-rate-review" /></span>
//     <span className="notification-text">
//         <strong>David Peterson</strong> left you a <span className="star-rating no-stars" data-rating={5.0} /> rating after finishing <a href="#">Logo Design</a> task
//     </span>
//     {/* Buttons */}
//     <div className="buttons-to-right">
//         <a href="#" className="button ripple-effect ico" title="Mark as read" data-tippy-placement="left">
//             <i className="icon-feather-check-square" />
//         </a>
//     </div>
// </li>