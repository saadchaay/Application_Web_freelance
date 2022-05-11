import React from 'react';
import {StoreProvider} from "easy-peasy"
import './App.css';
import Router from "./router" 
import store from "./store"
import include  from "./utils/includer.js"
function App() {
    
    // <script src="js/chart.min.js"></script>
    // <script src="js/infobox.min.js"></script>
    // <script src="js/markerclusterer.js"></script>
    // <script src="js/maps.js"></script>
    include(['bundleA'], function() {
        include(['bundleB'], function() {
            include(['bundleC'], function() {
                include(['bundleD'], function() {
                        console.log("scripts loaded");
                });
            });
        });
    });
    
    
    return (
        <StoreProvider store={store}>
            <Router/>
        </StoreProvider>
    );
}

export default App;

// <myRoute isProtected={true} path="/travailes" alt={<Redirect to="/login"/>} component={Travailles}/>
// <AuthProvider>
// </AuthProvider>
