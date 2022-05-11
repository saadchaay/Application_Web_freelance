const { model, Schema } = require('mongoose');

const categorieSchema = new Schema({
    Titre: {
        type: String,
        required: true
    },
    Icon: String,
    CreatedAt : {
        type: Date,
        default: Date.now
    },
    Description: {
        type: String
    },
    NbrUtilisations: {
        type: Number,
        default: 0
    } 
});
module.exports = model('Categorie', categorieSchema);
