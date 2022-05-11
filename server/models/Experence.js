const { model, Schema } = require('mongoose');

const ExperenceSchema = new Schema({
    Titre: {
        type: String,
        required: true
    },
    Description: {
        type: String
    }, 
});
module.exports = model('Experence', ExperenceSchema);