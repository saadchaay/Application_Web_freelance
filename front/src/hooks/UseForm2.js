import {useState } from "react";

export default function useForm(callback, initialState) {
    const [values,setValues] = useState(initialState);
    const onChange = event=>{
        setValues({...values,[event.target.name] : event.target.value});
    }
    const onSubmit = event =>{
        event.preventDefault();
        callback();
    }
    return {
        onChange,
        onSubmit,
        values
    }
}
