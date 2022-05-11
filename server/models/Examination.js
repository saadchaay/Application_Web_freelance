const { model, Schema } = require('mongoose');

const ExaminationSchema = new Schema({
    Examinateur: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Examine: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Question1: Boolean,
    Question2: Boolean,
    Commentaire: String,
    Etoiles: Number,
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = model('Examination', ExaminationSchema);
