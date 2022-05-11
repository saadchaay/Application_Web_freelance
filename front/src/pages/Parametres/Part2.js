
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
 
 
const Part2 = ({Compte}) => {
        
    const [getUtilisateur,{called:calledU,loading:loadingU,data:dataU,error:errorU}] = useLazyQuery(QUERY_UTILISATEUR);
    const [addAttachement,{data: dataADD}] = useMutation()
    let {values,onChange} = useForm(null,{
        Nom :"",
        Prenom :"",
        Email:"",
        DateNaissance :"",
    });
    // onAddAttach
    
    if(Compte.TypeCompte==="Utilisateur"){
        const Avatar = <img className="profile-pic" src={Compte.Image||(FRONT_END_URL+"images/user-avatar-placeholder.png")} alt="" />
        if(!calledU){
            getUtilisateur({variables:{ID: Compte._id}});
        }
        if(dataU){
            values = {Nom: dataU.getUtilisateurByCompte.Nom,Prenom: dataU.getUtilisateurByCompte.Prenom,Email: Compte.Email}
        }
        return( 
            <>
                <div className="col-xl-12">
                    <div className="dashboard-box">
                        <div className="headline">
                            <h3>
                                <i className="icon-material-outline-face" /> Mon Profile
                            </h3>
                        </div>
                        
                        <div className="content">
                            <ul className="fields-ul">
                                <li>
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <div className="submit-field">
                                                <div className="bidding-widget">
                                                    <span className="bidding-detail">
                                                        Définissez votre <strong> tarif horaire minimum</strong>
                                                    </span>
                                                    <div className="bidding-value margin-bottom-10">
                                                        $<span id="biddingVal" />
                                                    </div>
                                                    <input className="bidding-slider" type="text" defaultValue data-slider-handle="custom" data-slider-currency="$" data-slider-min={5} data-slider-max={150} data-slider-value={35} data-slider-step={1} data-slider-tooltip="hide"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="submit-field">
                                                <h5>
                                                    Competences{" "}
                                                    <i className="help-icon" data-tippy-placement="right" title="Add up to 10 skills"/>
                                                </h5>
                                                <div className="keywords-container">
                                                    <div className="keyword-input-container">
                                                        <input type="text" className="keyword-input with-border" placeholder="e.i Angular, Laravel" />
                                                        <button className="keyword-input-button ripple-effect">
                                                            <i className="icon-material-outline-add" />
                                                        </button>
                                                    </div>
                                                    <div className="keywords-list">
                                                        <span className="keyword">
                                                            <span className="keyword-remove" />
                                                            <span className="keyword-text">Reactjs</span>
                                                        </span>
                                                        <span className="keyword">
                                                            <span className="keyword-remove" />
                                                            <span className="keyword-text">Graphql</span>
                                                        </span>
                                                        <span className="keyword">
                                                            <span className="keyword-remove" />
                                                            <span className="keyword-text">Mongodb</span>
                                                        </span>
                                                        <span className="keyword">
                                                            <span className="keyword-remove" />
                                                            <span className="keyword-text">javascript</span>
                                                        </span>
                                                        <span className="keyword">
                                                            <span className="keyword-remove" />
                                                            <span className="keyword-text">php</span>
                                                        </span>
                                                    </div>
                                                    <div className="clearfix" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="submit-field">
                                                <h5>Attachments</h5>
                                                <div className="attachments-container margin-top-0 margin-bottom-0">
                                                    
                                                    <div className="attachment-box ripple-effect">
                                                        <span>Cover Letter</span>
                                                        <i>PDF</i>
                                                        <button className="remove-attachment" data-tippy-placement="top" title="Remove" />
                                                    </div>
                                                    <div className="attachment-box ripple-effect">
                                                        <span>Contract</span>
                                                        <i>DOCX</i>
                                                    <button className="remove-attachment" data-tippy-placement="top" title="Remove" />
                                                </div>            
                                            </div>
                                            <div className="clearfix" />
                                            <div className="uploadButton margin-top-0">
                                                <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple />
                                                <label className="uploadButton-button ripple-effect" htmlFor="upload" >
                                                    Upload Files
                                                </label>
                                                <span className="uploadButton-file-name">
                                                    Maximum file size: 10 MB
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="submit-field">
                                            <h5>Slogan</h5>
                                            <input type="text" className="with-border" defaultValue="Web developper" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="submit-field">
                                            <h5>Nationalite</h5>
                                            <select className="selectpicker with-border" data-size={7} value={"MA"} onChange={e=>{}} title="Select Job Type" data-live-search="true" >
            
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="submit-field">
                                            <h5>description</h5>
                                            <textarea cols={30} rows={5} className="with-border" defaultValue={"mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
    
        
        
        }    
}    
     
            
export default Part2

const QUERY_UTILISATEUR = gql`
    query($ID:ID!){
        getUtilisateurByCompte(ID: $ID){
            _id
            Nom
            Prenom
            Adresse
            Description
            Nationalite
            Attachements{
                _id
                Nom
                Type
                Lien
            }
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
const MUTATION_ADD  = gql`
    mutation($file: Upload!){
        addAttachement(file: $file){
            _id
            Nom
            Type
            Lien
        }
    }
`;




const Langs = ()=>{
    return <><option value="ar">Argentina</option>
    <option value="am">Armenia</option>
    <option value="aw">Aruba</option>
    <option value="au">Australia</option>
    <option value="at">Austria</option>
    <option value="az">Azerbaijan</option>
    <option value="bs">Bahamas</option>
    <option value="bh">Bahrain</option>
    <option value="bd">Bangladesh</option>
    <option value="bb">Barbados</option>
    <option value="by">Belarus</option>
    <option value="be">Belgium</option>
    <option value="bz">Belize</option>
    <option value="bj">Benin</option>
    <option value="bm">Bermuda</option>
    <option value="bt">Bhutan</option>
    <option value="bg">Bulgaria</option>
    <option value="bf">Burkina Faso</option>
    <option value="bi">Burundi</option>
    <option value="kh">Cambodia</option>
    <option value="cm">Cameroon</option>
    <option value="ca">Canada</option>
    <option value="cv">Cape Verde</option>
    <option value="ky">Cayman Islands</option>
    <option value="co">Colombia</option>
    <option value="km">Comoros</option>
    <option value="cg">Congo</option>
    <option value="ck">Cook Islands</option>
    <option value="cr">Costa Rica</option>
    <option value="ci">Côte d'Ivoire</option>
    <option value="hr">Croatia</option>
    <option value="cu">Cuba</option>
    <option value="cw">Curaçao</option>
    <option value="cy">Cyprus</option>
    <option value="cz">Czech Republic</option>
    <option value="dk">Denmark</option>
    <option value="dj">Djibouti</option>
    <option value="dm">Dominica</option>
    <option value="do">Dominican Republic</option>
    <option value="ec">Ecuador</option>
    <option value="eg">Egypt</option>
    <option value="gp">Guadeloupe</option>
    <option value="gu">Guam</option>
    <option value="gt">Guatemala</option>
    <option value="gg">Guernsey</option>
    <option value="gn">Guinea</option>
    <option value="gw">Guinea-Bissau</option>
    <option value="gy">Guyana</option>
    <option value="ht">Haiti</option>
    <option value="hn">Honduras</option>
    <option value="hk">Hong Kong</option>
    <option value="hu">Hungary</option>
    <option value="is">Iceland</option>
    <option value="in">India</option>
    <option value="id">Indonesia</option>
    <option value="ma">MOROCCO</option>
    <option value="no">Norway</option>
    <option value="om">Oman</option>
    <option value="pk">Pakistan</option>
    <option value="pw">Palau</option>
    <option value="pa">Panama</option>
    <option value="pg">Papua New Guinea</option>
    <option value="py">Paraguay</option>
    <option value="pe">Peru</option>
    <option value="ph">Philippines</option>
    <option value="pn">Pitcairn</option>
    <option value="pl">Poland</option>
    <option value="pt">Portugal</option>
    <option value="pr">Puerto Rico</option>
    <option value="qa">Qatar</option>
    <option value="re">Réunion</option>
    <option value="ro">Romania</option>
    <option value="ru">Russian Federation</option>
    <option value="rw">Rwanda</option>
    <option value="sz">Swaziland</option>
    <option value="se">Sweden</option>
    <option value="ch">Switzerland</option>
    <option value="tr">Turkey</option>
    <option value="tm">Turkmenistan</option>
    <option value="tv">Tuvalu</option>
    <option value="ug">Uganda</option>
    <option value="ua">Ukraine</option>
    <option value="gb">United Kingdom</option>
    <option value="us">United States</option>
    <option value="uy">Uruguay</option>
    <option value="uz">Uzbekistan</option>
    <option value="ye">Yemen</option>
    <option value="zm">Zambia</option>
    <option value="zw">Zimbabwe</option></>;
}