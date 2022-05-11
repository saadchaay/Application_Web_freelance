import React from 'react';
import Skeleton from 'react-loading-skeleton';
import A from "../../components/A/A"
import {FRONT_END_URL} from "../../constants"

const CategorieItem = ({loading,Icon,title,count}) => {
    
    if(loading){
        return(
            <>
            <div className="col-xl-3 col-md-6" style={{marginBottom:"30px",transform:"translateY(-8px)"}}>
                <Skeleton width={"100%"} height={160}/>
            </div>
            </>
        )
    }else{
        // console.log(background);
        const image = "url('"+Icon+"')";
        return(
            <>
            <div className="col-xl-3 col-md-6">
                <A className="photo-box small" data-background-image={Icon} style={{backgroundImage: image}}>
                    <div className="photo-box-content">
                        <h3>{title}</h3>
                        <span>{count}</span>
                    </div>
                </A>
            </div>
            </>
        )    
    }    
}
export default CategorieItem;