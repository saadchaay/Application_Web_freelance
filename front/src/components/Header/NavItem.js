import React from 'react'
import {Link} from "react-router-dom"


const NavItem = (props) => {
    const {href,title,active} = props
    const className = (active)?"current":"";
    const goTo = ()=>{
        window.location.pathname=href
        if(active){
        }
    }
    return(
        <>
            <li id="NavItem" onClick={goTo}>
                <Link to={href} className={className}>
                    {title}
                </Link>
            </li>
        </>
    )
}
export default NavItem
