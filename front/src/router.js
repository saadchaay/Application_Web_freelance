import React from 'react';
import {BrowserRouter,Switch,Redirect,Route,IndexRoute } from 'react-router-dom';
import {useStoreState} from "easy-peasy";
import {
    DashboardPage,
    EntreprisesPage,
    LoginPage,
    MessagesPage,
    ProjetsPage,
    RegisterPage,
    TravailsPage,
    UtilisateursPage,
    WelcomePage,
    SingleEntreprisePage,
    SingleProjetPage,
    AddProjetPage,
    SingleTravailPage,
    AddTravailPage,
    SingleUtilisateurPage
} from "./pages"

import Manage from "./pages/manage.js"
import Manage2 from "./pages/manage2.js"
import Manage3 from "./pages/manage3.js"
import Manage4 from "./pages/manage4.js"
import Manage5 from "./pages/manage5.js"
import Upload from "./pages/upload.js"
import Parametres from "./pages/Parametres"
// import {WelcomePage, LoginPage, RegisterPage, MessagesPage, DashboardPage, TravailsPage, ProjetsPage,EntreprisesPage}


// import Entreprise from "./pages/Entreprise"
// import Utilisateur from "./pages/Utilisateur"

const  Router = (props)=>{
    const userData = useStoreState(state=>state.compte.Data);
    return( 
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={WelcomePage} />
                    
                    <Route 
                        path="/login" exact 
                        render={(renderProps)=>(
                            userData?(<Redirect to="/"/>):(<LoginPage/>)
                        )}
                    />
                    <Route 
                        path="/register" exact 
                        render={(renderProps)=>(
                            userData?(<Redirect to="/"/>):(<RegisterPage/>)
                        )}
                    />
                    <Route 
                        path="/dashboard" exact 
                        render={(renderProps)=>(
                            userData?(<DashboardPage/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/entreprises" exact 
                        render={(renderProps)=>(
                            userData?(<EntreprisesPage/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/utilisateurs" exact 
                        render={(renderProps)=>(
                            userData?(<UtilisateursPage/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/travails" exact 
                        render={(renderProps)=>(
                            userData?(<TravailsPage/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/projets" exact 
                        render={(renderProps)=>(
                            userData?(<ProjetsPage/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                    path="/messages" exact 
                    render={(renderProps)=>(
                        userData?(<MessagesPage/>):(<Redirect to="/login"/>)
                    )}
                    />
                    <Route 
                    path="/messages/:id" exact 
                    render={(renderProps)=>(
                        userData?(<MessagesPage props={renderProps}/>):(<Redirect to="/login"/>)
                    )}
                    />
                    <Route 
                        path="/addProjet" exact 
                        render={(renderProps)=>(
                            userData?(<AddProjetPage/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/addTravail" exact 
                        render={(renderProps)=>(
                            userData?(<AddTravailPage/>):(<Redirect to="/login"/>)
                        )}
                    />
                    
                    <Route 
                        path="/travail/:id" exact 
                        render={(renderProps)=>(
                            userData?(<SingleTravailPage props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/projet/:id" exact 
                        render={(renderProps)=>(
                            userData?(<SingleProjetPage props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/entreprise/:id" exact 
                        render={(renderProps)=>(
                            userData?(<SingleEntreprisePage props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/utilisateur/:id" exact 
                        render={(renderProps)=>(
                            userData?(<SingleUtilisateurPage props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/manage/travails" exact 
                        render={(renderProps)=>(
                            userData?(<Manage props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/manage" exact 
                        render={(renderProps)=>(
                            userData?(<Redirect to="/manage/travails"/>):(<Redirect to="/login"/>)
                        )}
                    />
                    
                    <Route 
                        path="/manage/travail/:id" exact 
                        render={(renderProps)=>(
                            userData?(<Manage2 props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/manage/projet/:id" exact 
                        render={(renderProps)=>(
                            userData?(<Manage3 props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/manage/projets" exact 
                        render={(renderProps)=>(
                            userData?(<Manage4 props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/parameteres" exact 
                        render={(renderProps)=>(
                            userData?(<Parametres props={renderProps}/>):(<Redirect to="/login"/>)
                        )}
                    />
                    <Route 
                        path="/upload" exact 
                        render={(renderProps)=>(
                            userData?(<Upload props={renderProps}/>):(<Upload props={renderProps}/>)
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </> 
    ) 
} 
export default Router
