const { model, Schema } = require('mongoose');

const CandidatSchema = new Schema({
    Candidat: {
        type: Schema.Types.ObjectId,
        ref: 'Compte',
        required: true
    },
    Travail: {
        type: Schema.Types.ObjectId,
        ref: 'Travail'
    },
    CreatedAt : {
        type: Date,
        default: Date.now
    },
    Attachements: {
        type: [Schema.Types.ObjectId],
        ref: 'Fichier'
    }
});

module.exports = model('Candidat', CandidatSchema);
