const { model, Schema } = require('mongoose');

const CompetecneSchema = new Schema({
    Titre: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    Description: {
        type: String
    },
});
module.exports = model('Competence', CompetecneSchema);
