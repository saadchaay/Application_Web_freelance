const { model, Schema } = require('mongoose');

const notificationSchema = new Schema({
    Compte: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Icon: {
        type: Schema.Types.ObjectId,
        ref: 'Fichier'
    },
    Emetteur: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Contenu: String, 
    Type: String,
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    Vue: {
        type:Boolean,
        default:false
    }
});

module.exports = model('Notification', notificationSchema);
