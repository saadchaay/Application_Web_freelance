import loadjs from "loadjs";
import {FRONT_END_URL} from "../constants"

const bundles = {
    'bundleA': [FRONT_END_URL+"js/jquery-3.3.1.min.js"],
    'bundleB': [
        FRONT_END_URL+"js/jquery-migrate-3.0.0.min.js",   FRONT_END_URL+"js/mmenu.min.js",              FRONT_END_URL+"js/tippy.all.min.js",
        FRONT_END_URL+"js/simplebar.min.js",              FRONT_END_URL+"js/bootstrap-slider.min.js",   FRONT_END_URL+"js/bootstrap-select.min.js",
        FRONT_END_URL+"js/snackbar.js",                   FRONT_END_URL+"js/clipboard.min.js",          FRONT_END_URL+"js/counterup.min.js",
        FRONT_END_URL+"js/magnific-popup.min.js",         FRONT_END_URL+"js/slick.min.js"
    ],
    'bundleC' : [FRONT_END_URL+"js/custom.js",FRONT_END_URL+"js/pages/snakBar.js"],
    'bundleWelcome' : [FRONT_END_URL+"js/pages/welcome.js","https://maps.googleapis.com/maps/api/js?key=AIzaSyAgeuuDfRlweIs7D6uo4wdIHVvJ0LonQ6g&libraries=places&callback=initAutocomplete"],
    'bundleD' : [FRONT_END_URL+"js/snackbar_conf.js"],
    'bundleE' : [FRONT_END_URL+"js/custom.js"]
};
const include = (bundleIds, callbackFn)=>{
    bundleIds.forEach(function(bundleId) {
        if (!loadjs.isDefined(bundleId)){
            loadjs(bundles[bundleId], bundleId);
        }
    });
    loadjs.ready(bundleIds, callbackFn);
}

export default include
