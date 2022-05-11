import {action, createStore} from "easy-peasy";
import jwtDecode from 'jwt-decode';
//intiatialisation des donnees d'utilisateur
let Data = null;
let Messages = []
// console.log(jwtDecode);
///test si un tokn est deja exists dans localstorage
if (localStorage.getItem('Token')&&(localStorage.getItem('Token')!==undefined)) {//si le cas on decode les donnees enregistrer (Username, ID, Email) apres la validation du token
    //decodage du token
    const decodedToken = jwtDecode(localStorage.getItem('Token'));
    // console.log(decodedToken);
    //la verification de la dase d'experation
    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('Token');
    }else {// s'elle est valide on intialse le userData
        Data = {ID: decodedToken.ID, Username: decodedToken.Username, Email: decodedToken.Email,TypeCompte: decodedToken.TypeCompte};
    }
}
const store = createStore({
    compte: {
        Data,
        Messages,
        login: action((state,payload)=>{    
            state.Data = payload;
            localStorage.setItem('Token', payload.Token);
        }),
        logout: action((state)=>{
            localStorage.removeItem('Token');
            state.Data = null;
        }),
        newMessage: action((state,payload)=>{
            state.Messages.push(payload)
        }),
        intMessages: action((state,payload)=>{
            state.Messages = payload.concat(state.Messages)
        })
        
    }
});
export default store;