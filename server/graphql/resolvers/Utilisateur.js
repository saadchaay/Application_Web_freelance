const bcrypt = require('bcryptjs');
const Compte = require("../../models/Compte");
const {UserInputError} = require('apollo-server');
const Utilisateur = require("../../models/Utilisateur");
const Fichier = require("../../models/Fichier");
// const {SECRET_KEY,AUTH_TOKEN_EXPIRY} = require("../../config.js");
const {checkAuth, genrateToken} = require('../../util/Token_functions');
const validate_addUtilisateur = require("../validators/Utilisateur");
module.exports = {
    Query: {
        getUtilisateurs: async(root,{skip,limit},context)=>{
            const user = await checkAuth(context);
            // console.log(context);
            const Email = user.Email;
            const compte = await Compte.findOne({Email});
            if(compte){
                const utilisateurs = await Utilisateur.find().skip(skip).limit(limit).sort({CreatedAt: -1 }).populate("Compte");
                return utilisateurs;
            }
            throw new Error("you have to login");
        },
        getUtilisateur: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const Email = user.Email;
                const compte = await Compte.findOne({Email});
                if(compte){
                    const utilisateur = await Utilisateur.findById(ID).populate("Compte");
                    return utilisateur;
                }
            }
            throw new Error("you have to login");        
        },
        getUtilisateurByCompte: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const utilisateur = await Utilisateur.findOne({Compte: ID}).populate({
                    path: "Compte",
                    model: Compte
                })
                .populate({
                    path: "Attachements",
                    model: Fichier
                });
                
                return utilisateur;
            }
            throw new Error("you have to login");        
        },
    },
    Mutation: {
        //ajouter un compte de type utilisateur
        addUtilisateur: async (root,{Data:{Email, Nom, Prenom, Sexe, DateNaissance, Username, Password}})=>{
            const {errors,valide} = await validate_addUtilisateur({Email, Nom, Prenom, Sexe, DateNaissance, Username, Password});
            if(!valide){
                throw new UserInputError("Errors",{errors})
            }
            const EmailToken = "it must be genrated width uid4 or a hashing method";
            Password = await bcrypt.hash(Password,12);
            const compte = new Compte({
                Email,
                Username,
                Password,
                EmailToken,
                TypeCompte : "Utilisateur",
                
            });
            const compteSaved = await compte.save();
            
            const utilisateur = new Utilisateur({
                Nom,
                Prenom,
                DateNaissance,
                Sexe,
                Compte:compteSaved._id
            });
            await utilisateur.save();
            compteSaved.IdProfile = utilisateur._id;
            await compteSaved.save()
            return true;
        },
        editUtilisateur: async (root,{Data},context)=>{
            let user = await checkAuth(context);
            if(user){
                const utilisateur = await Entreprise.findByIdAndUpdate(ID, {...Data});
                const response = await Entreprise.findById(utilisateur._id).populate({
                    path: "ArrierePlan",
                    model: Fichier
                })
                .populate({
                    path: "Compte",
                    model: Compte
                });
                
                return response;
            }
            return true;
        },
    }
}
