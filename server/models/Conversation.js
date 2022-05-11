const { model, Schema } = require('mongoose');

const conversationSchema = new Schema({
    Compte1: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Compte2: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Messages: {
        type: [Schema.Types.ObjectId],
        ref: 'Message'
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    },
});
conversationSchema.pre('save', function(next){
    now = new Date();
    this.UpdatedAt = now;
    next();
});
module.exports = model('Conversation', conversationSchema);
