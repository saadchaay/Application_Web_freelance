const Compte = require("../../models/Compte");
const Utilisateur = require("../../models/Utilisateur");

validate_addUtilisateur = async({Email, Nom, Prenom, Sexe, DateNaissance, Username, Password}) =>{
    const errors = {};
    
    if(Email.trim() ===''){
        errors.Email = "l'email ne peut pas etre vide";
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
    
    if(Nom.trim() ===''){
        errors.Nom = "le nom ne peut pas etre vide";
    }
    
    if(Prenom.trim() ===''){
        errors.Prenom = "le prenom ne peut pas etre vide";
    }
    
    if(Sexe.trim() ===''){
        errors.Sexe = "le sexe ne peut pas etre vide";
    }else if((Sexe.trim()!="Homme")&&(Sexe.trim()!="Femme")){
        errors.Sexe = "le sexe n'est pas valide";
    }
    
    if(DateNaissance.trim() ===''){
        errors.DateNaissance = "la date de naissance ne peut pas etre vide";
    }
    
    if(Username.trim() ===''){
        errors.Username = "le nom d'utilisateur ne peut pas etre vide";
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
        errors.Password = "le mot de passe ne peut pas etre vide";
    }else if (Password.trim().length < 6) {
        errors.Password = "le mot de passe doit etre > 6 caracters";                
    }
    return {
        errors,
        valide: Object.keys(errors).length < 1 ,
    };
}

module.exports = validate_addUtilisateur;