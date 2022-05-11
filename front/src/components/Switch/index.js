import React,{Fragment} from 'react'

const Switch = (props) => {
    const {radio1,radio2,onChange,id,value,name,size} = props
    // radio : {value,label,icon}
    return(
        <Fragment>
            <div className="account-type">
                <div>
                    <input type="radio" id={id+"1"} className="account-type-radio" name={name} value={radio1.value}
                    checked={(value===radio1.value)} onChange={onChange}
                />
                <label htmlFor={id+"1"} className="ripple-effect-dark" style={{fontSize: size}}>
                    <i className={radio1.icon} style={{fontSize: size}}/>{radio1.label}
                </label>
            </div>
            <div>
                <input type="radio" id={id+"2"} className="account-type-radio" name={name} value={radio2.value}
                    checked={(value===radio2.value)}  onChange={onChange}
                />
                <label htmlFor={id+"2"} className="ripple-effect-dark" style={{fontSize: size}}>
                    <i className={radio2.icon} style={{fontSize: size}}/>{radio2.label}
                </label>
            </div>
        </div>
        </Fragment>
    )
}
export default Switch
