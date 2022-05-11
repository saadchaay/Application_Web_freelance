import React,{Fragment} from 'react'

const A = (props) => {
     const {className,style} = props
     return(
          <Fragment>
               <a className={className} style={style} href="/" onClick={e=>{e.preventDefault()}}>
                    {props.children}
               </a>
          </Fragment>
     )
}
export default A
