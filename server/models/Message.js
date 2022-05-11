const { model, Schema } = require('mongoose');
const Conversation = require('./Conversation.js');
const messageSchema = new Schema({
    Contenu: {
        type: String,
        required: true
    },
    Emetteur: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Recepteur: {
        type: Schema.Types.ObjectId,
        ref: 'Compte'
    },
    Conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    Vue: {
        type:Boolean,
        default:false
    }
});

messageSchema.pre('save', async function(next){
    /*chercher la conversation entre l'emetteur et le recepteur du message*/
    let conversation = await Conversation.find().and([
        { $or: [{ Compte1: this.Emetteur  }, { Compte2: this.Emetteur   }] },
        { $or: [{ Compte1: this.Recepteur }, { Compte2: this.Recepteur  }] },
    ]);
    //if exeists
    if(Object.keys(conversation).length){
        this.Conversation = conversation[0]._id;
        let conv = await Conversation.findById(this.Conversation);
        conv.Messages.push(this._id);
        await conv.save();
        
    }else{
        //if not exists xe well create it
        conversation = new Conversation({
            Compte1: this.Emetteur,
            Compte2: this.Recepteur,
            Messages: [this._id]
        });
        await conversation.save();
        this.Conversation = conversation._id;
    }
    next();
});
module.exports = model('Message', messageSchema);

/*
,
Deleted: {
    type:Boolean,
    default:false
},
*/