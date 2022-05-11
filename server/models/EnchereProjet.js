const { model, Schema } = require('mongoose');

const EnchereProjetSchema = new Schema({
    Projet: {
        type: Schema.Types.ObjectId,
        ref: 'Projet'
    },
    Compte: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    PrixMin:  Number,
    LivraisonTemps: String,   //store it as date|Unit(day/month)
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    Accepted: {
        type: Boolean,
        default: false
    },
});

module.exports = model('EnchereProjet', EnchereProjetSchema);
