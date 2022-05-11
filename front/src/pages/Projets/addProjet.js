import React from 'react'
 
import Header from "../../components/Header";
import {Link} from "react-router-dom"
// import Footer from "../components/Footer";
import SideBar from "../../components/Sidebar"
import {useQuery,useMutation} from "@apollo/react-hooks"
import gql from "graphql-tag"
import {useInput,useSwitch } from "../../hooks"
import {FRONT_END_URL} from "../../constants"

const AddProjetPage = (props) => { 
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    const TitreInput            = useInput(""); //#####
    const CategorieInput        = useInput("");
    const AdresseInput          = useInput("");//#####
    const MinBudgetInput        = useInput("");//#####
    const MaxBudgetInput        = useInput("");//#####
    const [CompetecesRequisInput,setCompetecesRequisInput] = React.useState("");
    const TypePaymentInput      = useSwitch("fixe","horaire");
    const DescriptionInput      = useInput("");//#####
    const [AttachementInput,setAttachementInput] = React.useState(null);
    // const AttachementInput      = useInput("");
    
    const DateExperationInput   = useInput("");
    const {loading: loadingCat,data: dataCat, error: errorCat} = useQuery(QUERY_CATEGORIES);
    const [addProjet,{loading,data}] = useMutation(MUTATION,{
        onError(err){
            console.log(err);
            if(Object.keys(err.graphQLErrors).length){
            }else {
                alert("check your connection");
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
        let CompetecesRequis = CompetecesRequisInput.split(";");
        addProjet({variables:{
            DATA: {
                Titre: TitreInput.value,
                Categorie: CategorieInput.value,
                Adresse: AdresseInput.value,
                MinBudget: parseInt(MinBudgetInput.value),
                MaxBudget: parseInt(MaxBudgetInput.value),
                CompetecesRequis: CompetecesRequis||[],
                TypePayment: TypePaymentInput.value,
                Description: DescriptionInput.value||"",
                Attachements: AttachementInput||[],
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
                                            <h3>
                                                <i className="icon-feather-folder-plus" /> Poster  un project
                                            </h3>
                                        </div>
                                            <div className="content with-padding padding-bottom-10">
                                            <div className="row">
                                            <div className="col-xl-" style={{margin: "auto"}}>
                                            <div className="welcome-text">
                                            <h3>votre projet a été publié avec succès</h3>
                                            <span>vous pouvez maintenant le voir ?
                                            <Link className="button full-width button-sliding-icon ripple-effect" to={"/projet/"+data.addProjet._id}>cliquez ici</Link>
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
                </>
        )
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
                                        <h3>
                                            <i className="icon-feather-folder-plus" /> Poster  un project
                                        </h3>
                                    </div>
                                    <div className="content with-padding padding-bottom-10">
                                        <div className="row">
                                            <div className="col-xl-4">
                                                <div className="submit-field">
                                                    <h5>Titre du project</h5>
                                                    <input
                                                        {...TitreInput}
                                                        type="text"
                                                        className="with-border"
                                                        placeholder="ex. construisez-moi un site web"
                                                    />
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
                                                    <h5>
                                                        Adresse{" "}
                                                        <i
                                                            className="help-icon"
                                                            data-tippy-placement="right"
                                                            title="Laisser en blanc si c'est un travail en ligne"
                                                        />
                                                    </h5>
                                                    <div className="input-with-icon">
                                                        <div id="autocomplete-container">
                                                        <input
                                                            {...AdresseInput}
                                                            id="autocomplete-input"
                                                            className="with-border"
                                                            type="text"
                                                            placeholder="en-ligne"
                                                        />
                                                    </div>
                                                    <i className="icon-material-outline-location-on" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>Quel est votre budget estimé?</h5>
                                                <div className="row">
                                                    <div className="col-xl-6">
                                                        <div className="input-with-icon">
                                                            <input
                                                                {...MinBudgetInput}
                                                                className="with-border"
                                                                type="text"
                                                                placeholder="Minimum"
                                                            />
                                                            <i className="currency">USD</i>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6">
                                                        <div className="input-with-icon">
                                                            <input
                                                                {...MaxBudgetInput}
                                                                className="with-border"
                                                                type="text"
                                                                placeholder="Maximum"
                                                            />
                                                            <i className="currency">USD</i>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                <div className="feedback-yes-no margin-top-0">
                                                    <div className="radio">
                                                        <input
                                                            name="radio"
                                                            id="radio-1"
                                                            type="radio"
                                                            checked={TypePaymentInput.value === 'fixe'}
                                                            {...TypePaymentInput}
                                                        />
                                                        <label htmlFor="radio-1">
                                                            <span className="radio-label" /> Projet à prix fixe
                                                        </label>
                                                    </div>
                                                    <div className="radio">
                                                        <input id="radio-2" name="radio" type="radio" 
                                                        checked={TypePaymentInput.value === 'horaire'}
                                                        {...TypePaymentInput}
                                                        />
                                                        <label htmlFor="radio-2">
                                                            <span className="radio-label" /> Projet horaire
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="submit-field">
                                                <h5>
                                                    Quelles compétences sont requises?{" "}
                                                    <i
                                                        className="help-icon"
                                                        data-tippy-placement="right"
                                                        title="Up to 5 skills that best describe your project"
                                                    />
                                                </h5>
                                                <div className="keywords-container">
                                                    <div className="keyword-input-container">
                                                        <input
                                                            type="text"
                                                            className="keyword-input with-border"
                                                            placeholder="Ajouter Competece"
                                                            onKeyDown={e=>{
                                                                if (e.key === 'Enter') {
                                                                    setCompetecesRequisInput(
                                                                        CompetecesRequisInput+";"+e.target.value
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                        <button className="keyword-input-button ripple-effect">
                                                            <i className="icon-material-outline-add" />
                                                        </button>
                                                    </div>
                                                    <div className="keywords-list">
                                                        {/* keywords go here */}
                                                    </div>
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
                                                <h5>Décrivez votre projet</h5>
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
                                                        Images ou documents pouvant être utiles pour décrire votre projet
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
                                <i className="icon-feather-plus" /> Poster le projet
                            </a>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        </>
    ) 
} 
export default AddProjetPage


const QUERY_CATEGORIES = gql`
    query{
        getCategories{
            _id
            Titre
        }
    }
`;
const MUTATION = gql`
mutation($DATA: ProjetInput!) {
  addProjet(
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