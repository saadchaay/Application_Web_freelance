const { model, Schema } = require('mongoose');
// slogan == tagline
const EntrepriseDefaultAvata = "http://localhost/uploaded/default.png";

const EntrepriseSchema = new Schema(
    {
        Denomination: {
            type: String,
            required: true,
            trim: true,
        },
        DateCreation: {
            type: Date,
            required: true,
        },
        ChiffreAffaire:{
            type:Number,
            default: 0
        }, 
        Nationalite : {
            type: String,
            default : "maroccain"
        },
        Compte: {
            type: Schema.Types.ObjectId ,
            ref: 'Compte'
        },
        Attachements: {
            type: [Schema.Types.ObjectId],
            ref: 'Fichier'
        },
        EmailContact: {
            type: String,
            lowercase: true,
            trim: true,
        },
        Adresse: String,
        Description: String,
        Slogan: String,
        StatueJuridique: {
            type: String
        },
        Tele: String,
        ArrierePlan: {
            type: Schema.Types.ObjectId ,
            ref: 'Fichier'
        },
        CreatedAt: {
            type: Date,
            default: Date.now
        },
        UpdatedAt: {
            type: Date,
            default: Date.now
        },
    }
);
//trigger pour mise a jour la date de (UpdatedAt)
EntrepriseSchema.pre('save', function(next){
    now = new Date();
    this.UpdatedAt = now;
    next();
});
module.exports = model('Entreprise', EntrepriseSchema);        