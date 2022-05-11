import React from 'react'

const Input = (props) => {
    const {type,icon,value,onChange,placeholder,name,error,required} = props

    const error_icon = <i className="error-icon icon-feather-alert-octagon error-input"/>;

    const input_className = "input-text with-border "+(error&&"error-input")
    // const icon_classeName = "icon-material-baseline-mail-outline";


    // const {type,icon,value,onChange,placeholder,name,title,border,error,required} = props;


    // const div_className = (icon&&"input-with-icon-left ")+(border?" with-border":" no-border");

    // const input_className = "input-text"+(border&&" with-border ")+(error&&" error-input");

    return(
        <>
        <div className="input-with-icon-left">
			{error? (error_icon):( icon && <i className={icon}/>)}
            <input type={type} placeholder={placeholder} required={required} name={name} className={input_className}
                value={value} onChange={onChange}/>
		</div>
        {error? (
            <div className="error-msg">
                {error}
            </div>
        ):( null)}
        </>
    )
}
export default Input
/*
<div className={div_className} data-tippy-placement="top" data-tippy="" data-original-title={title}>
    {error? (error_icon):( icon && <i className={icon}/>)}
    <input type={type} placeholder={placeholder} required={required} name={name}
        className={input_className}
        value={value} onChange={onChange}
    />
</div>


*/
