import React from 'react'
 
const Pagination = (props) => {
    const {current,nbr} = props
    
    return( 
        <>
        <div className="row">
            <div className="col-md-12">
                <div className="pagination-container margin-top-30 margin-bottom-60">
                    <nav className="pagination">
                        <ul>
                        {
                        (current)? 
                            (<li className="pagination-arrow">
                                <a href="/" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-left"/></a>
                            </li>
                        ):null
                        }
                            {
                                (new Array(Math.min(nbr,3))).forEach((item, i) => {
                                return <li><a href="/" className="ripple-effect">1</a></li>
                            })}
                            <li className="pagination-arrow"><a href="/" className="ripple-effect"><i className="icon-material-outline-keyboard-arrow-right" /></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        </> 
    ) 
} 
export default Pagination