const Compte = require("../../models/Compte");
const Projet = require("../../models/Projet");
const EnchereProjet = require("../../models/EnchereProjet");
const Categorie = require("../../models/Categorie");
const Competence = require("../../models/Competence");
const Fichier = require("../../models/Fichier");
const {checkAuth, genrateToken} = require('../../util/Token_functions');
const {UserInputError} = require('apollo-server');
const storeFS = require('../../upload');
const {BACKEND_URL,UPLOAD_DIR,FRONTEND_URL} = require("../../config");

module.exports = {
    Query: {
        getProjets: async(root,{skip,limit},context)=>{
            const user = checkAuth(context);
            if(user){
                const projets = await Projet.find().skip(skip).limit(limit).sort({ CreatedAt: 'desc' }).populate({
                    path:"Categorie",
                    model: Categorie
                })
                .populate({
                    path:"Attachements",
                    model: Fichier
                })
                .populate({
                    path:"Compte",
                    model: Compte
                });
                return projets;
            }
            throw new Error("vous n'ete pas connecte");
        },
        getProjet: async(root,{ID},context)=>{
            const user = checkAuth(context);
            if(user){
                const projet = await Projet.findById(ID).populate({
                    path:"Categorie",
                    model: Categorie
                })
                .populate({
                    path:"Attachements",
                    model: Fichier
                })
                .populate({
                    path:"Compte",
                    model: Compte
                });
                return projet;
            }
            throw new Error("vous n'ete pas connecte");
                    
        },
        getProjetsByCompte: async(root,{ID},context)=>{
            let projets = await Projet.find({Compte: ID}).populate({
                path:"Categorie",
                model: Categorie
            })
            .populate({
                path:"Attachements",
                model: Fichier
            })
            .populate({
                path:"Compte",
                model: Compte
            }).sort({CreatedAt: -1});
            
            return projets;
        },
        getEnchereProjet: async(root,{ID},context)=>{
            const user = checkAuth(context);
            if(user){
                let encheres = await EnchereProjet.find({Projet: ID}).populate({
                    path:"Projet",
                    model: Projet
                })
                .populate({
                    path:"Compte",
                    model: Compte
                });
            
                return  encheres;
            }
        },
        getmyEnchereProjet: async(root,{ID},context)=>{
            const user = checkAuth(context);
            if(user){
                let encheres = await EnchereProjet.find({Compte: user.ID,Projet: ID}).populate({
                    path:"Projet",
                    model: Projet
                })
                .populate({
                    path:"Compte",
                    model: Compte
                });
            
                return  encheres;
            }
        },
        getmyEncheres: async(root,_,context)=>{
            const user = checkAuth(context);
            if(user){
                let encheres = await EnchereProjet.find({Compte: user.ID}).populate({
                    path:"Projet",
                    model: Projet
                })
                .populate({
                    path:"Compte",
                    model: Compte
                });
                
                return  encheres;
            }
        },
        
    },
    Mutation: {
        addProjet: async(root,{Data},context)=>{
            const user = await checkAuth(context);
            if(user){
                let files = await Promise.all(Data.Attachements.map(async (item)=> {
                    let tmp = await storeFS(item);

                    let fichier = new Fichier({
                        Lien: FRONTEND_URL+"uploads/"+tmp.Lien,
                        Nom: tmp.filename,
                        Compte: user.ID,
                        Type: tmp.mimetype
                    });
                    await fichier.save()
                    return fichier._id;
                }));
                
                const projet = new Projet({
                    ...Data,
                    Attachements:files,
                    Compte:user.ID
                });
                await projet.save();
                
        
                let response = await Projet.findById(projet._id).populate({
                    path:"Categorie",
                    model: Categorie
                })
                .populate({
                    path:"Attachements",
                    model: Fichier
                })
                .populate({
                    path:"Compte",
                    model: Compte
                });
                return response;
            }    
        },
        updateProjet: async(root,{ID, Data} ,context)=>{
            const user = await checkAuth(context);
            if(user){
                const projet = await Projet.findByIdAndUpdate(ID, {...Data});
                let response = await Projet.findById(projet._id).populate({
                    path:"Categorie",
                    model: Categorie
                })
                .populate({
                    path:"Attachements",
                    model: Fichier
                })
                .populate({
                    path:"Compte",
                    model: Compte
                });
                    
                return response;
            }
            throw new Error("you have to login");
        },
        deleteProjet: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const projet = await Projet.findByIdAndRemove(ID);
                return true;
            }
            throw new Error("you have to login");
        },
        addEnchereProjet: async(root,{ID, PrixMin, LivraisonDans} ,context)=>{
            const user = await checkAuth(context);
            if(user){
                let demande = new EnchereProjet({
                    Projet: ID,
                    Compte: user.ID,
                    PrixMin,
                    LivraisonTemps:LivraisonDans
                });
                await demande.save();
                
                let response = await EnchereProjet.findById(demande._id).populate({
                    path:"Projet",
                    model: Projet
                }).populate({
                    path:"Compte",
                    model: Compte
                });
                // response.Encherisseur = response.Compte;
                
                return response;
            }
        },
        annulerEnchereProjet: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const projet = await EnchereProjet.findByIdAndRemove(ID);
                return true;
            }
            throw new Error("you have to login");
        }, 
        AccepterEnchereProjet: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const projet = await EnchereProjet.findByIdAndUpdate(ID,{Accepted: true});
                let response = await EnchereProjet.findById(projet._id).populate({
                    path:"Projet",
                    model: Projet
                }).populate({
                    path:"Compte",
                    model: Compte
                });
                return response                
            }
            throw new Error("you have to login");
        }
    },
    Subscription: {
        
    }
}