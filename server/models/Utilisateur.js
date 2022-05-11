const { model, Schema } = require('mongoose');
// slogan == tagline
const UserDefaultAvata = "http://localhost/uploaded/default.png";

const utilisateurSchema = new Schema(
    {
        Nom: {
            type: String,
            required: true,
            trim: true,
        },
        Prenom: {
            type: String,
            required: true,
            trim: true,
        },
        DateNaissance: {
            type: Date,
            required: true,
        },
        Sexe : {
            type: String,
            required: true,
            enum: ['Homme', 'Femme'],
            default: 'Homme',
        },
        PrixMin:{
            type:Number,
            default: 10
        }, 
        Compte: {
            type: Schema.Types.ObjectId ,
            ref: 'Compte'
        },
        Nationalite : {
            type: String,
            default : "maroccan"
        },
        Adresse: String,
        Slogan: String,
        Description: String,
        Tele: String,
        ArrierePlan: {
            type: Schema.Types.ObjectId ,
            ref: 'Fichier'
        },
        Attachements: {
            type: [Schema.Types.ObjectId],
            ref: 'Fichier'
        },
        Competences: {
            type: [String],
            ref: 'Fichier'
        },
        CreatedAt : {
            type: Date,
            default: Date.now
        },
        UpdatedAt : {
            type: Date,
            default: Date.now
        },
    }
);
//trigger pour mise a jour la date de update
utilisateurSchema.pre('save', function(next){
    now = new Date();
    this.UpdatedAt = now;
    next();
});
module.exports = model('Utilisateur', utilisateurSchema);