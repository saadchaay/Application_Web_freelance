import React from 'react'
import {useInput} from "../../hooks"

const Part3 = (props) => { 
    
    const password = useInput("");
    const passwordNew = useInput("");
    const passwordNew2 = useInput("");
    
    
    
    return( 
        <>
            <div className="col-xl-12">
                <div id="test1" className="dashboard-box">
                    <div className="headline">
                        <h3><i className="icon-material-outline-lock" /> mote de passe &amp; Securité</h3>
                    </div>
                    <div className="content with-padding">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>mote de passe en cours</h5>
                                    <input type="password" className="with-border" {...password}/>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Noveau mote de passe</h5>
                                    <input type="password" className="with-border" {...passwordNew}/>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="submit-field">
                                    <h5>Repeat mote de passe</h5>
                                    <input type="password" className="with-border" {...passwordNew2}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    ) 
} 
export default Part3