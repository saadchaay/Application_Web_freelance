import React from 'react'
import Header from "../../components/Header";
import SideBar from "../../components/Sidebar"
import {Link} from "react-router-dom"
import Footer from "../../components//Footer2"
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"
import {useStoreState} from "easy-peasy"
import {useForm,useInput} from "../../hooks"

import Skeleton from 'react-loading-skeleton'
 
const Part2E = ({Compte}) => {
    const CF = useInput(0);
    
    const {loading,data,error} = useQuery(QUERY_ENTREPRISE,{variables:{ID: Compte._id}});    
    const [updated,setUpdated] = React.useState(false)
    if(loading||error){
        return <></>;
    }
    if(!updated){
        CF.value =  data.getEntrepriseByCompte.ChiffreAffaire
        setUpdated(true);
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
                                                Définissez votre <strong> Chiffre d'Affaire</strong>
                                            </span>
                                            <div className="bidding-value margin-bottom-10">
                                                $<span id="biddingVal" />
                                            </div>
                                            <input className="bidding-slider" type="Number" min={CF.value} step={1} {...CF}/>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <h5> Adresse <i className="help-icon"/></h5>
                                        <input  name="Nom" type="text" className="with-border" />
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <h5> Email de Contact <i className="help-icon"/></h5>
                                        <input  name="Nom" type="text" className="with-border" />
                                    </div>
                                </div>
                                
                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <h5> Statue Juridique <i className="help-icon"/></h5>
                                        <input  name="Nom" type="text" className="with-border" />
                                    </div>
                                </div>
                                
                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <h5> Slogan(tag) <i className="help-icon" data-tippy-placement="right" title="Add up to 10 skills"/></h5>
                                        <input  name="Nom" type="text" className="with-border" />
                                    </div>
                                </div>
                                
                                <div className="col-xl-4">
                                    <div className="submit-field">
                                        <h5>Attachments</h5>
                                        <div className="attachments-container margin-top-0 margin-bottom-0">
                                            <div className="attachment-box ripple-effect">
                                                <span>Cover Letter</span>
                                                <i>PDF</i>
                                                <button className="remove-attachment" data-tippy-placement="top" title="Remove"/>
                                            </div>
                                            <div className="attachment-box ripple-effect">
                                                <span>Contract</span>
                                                <i>DOCX</i>
                                            <button className="remove-attachment"   data-tippy-placement="top"   title="Remove" />
                                        </div>
                                    </div>
                                    <div className="clearfix" />
                                    <div className="uploadButton margin-top-0">
                                        <input className="uploadButton-input" type="file" accept="image/*, application/pdf" id="upload" multiple/>
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
                                    <select value={"ma"} onChange={e=>{}} >
                                        <option value="ar">Argentina</option>
                                        <option value="am">Armenia</option>
                                        <option value="aw">Aruba</option>>
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
                                    </select>
                                </div>
                            </div>
                            <div className="col-xl-12">
                                <div className="submit-field">
                                    <h5>description</h5>
                                    <textarea cols={30} rows={5} className="with-border" defaultValue={"mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description mon description "}/>
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
export default Part2E
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
            Attachements{
                _id
                Lien
                Nom
            }
        }
    }
`;