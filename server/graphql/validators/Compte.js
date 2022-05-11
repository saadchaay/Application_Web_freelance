const bcrypt = require('bcryptjs');
const Compte = require("../../models/Compte");
const validate_login = async({Username, Password}) =>{
    const errors = {};
    let compte;
    if(Username.trim() ===''){
        errors.Username = "le nom d'utilisateur ne peut pas etre vide";
    }
    if(Password.trim() ===''){
        errors.Password = "le mot de passe ne peut pas etre vide";
    }else if (Password.trim().length < 6) {
        errors.Password = "le mot de passe doit etre > 6 caracters";    
    }
    
    if(Object.keys(errors).length < 1 ){
        compte = await Compte.findOne().or([
            { Email: Username},
            { Username }
        ]);
        if (!compte) {
            errors.Username = "le nom d'utilisateur est erroné";
			errors.Password = "mot de passe est erroné";                
		}else {
            const Validepassword = await bcrypt.compare(Password, compte.Password);
            if (!Validepassword) {
                errors.Password = "mot de passe est erroné";                
            }
        } 
    }    
    return {
        errors,
        compte,
        valide: Object.keys(errors).length < 1 ,
    };
}

module.exports = validate_login;