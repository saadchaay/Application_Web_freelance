const Compte = require("../../models/Compte");
const Utilisateur = require("../../models/Utilisateur");
const Entreprise = require("../../models/Entreprise");
const Note = require("../../models/Note");
const Fichier = require("../../models/Fichier");
const {checkAuth, genrateToken} = require('../../util/Token_functions');
const {UserInputError} = require('apollo-server');
const storeFS = require('../../upload');
const {BACKEND_URL,UPLOAD_DIR,FRONTEND_URL} = require("../../config");

module.exports = {
    Query: {
        getNotes: async(_,__,context)=>{
            const user = await checkAuth(context);
            if(user){
                const notes = await Note.find({Compte: user.ID}).sort({CreatedAt: -1});
                return notes;
            }
        }
    },
    Mutation: {
        addNote: async(_,{Contenu, Priorete},context)=>{
            const user = await checkAuth(context);
            if(user){
                const note = new Note({
                    Compte: user.ID,
                    Contenu, Priorete
                });
                await note.save();
                
                return note;
            }
        },
        editNote: async(_,{ID, Contenu, Priorete},context)=>{
            const user = await checkAuth(context);
            if(user){
                const note = await Note.findByIdAndUpdate(ID, { Contenu, Priorete});
                
                return note;
            }
        },
        deleteNote: async(_,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const note = await Note.findByIdAndRemove(ID);
                return true;
            }
        },
    }
}
                
