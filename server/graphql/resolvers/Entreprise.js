const bcrypt = require('bcryptjs');
const Compte = require("../../models/Compte");
const Fichier = require("../../models/Fichier");
const {UserInputError} = require('apollo-server');
const Entreprise = require("../../models/Entreprise");
const Travail = require("../../models/Travail");
// const {SECRET_KEY,AUTH_TOKEN_EXPIRY} = require("../../config.js");
const {checkAuth, genrateToken} = require('../../util/Token_functions');
const validate_addEntreprise = require("../validators/Entreprise");

module.exports = {
    Query: {
        getEntreprises: async(root,_,context)=>{
            const user = await checkAuth(context);
            if(user){
                const Email = user.Email;
                const compte = await Compte.findOne({Email});
                const entreprises = await Entreprise.find().sort({CreatedAt: -1 }).populate({
                    path: "ArrierePlan",
                    model: Fichier
                })
                .populate({
                    path: "Compte",
                    model: Compte,
                });
                
                return entreprises;
            }
            throw new Error("vous devez se connecter");    
        },
        getEntreprise:  async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const Email = user.Email;
                const compte = await Compte.findOne({Email});
                if(compte){
                    const entreprise = await Entreprise.findById(ID)
                        .populate({
                            path: "ArrierePlan",
                            model: Fichier
                        })
                        .populate({
                            path: "Compte",
                            model: Compte
                        });
                        const CountTravailsPoster = await Travail.find({Compte: entreprise.compte}).countDocuments()
                        // console.log({...entreprise,CountTravailsPoster});
                        return {...entreprise._doc,CountTravailsPoster};
                }
            }
            throw new Error("vous devez se connecter");
        },
        getEntrepriseByCompte: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const entreprise = await Entreprise.findOne({Compte: ID})
                .populate({
                    path: "Compte",
                    model: Compte,
                });
                return entreprise;
                
            }
            throw new Error("you have to login");        
        },          
    },
    Mutation: {
        addEntreprise: async (root,{Data:{Email, Denomination, StatueJuridique, DateCreation, Username, Password}})=>{
            const {errors,valide} = await validate_addEntreprise({Email, Denomination, StatueJuridique, DateCreation, Username, Password});
            if(!valide){
                throw new UserInputError("Errors",{errors})
            }
            const EmailToken = "it must be genrated width uid4 on a hashing method";
            Password = await bcrypt.hash(Password,12);
            const compte = new Compte({
                Email,
                Username,
                Password,
                EmailToken,
                TypeCompte : "Entreprise",
            });
            const compteSaved = await compte.save();
            const entreprise = new Entreprise({
                Denomination,
                StatueJuridique,
                DateCreation,
                Compte:compteSaved._id
            });
            await entreprise.save();
            compteSaved.IdProfile = entreprise._id;
            await compteSaved.save()
            
            return true;
        },
        editEntreprise: async (root,{Data},context)=>{
            let user = await checkAuth(context);
            if(user){
                const entreprise = await Entreprise.findByIdAndUpdate(ID, {...Data});
                const response = await Entreprise.findById(entreprise._id).populate({
                    path: "ArrierePlan",
                    model: Fichier
                })
                .populate({
                    path: "Compte",
                    model: Compte,
                });
                
                return response;
            }
            return true;
        },
    }
}