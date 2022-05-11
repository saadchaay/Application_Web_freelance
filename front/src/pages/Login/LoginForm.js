import React,{useState} from 'react'
import {Link} from "react-router-dom"
import {useForm} from "../../hooks"
import Input from "../../components/Input.js"
import { useStoreActions } from "easy-peasy"
import { useHistory } from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import {MUTATION_LOGIN} from "../../graphql";
import LoadingIcon from "../../components/LoadingIcon"


const LoginForm = (props) => {
    const history = useHistory();
    const STORE_LOGIN = useStoreActions(actions=>actions.compte.login);
    
    const [errors,setErrors] = useState({Username:"",Password:""});
    
    const {onChange,onSubmit,values} = useForm(Login_compte,{
        username : "",
        password : ""
    });
    
    const [login,{loading}] = useMutation(MUTATION_LOGIN,{
        update(root,result){
            const res = result.data.login;
            STORE_LOGIN({ID: res._id, Username: res.Username, Email: res.Email,Token:res.Token,TypeCompte:res.TypeCompte})
            if(res.TypeCompte==="Utilisateur"){
                window.location.pathname = "/dashboard"
                // history.push("/dashboard");
            }
        },
        onError(err){
            if(Object.keys(err.graphQLErrors).length){
                setErrors(err.graphQLErrors[0].extensions.errors)
            }else {
                // alert("you're offline");
            }
        },
        variables : {
            Username: values.username,
            Password: values.password
        }
    });
    
    function Login_compte() {
        login();
    }
    
    if(loading){
        return <form><LoadingIcon style={{marginLeft:"5rem"}}/></form>;
    }else {
        return(
            <>
                <form noValidate onSubmit={onSubmit}>
                    <Input type="text" placeholder="Nom d'utilisateur ..." name="username"
                        icon="icon-material-baseline-mail-outline" error={errors.Username} value={values.username} onChange={onChange}
                    />
                    <Input  type="password" placeholder="Mot de passe ..." name="password" icon="icon-material-outline-lock"             
                        value={values.password} onChange={onChange} error={errors.Password}
                    />
                    <Link to="/forgetPassword" className="forgot-password">Forgot Password?</Link>
                    <button className="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit">
                        Log In <i className="icon-material-outline-arrow-right-alt" />
                    </button>
                </form>
            </>
        )
    }
}
export default LoginForm
