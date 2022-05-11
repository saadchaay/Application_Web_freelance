const { model, Schema } = require('mongoose');
const TravailSchema = new Schema(
    {
        Titre: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        Type: {
            type: String,
            default: "part-time"
        },
        Categorie: {
            type: Schema.Types.ObjectId,
            ref: 'Categorie'
        },
        Adresse: {
            type: String,
            default: "online"
        },
        Description : {
            type: String,
            default : " "
        },
        Attachements: {
            type: [Schema.Types.ObjectId],
            ref: 'Fichier'
        },
        Etiquesttes: {
            type: [String]
        },
        MinSalaire: {
            type:Number,
            default: 10
        },
        MaxSalaire: {
            type:Number,
            default: 10
        },
        CreatedAt : {
            type: Date,
            default: Date.now
        },
        Compte: {
            type: Schema.Types.ObjectId ,
            ref: 'Compte'
        },
        DateExperation: {
            type: Date
        },
        Occupe: {
            type: Boolean,
            default: false
        },
        UpdatedAt : {
            type: Date,
            default: Date.now
        }
    }
);
//trigger pour mise a jour la date de (UpdatedAt)
TravailSchema.pre('save', function(next){
    now = new Date();
    this.UpdatedAt = now;
    next();
});

module.exports = model('Travail', TravailSchema);