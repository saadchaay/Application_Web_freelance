const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate_login = require("../validators/Compte");
const {checkAuth, genrateToken} = require('../../util/Token_functions');
const {UserInputError} = require('apollo-server');

const Compte = require("../../models/Compte");
const Utilisateur = require("../../models/Utilisateur");
const Entreprise = require("../../models/Entreprise");
const Fichier = require("../../models/Fichier");

const storeFS = require('../../upload');
const {BACKEND_URL,UPLOAD_DIR,FRONTEND_URL} = require("../../config");

module.exports = {
    Query: {
        //verfication du etape 0 d'inscription
        register_step0: async(root,{Email})=>{
            const errors = {};
            if(Email.trim() ===''){
                errors.Email = "l'email est requis";
            }else {
                const EmailRegx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
                if(!Email.match(EmailRegx)){
                    errors.Email = "l'email ne pas valide";
                }else {
                    const email_exists = await Compte.findOne({Email});
                    if(email_exists){
                        errors.Email = "l'email est deja utilise pour un autre compte";
                    }
                }
            }
            if(Object.keys(errors).length > 0){
                throw new UserInputError("Errors",{errors});
            }else {
                return true;
            }
            
        },
        //verfication du etape 1 d'inscription
        register_step1_utilisateur: async(root,{Nom, Prenom, Sexe, DateNaissance}) =>{
            const errors = {};
            if(Nom.trim() ===''){
                errors.Nom = "le nom est requis";
            }
            if(Prenom.trim() ===''){
                errors.Prenom = "le prenom est requis";
            }
            if(Sexe.trim() ===''){
                errors.Sexe = "le sexe est requis";
            }else if((Sexe.trim()!="Homme")&&(Sexe.trim()!="Femme")){
                errors.Sexe = "le sexe n'est pas valide";
            }
            
            if(DateNaissance.trim() ===''){
                errors.DateNaissance = "la date de naissance est requis";
            }
            if(Object.keys(errors).length > 0){
                throw new UserInputError("Errors",{errors});
            }else {
                return true;
            }
        },
        //verfication du etape 1 d'inscription
        register_step1_entreprise: async(root,{Denomination, StatueJuridique, DateCreation}) =>{
            const errors = {};
            
            if(Denomination.trim() ===''){
                errors.Denomination = "la denomination est requise";
            }
            if(StatueJuridique.trim() ===''){
                errors.StatueJuridique = "le statue juridiquest requis";
            }else if((StatueJuridique.trim().length<2)){
                errors.StatueJuridique = "le statue juridiquest n'est pas valide";
            }
            
            if(DateCreation.trim() ===''){
                errors.DateCreation = "la date de creation est requis";
            }
            if(Object.keys(errors).length > 0){
                throw new UserInputError("Errors",{errors});
            }else {
                return true;
            }
        },
        //verfication du etape 2 d'inscription
        register_step2: async(root,{Username, Password, Password2}) =>{
            const errors = {};
            if(Username.trim() ===''){
                errors.Username = "le nom d'utilisateur est requis";
            }else {
                if (Username.trim().length > 20) {
                    errors.Username = "le nom d'utilisateur doit doit etre < 20 caracters";    
                }else if (Username.trim().length < 3) {
                    errors.Username = "le nom d'utilisateur doit etre > 3 caracters";                
                }else {
                    const username_exists = await Compte.findOne({Username});
                    if(username_exists ){
                        errors.Username = "le nom d'utilisateur est deja utilise pour un autre compte";                
                    }
                }
            }
            if(Password.trim() ===''){
                errors.Password = "le mot de passe est requis";
            }else if (Password.trim().length < 6) {
                errors.Password = "le mot de passe doit etre > 6 caracters";                
            }else {
                if(Password.trim()!==Password2.trim()){
                    errors.Password2 = "les deux mot de passe sont différent";
                }
            }   
            
            if(Object.keys(errors).length > 0){
                throw new UserInputError("Errors",{errors});
            }else {
                return true;
            }
        },
        getCompte: async(root,_,context)=>{
            const user = await checkAuth(context);
            if(user){
                let compte = await Compte.findById(user.ID);
                return compte;
            }
            throw new Error("vous devez se connecter");
        }
    },
    Mutation: {
        login: async(root,{Username, Password})=>{
            const {errors,compte,valide} = await validate_login({Username,Password});
            if(!valide){
                throw new UserInputError("Errors",{errors});
            }
            const Token = await genrateToken(compte);
            if(compte){
                compte.IsOnline = true;
                await compte.save();
            }
            let response = await Compte.findOne({_id: compte._id})
            return {
                ...response._doc,
                Token,
            };
        },
        logout: async(root, _ ,context)=>{
            const user = await checkAuth(context);
            if(user){
                const Username = user.Username;
                const compte = await Compte.findOne({Username});
                if(compte){
                    compte.LastLogin = (new  Date()).toISOString();
                    compte.IsOnline = false;
                    await compte.save();        
                }
            }
            return true;        
        },
        toggelOnline: async(root, _, context)=>{
            const {Username} = await checkAuth(context);
            if(Username){
                const compte = await Compte.findOne({Username});
                if(compte){
                    compte.IsOnline = !compte.IsOnline;
                    await compte.save();
                    return compte.IsOnline;
                }else {
                    throw new Error("il faut se connecter");
                }
            }else {
                throw new Error("il faut se connecter");
            }
        },
        uploadFile: async(root,{file},context)=>{
            const user = await checkAuth(context);
            if(user){
                let tmp = await storeFS(file);
                let fichier = new Fichier({
                    Lien: FRONTEND_URL+"uploads/"+tmp.Lien,
                    Nom: tmp.filename,
                    Compte: user.ID,
                    Type: tmp.mimetype
                });
                await fichier.save()
                return fichier;
            }
        },
        updateImage: async(root,{file},context)=>{
            const user = await checkAuth(context);
            if(user){
                const compte = await Compte.findById(user.ID);
                let tmp = await storeFS(file);
                let fichier = new Fichier({
                    Lien: FRONTEND_URL+"uploads/"+tmp.Lien,
                    Nom: tmp.filename,
                    Compte: user.ID,
                    Type: tmp.mimetype
                });
                await fichier.save()
                
                compte.Image = fichier.Lien;
                await compte.save();
                
                return fichier.Lien;
            }
        },
        addAttachement: async(root,{file},context)=>{
            const user = await checkAuth(context);
            if(user){
                let tmp = await storeFS(file);
                let fichier = new Fichier({
                    Lien: FRONTEND_URL+"uploads/"+tmp.Lien,
                    Nom: tmp.filename,
                    Compte: user.ID,
                    Type: tmp.mimetype
                });
                await fichier.save()
                const utilisateur = await Utilisateur.findOne({Compte: user.ID});
                utilisateur.Attachements.push(fichier._id);
                await utilisateur.save();
                console.log(utilisateur);
                const response = await Utilisateur.findOne({Compte: user.ID}).populate({path:"Attachements",model:Fichier});
                console.log(response.Attachements);
                return response.Attachements;
            }
        },
    }
}
