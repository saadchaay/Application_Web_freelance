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
import Skeleton from 'react-loading-skeleton';


const Part1U = ({Compte}) => { 
    
    const [imageSRC,setImageSRC] = React.useState(Compte.Image || (FRONT_END_URL+"images/user-avatar-placeholder.png"));
    const {loading,data,error} = useQuery(QUERY,{
        variables:{ID: Compte._id}
    });
    const [updateImage,{dataIma}] = useMutation(MUTATION,{onCompleted: (dataI)=>{
        setImageSRC(dataI.updateImage)
    }});
    
    const [updated,setUpdated] = React.useState(false);
    
    const {values,onChange} = useForm(null,{
        Nom :"",Prenom :"",Email:"",DateNaissance :"",Email :Compte.Email
    });
    
    const onChangeImage = ({target: {validity,files: [file],}})=>{
        validity.valid && updateImage({ variables: { file } });
    }
    
    if(loading||error){
        return (
            <>
                <div className="col-xl-12">
                    <div className="dashboard-box margin-top-0">
                        <div className="headline">
                            <h3><i className="icon-material-outline-account-circle" /> Mon Compte</h3>
                        </div>
                        <div className="content with-padding apadding-bottom-0">
                            <Skeleton height={200}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
    if(!updated){
        values.Nom = data.getUtilisateurByCompte.Nom
        values.Prenom = data.getUtilisateurByCompte.Prenom
        values.DateNaissance = data.getUtilisateurByCompte.DateNaissance
        values.Nom = data.getUtilisateurByCompte.Nom
        setUpdated(true);
    }
    
    
    
    return( 
        <>
            <div className="col-xl-12">
                <div className="dashboard-box margin-top-0">
                    <div className="headline">
                        <h3><i className="icon-material-outline-account-circle" /> Mon Compte</h3>
                        <a href="#" className="button ripple-effect" style={{float: "right",marginTop: "-35px"}}>
                        Enregistrer
                        </a>
                    </div>
                    <div className="content with-padding apadding-bottom-0">
                        <div className="row">
                            <div className="col-auto">
                                <div className="avatar-wrapper" data-tippy-placement="bottom" title="Change Avatar">
                                    <img className="profile-pic" src={imageSRC} alt=".." />
                                    <label className="upload-button" htmlFor="upload-button"/>
                                    <input className="file-upload" type="file" id="upload-button" accept="image/*" style={{display: "none"}} onChange={onChangeImage}
                                    />
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
} 
export default Part1U
const QUERY = gql`
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
const MUTATION = gql`
    mutation($file: Upload!){
        updateImage(file: $file)
    }
`;