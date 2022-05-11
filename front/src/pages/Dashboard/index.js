import React from 'react'
import Header from "../../components/Header";
// import {Link} from "react-router-dom"
// import Footer from "../components/Footer";
import SideBar from "../../components/Sidebar"
// import {useQuery} from "@apollo/react-hooks"
// import gql from "graphql-tag"
import {FRONT_END_URL} from "../../constants"
import Notes from "./Notes"
import Notifications from "./Notifications"
import Views from "./Views"
import Counters from "./Counters"
import ModalTab from "./ModalTab"
import gql from "graphql-tag"
import {useQuery} from "@apollo/react-hooks"
import {useStoreState} from "easy-peasy"


const DashboardPage = (props) => { 
    React.useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    //1==>off & dont update
    //2==>off & update
    //3==>on
    const [ModalOn,setModalOn] = React.useState(1);
    // const {data: dataC1} = useQuery();
    const userData = useStoreState(state=>state.compte.Data);
    
    
    
    return( 
        <>
        {(ModalOn===3)&&<ModalTab setModalOn={setModalOn}/>}
        
        <Header transparent={false} path="dashboard"/>
        <div className="dashboard-container">
            <SideBar page="dashboard"/>
            <div className="dashboard-content-container" data-simplebar>
                <div className="dashboard-content-inner" astyle={{padding:"10px 10px 0px 10px"}}>
                    
                    <div className="fun-facts-container">
                        <Counters Compte={userData}/>
                        {/*************************************************/}
                        <div className="fun-fact" data-fun-fact-color="#2a41e6">
                            <div className="fun-fact-text">
                                <span>This Month Views</span>
                                <h4>3</h4>
                            </div>
                            <div className="fun-fact-icon"><i className="icon-feather-trending-up"/></div>
                        </div>
                    </div>
                    
                    {/*<Views/>*/}
                    <div className="row">
                        <Notifications/>
                        <Notes ModalOn={ModalOn} setModalOn={setModalOn} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default DashboardPage


// const QR = gql`
// query{
// getUtilisateur{
// ID  
// Nom
// Prenom
// Compte{
//   ID
//   Username
// }
// }
// }
// `;
