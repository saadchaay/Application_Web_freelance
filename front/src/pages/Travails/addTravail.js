import React from 'react'
 
import Header from "../../components/Header";
import {Link} from "react-router-dom"
// import Footer from "../components/Footer";
import SideBar from "../../components/Sidebar"
import {useQuery,useMutation} from "@apollo/react-hooks"
import gql from "graphql-tag"
import {useInput,useSwitch } from "../../hooks"
import {FRONT_END_URL} from "../../constants"

const AddTravailPage = (props) => { 
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    
    const TitreInput            = useInput("");
    const TypeInput             = useInput("");
    const CategorieInput        = useInput("");
    const AdresseInput          = useInput("");
    const DescriptionInput      = useInput("");
    // const AttachementInput      = useInput("");
    const [AttachementInput,setAttachementInput] = React.useState(null);
    const [EtiquesttesInput,setEtiquesttesInput] = React.useState("");
    const MinSalaireInput       = useInput("");
    const MaxSalaireInput       = useInput("");
    const CreatedAtInput        = useInput("");
    const CompteInput           = useInput("");
    const DateExperationInput   = useInput("");
    
    
    const {loading: loadingCat,data: dataCat, error: errorCat} = useQuery(QUERY_CATEGORIES);
    const [addTravail,{loading,data}] = useMutation(MUTATION,{
        onError(err){
            console.log(err);
            if(Object.keys(err.graphQLErrors).length){
            }else {
                // alert("che      ck your connection");
            }                   
        }       
    });
    const AttachementHandeler = (e)=>{
        // console.log(e.target.files.FileList);
        setAttachementInput(e.target.files)
    }
    
    
    
    const onSubmit = (e)=>{
        e.preventDefault();
        //sending the images
        let Etiquesttes = EtiquesttesInput.split(";");
        addTravail({variables:{
            DATA: {
                Titre: TitreInput.value,
                Type: TypeInput.value,
                Categorie: CategorieInput.value,
                Adresse: AdresseInput.value,
                Description: DescriptionInput.value,
                Attachements: AttachementInput,
                Etiquesttes: Etiquesttes,
                MinSalaire: parseInt(MinSalaireInput.value),
                MaxSalaire: parseInt(MaxSalaireInput.value),
                DateExperation: DateExperationInput.value,
            }
        }})
    }
    if(data){
        return( 
            <>
                <Header transparent={false} path="dashboard"/>
                <div className="dashboard-container">
                    <SideBar page="dashboard"/>
                    <div className="dashboard-content-container" data-simplebar>
                        <div className="dashboard-content-inner">
                            <div className="row">
                                {/* Dashboard Box */}
                                <div className="col-xl-12">
                                    <div className="dashboard-box margin-top-0">
                                        {/* Headline */}
                                        <div className="headline">
                                            <h3><i className="icon-feather-folder-plus" /> Poster  un travail</h3>
                                        </div>
                                        <div className="content with-padding padding-bottom-10">
                                            <div className="row">
                                                <div className="col-xl-" style={{margin: "auto"}}>
                                                    <div className="welcome-text">
                                                    <h3>votre offre de travail a été publié avec succès</h3>
                                                    <span>vous pouvez maintenant le voir ?
                                                        <Link className="button full-width button-sliding-icon ripple-effect" to={"/travail/"+data.addTravail._id}>cliquez ici</Link>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </>)
    }
    
    

    return( 
        <>
        <Header transparent={false} path="dashboard"/>
        <div className="dashboard-container">
            <SideBar page="dashboard"/>
        
            <div className="dashboard-content-container" data-simplebar>
                <div className="dashboard-content-inner">
                    <div className="row">
                    {/* Dashboard Box */}
                        <div className="col-xl-12">
                            <div className="dashboard-box margin-top-0">
                            {/* Headline */}
                                <div className="headline">
                                    <h3><i className="icon-feather-folder-plus" />Poster  un travail</h3>
                                    </div>
                                <div className="content with-padding padding-bottom-10">
                                    <div className="row">
                                        <div className="col-xl-4">
                                            <div className="submit-field">
                                                <h5>Title du travail</h5>
                                                <input type="text" className="with-border" {...TitreInput}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="submit-field">
                                                <h5>Type de travail</h5>
                                                <select
                                                    {...TypeInput}
                                                >
                                                    <option value="À plein temps">À plein temps</option>
                                                    <option value="Free-lance">Free-lance</option>
                                                    <option value="À temps partiel">À temps partiel</option>
                                                    <option value="Stage">Stage</option>
                                                    <option value="Temporaire">Temporaire</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-xl-4">
                                            <div className="submit-field">
                                                <h5>Categorie</h5>
                                                <select style={{margin:0}} {...CategorieInput}> 
                                                    <option>Tout les categories</option>
                                                    {
                                                        (loadingCat||errorCat)?<option>Loading ...</option>: 
                                                        (dataCat.getCategories.map(ele=>(<option key={ele._id} value={ele._id}>{ele.Titre}</option>)))
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-xl-4">
                                                <div className="submit-field">
                                                    <h5>Adresse</h5>
                                                        <div className="input-with-icon">
                                                            <div id="autocomplete-container">
                                                                <input
                                                                    id="autocomplete-input"
                                                                    className="with-border"
                                                                    type="text"
                                                                    placeholder="Adresse"
                                                                    {...AdresseInput}
                                                                />
                                                            </div>
                                                            <i className="icon-material-outline-location-on" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>Salaire</h5>
                                                        <div className="row">
                                                            <div className="col-xl-6">
                                                                <div className="input-with-icon">
                                                                    <input
                                                                        className="with-border"
                                                                        type="text"
                                                                        placeholder="Min"
                                                                        {...MinSalaireInput}
                                                                    />
                                                                    <i className="currency">USD</i>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6">
                                                                <div className="input-with-icon">
                                                                    <input
                                                                        className="with-border"
                                                                        type="text"
                                                                        placeholder="Max"
                                                                        {...MaxSalaireInput}
                                                                    />
                                                                    <i className="currency">USD</i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-xl-4">
                                                    <div className="submit-field">
                                                        <h5>
                                                            Etiquesttes <span>(optional)</span>{" "}
                                                            <i
                                                                className="help-icon"
                                                                data-tippy-placement="right"
                                                                title="Maximum of 10 Etiquesttes"
                                                            />
                                                        </h5>
                                                        <div className="keywords-container">
                                                            <div className="keyword-input-container">
                                                                <input
                                                                    type="text"
                                                                    className="keyword-input with-border"
                                                                    placeholder="e.g. job title, responsibilites"
                                                                    onKeyDown={e=>{
                                                                        if (e.key === 'Enter') {
                                                                            setEtiquesttesInput(
                                                                                EtiquesttesInput+";"+e.target.value
                                                                            )
                                                                        }
                                                                    }}
                                                                />
                                                                <button className="keyword-input-button ripple-effect">
                                                                    <i className="icon-material-outline-add" />
                                                                </button>
                                                            </div>
                                                            <div className="keywords-list">{/* keywords go here */}</div>
                                                                <div className="clearfix" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <div className="submit-field">
                                                            <h5>Date d'Experation</h5>
                                                            <input
                                                                {...DateExperationInput}
                                                                type="date"
                                                                className="with-border"            
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12">
                                                        <div className="submit-field">
                                                            <h5>Décrivez votre travail</h5>
                                                            <textarea
                                                                cols={30}
                                                                rows={5}
                                                                className="with-border"
                                                                {...DescriptionInput}
                                                            />
                                                            <div className="uploadButton margin-top-30">
                                                                <input
                                                                    className="uploadButton-input"
                                                                    type="file"
                                                                    accept="image/*, application/pdf"
                                                                    id="upload"
                                                                    multiple
                                                                    onChange= {AttachementHandeler}
                                                                />
                                                                <label
                                                                    className="uploadButton-button ripple-effect"
                                                                    htmlFor="upload"
                                                                >
                                                                    Télécharger des fichiers
                                                                </label>
                                                                <span className="uploadButton-file-name">
                                                                    Images ou documents pouvant être utiles pour décrire votre travail
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <a href="#" className="button ripple-effect big margin-top-30" onClick={onSubmit}>
                                            <i className="icon-feather-plus" /> Poster le travail
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </>
            ) 
        } 
    
    
    
    
    
            
export default AddTravailPage


const QUERY_CATEGORIES = gql`
    query{
        getCategories{
            _id
            Titre
        }
    }
`;
const MUTATION = gql`
mutation($DATA: TravailInput!) {
  addTravail(
    Data: $DATA
  ) {
    _id
    Titre
    Compte{
        Username
        Email
    }
    Attachements{
        Lien
    }
  }
}

`;
// {
  
// }