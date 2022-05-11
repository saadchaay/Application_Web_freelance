import React from 'react'
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar"
import {Link} from "react-router-dom"
import Footer from "../../components//Footer2"
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"
import {useStoreState} from "easy-peasy"
import {useForm} from "../../hooks"

import Skeleton from 'react-loading-skeleton'
 
 
const Part1 = ({Compte}) => {
        
    const [getUtilisateur,{called:calledU,loading:loadingU,data:dataU,error:errorU}] = useLazyQuery(QUERY_UTILISATEUR);
    const [getEntreprise,{called:calledE,loading:loadingE,data:dataE,error:errorE}] = useLazyQuery(QUERY_ENTREPRISE);
    const [updateImage,{dataIma}] = useMutation(UPDATE_IMAGE);
    
    let {values,onChange} = useForm(null,{
        Nom :"",Prenom :"",Email:"",DateNaissance :"",Denomination :"",StatueJuridique  :"",DateCreation :"",
    });
    const onChangeImage = ({target: {validity,files: [file],}})=>{
        validity.valid && updateImage({ variables: { file } });
    }
    
    if(Compte.TypeCompte==="Utilisateur"){
        let src = Compte.Image || (FRONT_END_URL+"images/user-avatar-placeholder.png");
        if(dataIma){
            console.log(dataIma.updateImage);
            src = dataIma.updateImage;
        }
        
        const Avatar = <img className="profile-pic" src={src} alt="" />
        if(!calledU){
            getUtilisateur({variables:{ID: Compte._id}});
        }
        if(dataU){
            values = {Nom: dataU.getUtilisateurByCompte.Nom,Prenom: dataU.getUtilisateurByCompte.Prenom,Email: Compte.Email}
        }
        
        
        return( 
            <>
            <div className="col-xl-12">
                <div className="dashboard-box margin-top-0">
                    <div className="headline">
                        <h3>
                            <i className="icon-material-outline-account-circle" /> Mon Compte
                        </h3>
                    </div>
                    <div className="content with-padding apadding-bottom-0">
                        <div className="row">
                            <div className="col-auto">
                            <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                {Avatar}
                                <label className="upload-button" htmlFor="upload-button"/>
                                <input className="file-upload" type="file" id="upload-button" accept="image/*" style={{display: "none"}} onChange={onChangeImage}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="submit-field">
                                        <h5>Nom</h5>
                                        <input value={values.Nom} onChange={onChange} name="Nom" type="text" className="with-border" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="submit-field">
                                        <h5>Prenom</h5>
                                        <input type="text" value={values.Prenom} onChange={onChange} name="Prenom" className="with-border" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="submit-field">
                                        <h5>Email</h5>
                                        <input type="text" value={values.Email} onChange={onChange} name="Email" className="with-border" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </> 
        )
    }else {
        const Logo = <img className="profile-pic" src={Compte.Image||(FRONT_END_URL+"images/company-logo-placeholder.png")} alt="" />
        if(!calledE){
            getEntreprise({variables:{ID: Compte._id}});
        }
        if(dataE){
            values = {Denomination: dataE.getEntrepriseByCompte.Denomination,StatueJuridique: dataE.getEntrepriseByCompte.StatueJuridique,Email: Compte.Email}
        }
        return( 
            <>
            <div className="col-xl-12">
                <div className="dashboard-box margin-top-0">
                    <div className="headline">
                        <h3>
                            <i className="icon-material-outline-account-circle" /> Mon Compte
                        </h3>
                    </div>
                    <div className="content with-padding apadding-bottom-0">
                        <div className="row">
                            <div className="col-auto">
                            <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                            {Logo}
                            <label className="upload-button" htmlFor="upload-button"/>
                            <input className="file-upload" type="file" id="upload-button" accept="image/*" style={{display: "none"}} onChange={onChangeImage}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="submit-field">
                                        <h5>Denomination</h5>
                                        <input value={values.Denomination} onChange={onChange} name="Denomination" type="text" className="with-border" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="submit-field">
                                        <h5>Statue Juridique</h5>
                                        <input type="text" value={values.StatueJuridique} onChange={onChange} name="StatueJuridique" className="with-border" />
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="submit-field">
                                        <h5>Email</h5>
                                        <input type="text" value={values.Email} onChange={onChange} name="Email" className="with-border" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </> 
        )
    }    
}    
     
            
export default Part1

const QUERY_UTILISATEUR = gql`
    query($ID:ID!){
        getUtilisateurByCompte(ID: $ID){
            _id
            Nom
            Prenom
            Adresse
            Description
            Nationalite
        }
    }
`;
const QUERY_ENTREPRISE = gql`
    query($ID:ID!){
        getEntrepriseByCompte(ID: $ID){
            _id
            Denomination
            DateCreation
            ChiffreAffaire
            Slogan
            EmailContact
            Adresse
            Nationalite
            Description
            StatueJuridique
            Tele
        }
    }
`;
const UPDATE_IMAGE = gql`
    mutation($file: Upload!){
        updateImage(file: $file)
    }
`