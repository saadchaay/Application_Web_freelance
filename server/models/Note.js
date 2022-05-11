const { model, Schema } = require('mongoose');

const NoteSchema = new Schema({
    Compte: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Contenu: String,
    Priorete: String,
    CreatedAt : {
        type: Date,
        default: Date.now
    },
});

module.exports = model('Note', NoteSchema);
