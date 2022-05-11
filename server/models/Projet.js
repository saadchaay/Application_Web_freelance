const { model, Schema } = require('mongoose');
const ProjetSchema = new Schema(
    {
        Titre: {
            type: String,
            required: true,
            trim: true,
        },
        Categorie: {
            type: Schema.Types.ObjectId,
            ref: 'Categorie'
        },
        Adresse: {
            type: String,
            default: "online"
        },
        MinBudget: {
            type:Number,
            default: 10
        },
        MaxBudget: {
            type:Number,
            default: 10
        },
        CompetecesRequis: {
            type: [String]
        },
        TypePayment: {
            type : String,
            default: "fixe",            
        },
        Description : {
            type: String,
            default : " "
        },
        Attachements: {
            type: [Schema.Types.ObjectId],
            ref: 'Fichier'
        },
        Compte: {
            type: Schema.Types.ObjectId ,
            ref: 'Compte'
        },
        DateExperation: {
            type: Date,
            default: Date.now
        },
        Won: {
            type: Boolean,
            default: false
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
ProjetSchema.pre('save', function(next){
    now = new Date();
    this.UpdatedAt = now;
    next();
});
module.exports = model('Projet', ProjetSchema);