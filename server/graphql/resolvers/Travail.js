const {checkAuth, genrateToken} = require('../../util/Token_functions');
const {UserInputError} = require('apollo-server');
const storeFS = require('../../upload');
const {BACKEND_URL,UPLOAD_DIR,FRONTEND_URL} = require("../../config");

const Compte = require("../../models/Compte");
const Travail = require("../../models/Travail");
const Categorie = require("../../models/Categorie");
const Fichier = require("../../models/Fichier");
const Candidat = require("../../models/Candidat");

module.exports = {
    Query: {
        getTravails: async(root,{skip,limit},context)=>{
            const user = checkAuth(context);
            if(user){
                let travails = await Travail.find().skip(skip).limit(limit).sort({ createdAt: 'desc' }).populate({
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
                return travails;
            }
            throw new Error("vous n'ete pas connecte");
        },
        getTravail: async(root,{ID},context)=>{
            const user = checkAuth(context);
            if(user){
                const travail = await Travail.findById(ID).populate({
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
                if(travail){
                    return travail;
                }
                throw new Error("non trouve");
            }
            throw new Error("vous n'ete pas connecte");            
        },
        getTravailsByCompte: async(root,{ID},context)=>{
            const travails = await Travail.find({Compte: ID}).populate({
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
            const candidats = await Promise.all(travails.map(async (item)=> {
                let tmpCandidats = await Candidat.find({Travail: item._id}).populate({
                    path:"Compte",
                    model: Compte
                });
                // console.log();
                return {...item._doc,Candidats: tmpCandidats};
            }));
            
            return candidats;
        },
        getmyCandidatures: async(root,_,context)=>{
            const user = checkAuth(context);
            if(user){
                let candidats = await Candidat.find({Candidat: user.ID})
                .populate({
                    path:"Candidat",
                    model: Compte
                })
                .populate({
                    path:"Travail",
                    model: Travail
                })
                return candidats;
            }
        },
        getCandidatsByTravail: async(root,{ID},context)=>{
            const user = checkAuth(context);
            if(user){
                let candidats = await Candidat.find({Travail: ID})
                .populate({
                    path:"Candidat",
                    model: Compte
                })
                .populate({
                    path:"Travail",
                    model: Travail
                })
                return candidats;
            }
        },
    },
    Mutation: {
        addTravail: async(root,{Data},context)=>{
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
                
                const travail = new Travail({...Data,Attachements:files,Compte: user.ID});
                await travail.save();
                let response = await Travail.findById(travail._id).populate({
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
        updateTravail: async(root,{ID, Data} ,context)=>{
            const user = await checkAuth(context);
            if(user){
                const travail = await Travail.findByIdAndUpdate(ID, {...Data});
                let response = await Travail.findById(travail._id).populate({
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
        deleteTravail: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const travail = await Travail.findByIdAndRemove(ID);
                return true;
            }
            throw new Error("you have to login");
        },
        addCandidatureTravail: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                let candidature = new Candidat({
                    Travail: ID,
                    Candidat: user.ID,
                    Attachements: [],
                });
                await candidature.save();
                const response = await Candidat.findById(candidature._id).populate({
                    path:"Travail",
                    model: Travail
                })
                .populate({
                    path:"Candidat",
                    model: Compte
                });
                
                return response;
            }
            throw new Error("you have to login");
        },
    }
}