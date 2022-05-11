import React from 'react'
import {useQuery,useMutation} from "@apollo/react-hooks"
import gql from "graphql-tag"

const Notes = ({ModalOn,setModalOn}) => {
    const {loading,data,error,refetch} = useQuery(QUERY_Note);
    if(loading||error)return (<></>);
    if(ModalOn===2){
        setModalOn(1);
        refetch();
    }
    return(
        <>
        <div className="col-xl-6">
            <div className="dashboard-box child-box-in-row"> 
                <div className="headline">
                    <h3><i className="icon-material-outline-note-add" /> Notes</h3>
                </div>	
                <div className="content with-padding">
                    {
                        data.getNotes.map(ele=>(<NoteItem key={ele._id} data={ele} refetch={refetch}/>))
                    }
                </div>
                <div className="add-note-button" onClick={e=>{setModalOn(3)}}>
                    <a href="/" className="popup-with-zoom-anim button full-width button-sliding-icon" onClick={e=>{e.preventDefault()}}>
                        Add Note <i className="icon-material-outline-arrow-right-alt" />
                    </a>
                </div>
            </div>
            {/* Dashboard Box / End */}
        </div>
        </> 
    ) 
} 
export default Notes

const NoteItem = ({data,refetch})=>{
    const [deleteN,{data:dataM,error}] = useMutation(MUTATION);
    const [tmp,setTmp] = React.useState(false);
    const onDelete = (id)=>(e)=>{
        e.preventDefault();
        deleteN({variables:{ID: id}});
        setTmp(true);
    }
    if(tmp&&dataM){
        refetch();
        setTmp(false)
    }
    let classN = (data.Priorete.split(" ")[0]).toLowerCase();
    classN = "note-priority "+classN;
    console.log(classN); 
    return (
        <>
        <div className="dashboard-note">
        <p>{data.Contenu}</p>
        <div className="note-footer">
        <span className={classN}>{data.Priorete}</span>
        <div className="note-buttons">
        <a href="#" title="Edit" data-tippy-placement="top"><i className="icon-feather-edit" /></a>
        <a href="#" title="Remove" data-tippy-placement="top" onClick={onDelete(data._id)}><i className="icon-feather-trash-2"/></a>
        </div>
        </div>
        </div>
        </>
    );
    
    
    return (
        <>
        <div className="dashboard-note">
        <p>Rencontre avec le candidat à 15 h qui a fait une demande de spécialiste en soutien aux événements bilingue</p>
        <div className="note-footer">
        <span className="note-priority high">Haute priorité</span>
        <div className="note-buttons">
        <a href="#" title="Edit" data-tippy-placement="top"><i className="icon-feather-edit" /></a>
        <a href="#" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2"/></a>
        </div>
        </div>
        </div>
        </>
    );
    return (
        <>
            <div className="dashboard-note">
                <p>Send payment to David Peterson</p>
                <div className="note-footer">
                    <span className="note-priority medium">Medium Priority</span>
                    <div className="note-buttons">
                        <a href="#" title="Edit" data-tippy-placement="top"><i className="icon-feather-edit" /></a>
                        <a href="#" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2" /></a>
                    </div>
                </div>
            </div>
        </>
    );
    return (
        <>
            <div className="dashboard-note">
                <p>Extend premium plan for next month</p>
                <div className="note-footer">
                    <span className="note-priority low">Low Priority</span>
                    <div className="note-buttons">
                        <a href="#" title="Edit" data-tippy-placement="top"><i className="icon-feather-edit" /></a>
                        <a href="#" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2" /></a>
                    </div>
                </div>
            </div>
        </>
    );
    
    return (
        <>
            <div className="dashboard-note">
                <p>Meeting with candidate at 3pm who applied for Bilingual Event Support Specialist</p>
                <div className="note-footer">
                    <span className="note-priority high">High Priority</span>
                    <div className="note-buttons">
                        <a href="#" title="Edit" data-tippy-placement="top"><i className="icon-feather-edit" /></a>
                        <a href="#" title="Remove" data-tippy-placement="top"><i className="icon-feather-trash-2"/></a>
                    </div>
                </div>
            </div>
        </>
    );
}

const QUERY_Note = gql`
    query{
        getNotes{
            _id
            Contenu
            Priorete
        }
    }
`;
const MUTATION = gql`
    mutation($ID: ID!){
        deleteNote(ID: $ID)
    }

`;