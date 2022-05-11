import React from 'react'
import gql from "graphql-tag"
import {useQuery,useLazyQuery,useMutation} from "@apollo/react-hooks"
import {FRONT_END_URL} from "../../constants"
import {useStoreState} from "easy-peasy"


const EncheresForm = ({idProjet,CanEnchere,setCanEnchere,setDoRefetch,min,max,compteProjet}) => { 
    
    // const {laoding: loadingEnche, data: dataEnche, error: errorEnche} = useQuery(QUERY_ENCHE,{variables: {ID: idProjet}});
    // const [getMyENCH,{called,laoding: loadingMyEnche, data: dataMyEnche}] = useLazyQuery(QUERT_MY_ENCHERS);
    const [addEnchere,{loading: loadingMut,data: dataMut}] = useMutation(MUTATION_add_ENCH);
    
    const [TarifMin,setTarifMin] = React.useState(min)
    const [DelaiLNumber,setDelaiLNumber]  = React.useState(1);
    const [DelaiLType,setDelaiLType]     = React.useState("Jours");
    const userData = useStoreState(state=>state.compte.Data);
    
    
    const onSubmit = (e)=>{
        let ID = idProjet;
        let PrixMin = Math.min(max,parseInt(TarifMin));
        let LivraisonDans = parseInt(DelaiLNumber)+" "+DelaiLType;
        addEnchere({variables:{ID, PrixMin,LivraisonDans}});
        setCanEnchere(false);
        setDoRefetch(1);
    }
        if(CanEnchere&&(userData.TypeCompte==="Utilisateur")&&(compteProjet._id!==userData.ID)){
            return (
                <>
                <div className="sidebar-widget">
                    <div className="bidding-widget">
                        <div className="bidding-headline">
                            <h3>Enchérissez sur ce projet</h3>
                        </div>
                        <div className="bidding-inner">
                            <span className="bidding-detail">
                                Définissez votre <strong> tarif minimal</strong>
                            </span>
                            <div className="bidding-value">
                                $<span>{TarifMin}</span>
                            </div>
                            <input className="bidding-slider" type="Number" adata-slider-handle="custom" adata-slider-currency="$" 
                                min={min} max={max} adata-slider-value="auto" adata-slider-step={1} 
                                value={TarifMin} data-slider-tooltip="hide" onChange={e=>{ setTarifMin(e.target.value)}}
                            />
                            <span className="bidding-detail margin-top-30">
                                Définissez votre <strong> délai de livraison</strong>
                            </span>
                            <div className="bidding-fields">
                                <div className="bidding-field">
                                    <div className="qtyButtons">
                                        <div className="qtyDec" onClick={e=>{setDelaiLNumber(1 - parseInt(DelaiLNumber))}} />
                                        <input type="text" name="qtyInput" value={DelaiLNumber} onChange={e=>{setDelaiLNumber(e.target.value)}} />
                                        <div className="qtyInc" onClick={e=>{setDelaiLNumber(1 + parseInt(DelaiLNumber))}}/>
                                    </div>
                                </div>
                                <div className="bidding-field ">
                                    <select value={DelaiLType} onChange={e=>{setDelaiLType(e.target.value)}} className="aselectpicker adefault">
                                        <option value="Jours">Jours</option>
                                        <option value="Heures">Heures</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={onSubmit} id="snackbar-place-bid" className="button ripple-effect move-on-hover full-width margin-top-30">
                                <span>Place une offre</span>
                            </button>
                        </div>
                    </div>
                </div>    
                </>
            );
        }else {
            return( 
                <>
                
                </> 
            )
        }
    return <></>;
}    
export default EncheresForm

const MUTATION_add_ENCH = gql`
    mutation($ID: ID! $PrixMin: Int! $LivraisonDans: String!){
        addEnchereProjet(ID: $ID PrixMin: $PrixMin LivraisonDans: $LivraisonDans){
        _id
        Projet{
            _id
        }
        Compte{
            _id
        }
    }
}
`;
const QUERT_MY_ENCHERS = gql`
    query{
        getmyEncheres{
            _id
            Projet{
                _id
            }
            Compte{
                _id
            }
        }
    }


`
