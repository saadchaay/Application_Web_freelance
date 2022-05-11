import React from 'react'
import {useInput} from "../../hooks"
import {useMutation} from "@apollo/react-hooks"
import gql from "graphql-tag"
 
const ModalTab = ({setModalOn})=>{
    let height = window.screen.height /2 -20; 
    let scroll = window.scrollY;
    const [addNote,{loading,data,error}] = useMutation(MutaionAdd);
    const ContenuInput = useInput("");
    const PrioriteInput = useInput("Low Priority");
    const onSubmit = (e)=>{
        e.preventDefault();
        if(ContenuInput.value.trim().length&&PrioriteInput.value.trim().length){
            addNote({variables:{Contenu: ContenuInput.value,Priorete: PrioriteInput.value}});
        }else {
            setModalOn(1);
        }
    }
    if(data){
        setModalOn(2);
    }
    return (
        <> 
        <div className="mfp-bg my-mfp-zoom-in mfp-ready"></div><div className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-zoom-in mfp-ready" tabindex="-1" style={{top: scroll+"px", position: "absolute",height: height+"px"}}><div className="mfp-container mfp-inline-holder"><div className="mfp-content"><div id="small-dialog" className="zoom-anim-dialog dialog-with-tabs">

	
	<div className="sign-in-form">

		<ul className="popup-tabs-nav" style={{pointerEvents: "none"}}>
			<li className="active"><a href="#tab">Ajouter Note</a></li>
		</ul>

		<div className="popup-tabs-container">

			
			<div className="popup-tab-content" id="tab">
				
				
				<div className="welcome-text">
					<h3>Ne pas oublier 😎</h3>
				</div>
                    <select aclassName="selectpicker with-border default margin-bottom-20" adata-size="7" atitle="Priority" atabindex="-98" {...PrioriteInput}>
						<option value="Low Priority">Low Priority</option>
						<option value="Medium Priority">Medium Priority</option>
						<option value="High Priority">High Priority</option>
					</select>

					<textarea name="textarea" cols="10" placeholder="Note" className="with-border" {...ContenuInput}/>
				
				<button className="button full-width button-sliding-icon ripple-effect" atype="submit" aform="add-note" onClick={onSubmit}>Ajouter <i className="icon-material-outline-arrow-right-alt"></i></button>
			</div>
		</div>
	</div>
<button title="Close (Esc)" type="button" className="mfp-close" onClick={e=>{setModalOn(false)}}></button></div></div></div></div>
</>
        )
    }
export default ModalTab

const MutaionAdd = gql`
    mutation($Contenu: String! $Priorete:String!){
        addNote(Contenu:$Contenu Priorete:$Priorete){
            _id
            Contenu
            Priorete
        }
    }
`;