import React,{useEffect} from 'react';
import {Link } from "react-router-dom";
import gql from 'graphql-tag';
import {useQuery,useMutation,useLazyQuery} from "@apollo/react-hooks";

import Switch from "../../components/Switch"
import {useForm} from "../../hooks"
import {useInput,useSwitch} from "../../hooks"
import Input from "../../components/Input.js"
import LoadingIcon from "../../components/LoadingIcon"
import {MUTATION_REGISTER_UTILISATEUR,MUTATION_REGISTER_ENTREPRISE} from "../../graphql";

const RegisterForm = (props) => {
    const {step} = props;
    //les donnees pour s'inscrire pour les deux type d'utilisateur
    const Type = useSwitch("Utilisateur","Entreprise");
    const Email = useInput("");
    const Sexe = useSwitch("Homme","Femme");    
    const {values,onChange} = useForm(step.next,{
        Nom :"",
        Prenom :"",
        DateNaissance :"",
        Denomination :"",
        StatueJuridique  :"",
        DateCreation :"",
        Username : "",
        Password : "",
        Password2 : ""
    });
    const registrationData = {
        Type,
        Email,
        Sexe,
        ...values,
    }
    
    let STP;
    if(step.value===0){
        
        STP = <Step0 registrationData={registrationData} step={step}/>;
        
    }else if(step.value===1) {
        
        if(Type.value==="Utilisateur"){
        
            STP = <Step1Utilisateur registrationData={registrationData} onChange={onChange} step={step}/>;
        
        }else {
        
            STP = <Step1Entreprise registrationData={registrationData} onChange={onChange} step={step} />;
        
        }
    }else if(step.value===2) {
        let MUTATION;
        if(Type.value==="Utilisateur"){
            MUTATION = MUTATION_REGISTER_UTILISATEUR;
            STP = <Step2 registrationData={registrationData} onChange={onChange} step={step} MUTATION={MUTATION}/>;
        }else {
            MUTATION = MUTATION_REGISTER_ENTREPRISE;
            STP = <Step2 registrationData={registrationData} onChange={onChange} step={step} MUTATION={MUTATION}/>;
        }
    }else if(step.value===3) {
        
        STP = <Step3 />
    
    }
    return (
        
        <div className="tabs-content">
            <div className="tab active">
                {STP}
            </div>
        </div>
    )
}
//la saisie de l'email et TypeCompte 
const Step0 = ({registrationData,step})=>{
    const {Email,Type} = registrationData;
    const [emailErr,setEmailErr] = React.useState("");
    
    const [verify, { called, loading}] = useLazyQuery(VERIFY_S0,{
        onError: (err)=>{
            setEmailErr(err.graphQLErrors[0].extensions.errors.Email)
        },
        onCompleted: (data)=>{
            step.next();
        }
    });
    const onSubmit = (ev)=>{
        verify({variables:{Email: Email.value}});
    }
    if(called&&loading){
        return <><div className="tabs-content"><div className="tab active"><LoadingIcon style={{marginLeft:"5rem"}}/></div></div></>;
    }
    return (
        <React.Fragment>
            <Switch onChange={Type.onChange} id="type" value={Type.value} name="type"
                radio1={{value:"Utilisateur",label:"Utilisateur",icon : "icon-material-outline-account-circle"  }}   
                radio2={{value:"Entreprise", label:"Entreprise", icon : "icon-material-outline-business-center" }}
            />
            
            <Input type="text" placeholder="Adress e-mail ..." name="Email" error={emailErr} {...Email} 
                icon="icon-material-baseline-mail-outline"
            />
            
            <button onClick={onSubmit} className="button full-width button-sliding-icon ripple-effect">
                Suivant <i className="icon-material-outline-arrow-right-alt"/>
            </button>
        </React.Fragment>
    )
}
//la verfication du step 0 et la saisie de step 1 

const Step1Utilisateur = ({registrationData,onChange, step})=>{
    const {Nom,Prenom,Sexe,DateNaissance} = registrationData;
    
    const [errors,setErrors] = React.useState({
        Nom :"",
        Prenom :"",
        DateNaissance :"",
    });
    const [verify, { called, loading}] = useLazyQuery(VERIFY_S1_UTILISATEUR,{
        onError: (err)=>{
            setErrors({...err.graphQLErrors[0].extensions.errors})
        },
        onCompleted: (data)=>{
            step.next();
        }
    });
    const onSubmit = (ev)=>{
        verify({variables:{ Nom,Prenom,DateNaissance, Sexe:registrationData.Sexe.value}});
    }
    if(called&&loading){
        return <><div className="tabs-content"><div className="tab active"><LoadingIcon style={{marginLeft:"5rem"}}/></div></div></>;
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6">
                    <Input type="text" icon="icon-material-outline-account-circle" placeholder="Nom .."
                        value={Nom} error={errors.Nom} onChange={onChange} name="Nom"
                    />
                </div>
                <div className="col-md-6">
                    <Input type="text" icon="icon-material-outline-account-circle" placeholder="Prenom .." 
                        value={Prenom} error={errors.Prenom} onChange={onChange} name="Prenom"
                    />
                </div>
            </div>
            <Switch onChange={Sexe.onChange} id="sexe" value={Sexe.value} name="Sexe" size={25}
                radio1={{value:"Homme",label:"Homme",icon : "icon-line-awesome-male" }} 
                radio2={{value:"Femme",label:"Femme",icon : "icon-line-awesome-female" }}
            />
            <Input type="date" icon="icon-material-outline-cake" placeholder="Date de naissance .." 
                value={DateNaissance} onChange={onChange} name="DateNaissance" error={errors.DateNaissance}
            />
            <button onClick={onSubmit} className="button full-width button-sliding-icon ripple-effect" type="submit">
                Suivant <i className="icon-material-outline-arrow-right-alt"/>
            </button>
        </React.Fragment>
    )
}
const Step1Entreprise = ({registrationData,onChange, step})=>{
    const {Denomination ,StatueJuridique ,DateCreation} = registrationData;
    
    const [errors,setErrors] = React.useState({
        Denomination :"",
        StatueJuridique :"",
        DateCreation :"",
    });
    const [verify, { called, loading}] = useLazyQuery(VERIFY_S1_ENTREPRISE,{
        onError: (err)=>{
            setErrors({...err.graphQLErrors[0].extensions.errors})
        },
        onCompleted: (data)=>{
            step.next();
        }
    });
    const onSubmit = (ev)=>{
        verify({variables:{ Denomination ,StatueJuridique ,DateCreation}});
    }
    if(called&&loading){
        return <><div className="tabs-content"><div className="tab active"><LoadingIcon style={{marginLeft:"5rem"}}/></div></div></>;
    }
    return (
        <React.Fragment>
            <Input type="text" icon="icon-material-outline-account-circle" placeholder="denomination .." 
                value={Denomination} error={errors.Denomination} onChange={onChange} name="Denomination"
            />
            <Input type="text" icon="icon-material-outline-gavel" placeholder="Status Juridique .."  
                value={StatueJuridique} error={errors.StatueJuridique} onChange={onChange} name="StatueJuridique"
            />
            <Input type="date" icon="icon-line-awesome-hourglass-start"  placeholder="Date de naissance .."
                value={DateCreation} error={errors.DateCreation} onChange={onChange} name="DateCreation"
            />
            <button onClick={onSubmit} className="button full-width button-sliding-icon ripple-effect">
                Suivant <i className="icon-material-outline-arrow-right-alt"/>
            </button>
        </React.Fragment>
    )
}
///la verification du step 1 et saise de step2(username password) + register
const Step2 = ({registrationData,onChange, step,MUTATION})=>{
    const {Username,Password,Password2} = registrationData;
    const [errors,setErrors] = React.useState({
        Username : "",
        Password : "",
        Password2 : ""
    });
    const [register,{loading: Registering,data:regestedData}] = useMutation(MUTATION);
    
    const [verify, { called, loading}] = useLazyQuery(VERIFY_S2,{
        onError: (err)=>{
            setErrors({...err.graphQLErrors[0].extensions.errors})
        },
        onCompleted: (data)=>{
            if(registrationData.Type.value==="Utilisateur"){
                register({variables:{
                    Email: registrationData.Email.value,
                    Nom: registrationData.Nom,
                    Prenom: registrationData.Prenom,
                    Sexe: registrationData.Sexe.value,
                    DateNaissance: registrationData.DateNaissance,
                    Username: registrationData.Username,
                    Password: registrationData.Password}
                });
            }else {
                register({variables:{
                    Email: registrationData.Email.value,
                    Denomination: registrationData.Denomination,
                    StatueJuridique: registrationData.StatueJuridique,
                    DateCreation: registrationData.DateCreation,
                    Username: registrationData.Username,
                    Password: registrationData.Password}
                });            
            }
        }
    });

    if(regestedData){
        step.next();
    }
    const onSubmit = (ev)=>{
        verify({variables:{ Username, Password, Password2 }});
    }
    if(called&&loading){
        return <><div className="tabs-content"><div className="tab active"><LoadingIcon style={{marginLeft:"5rem"}}/></div></div></>;
    }
    return (
        <React.Fragment>
            <Input type="text" icon="icon-line-awesome-shield" placeholder="Nom d'utilisatteur ..." 
                value={Username} onChange={onChange} name="Username" error={errors.Username}
            />
            <Input type="password" icon="icon-material-outline-lock" placeholder="Mot de passe .." 
                value={Password} title="Should be at least 8 characters long"
                onChange={onChange} name="Password" error={errors.Password}
            />
            <Input type="password" icon="icon-material-outline-lock" placeholder="Repeter le mot de passe .." 
                value={Password2} title="Should be at least 8 characters long"
                onChange={onChange} name="Password2" error={errors.Password2}
            />
            <button onClick={onSubmit} className="button full-width button-sliding-icon ripple-effect">
                Suivant <i className="icon-material-outline-arrow-right-alt"/>
            </button>
        </React.Fragment>
    )
}
const Step3 = ()=>{
    return (
        <React.Fragment>
            <div className="tabs-content">
                <div className="tab active">
                    <div className="welcome-text">
                        <h3>Votre compte a ete créé avec succes </h3>
                        <span> Vous peuvez maintenant l'ouvrir?
                            <Link to="/login">Log In!</Link>
                        </span>
                    </div>
                    <Link to="/login" className="button full-width button-sliding-icon ripple-effect">
                        se connecter à votre compte
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}
        
const VERIFY_S0 = gql`
    query($Email: String!){
        register_step0(Email: $Email)
    }
`;
const VERIFY_S1_UTILISATEUR = gql`
    query($Nom: String! $Prenom: String! $Sexe: String! $DateNaissance: String!){
        register_step1_utilisateur(Nom: $Nom Prenom: $Prenom Sexe: $Sexe DateNaissance: $DateNaissance)
    }
`;
const VERIFY_S1_ENTREPRISE = gql`
    query($Denomination: String! $StatueJuridique: String! $DateCreation: String!){
        register_step1_entreprise(Denomination: $Denomination StatueJuridique: $StatueJuridique DateCreation: $DateCreation)
    }
`;
const VERIFY_S2 = gql`
    query($Username: String! $Password: String! $Password2: String! ){
        register_step2(Username: $Username Password: $Password Password2: $Password2)
    }
`;
export default RegisterForm
