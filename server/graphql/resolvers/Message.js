const Message = require("../../models/Message");
const Compte = require("../../models/Compte");
const Conversation = require("../../models/Conversation");
const Fichier = require("../../models/Fichier");

const { withFilter } = require('apollo-server');
const mongoose = require('mongoose');

const {checkAuth, genrateToken} = require('../../util/Token_functions');

module.exports = {
    Query: {
        // getConversation: async(root,{ID},context)=>{
        //     const user             = await checkAuth(context);
        //     if(user){
        //         const conversation = await Conversation.findOne({_id:ID}).populate("Compte1 Compte2").populate({
        //             path:"Messages",
        //             model: Message,
        //             options: {
        //                 sort: "CreatedAt"
        //             },
        //             populate:{
        //                 path: "Emetteur Recepteur",
        //                 model: Compte
        //             }
        //         });
        //         // let Messages       = await Message.find({Conversation: conversation._id}).sort({ CreatedAt: 'asc' })
        //         const MsgsNonVue   = conversation.Messages.filter(ele=>(ele.Vue===false));
        //         const CountNonVue  = MsgsNonVue.length;
        // 
        //         return {
        //             ...conversation._doc,
        //             CountNonVue
        //         };
        //     }
        //     throw new Error("il faut se connecter");
        // },
        getConversation: async(root,{ID,Skip,Limit},context)=>{
            const user             = await checkAuth(context);
            if(user){
                ///counting non vue
                //we should change Limit parameter to the countNonVue
                // but i didnt do it
                const conversation = await Conversation.findOne({_id:ID}).populate("Compte1 Compte2").populate({
                    path:"Messages",
                    model: Message,
                    options: {
                        limit: Limit,
                        sort: { CreatedAt: "asc"},
                        skip: Skip
                    },
                    populate:{
                        path: "Emetteur Recepteur",
                        model: Compte
                    }
                });
                // let Messages       = await Message.find({Conversation: conversation._id}).sort({ CreatedAt: 'asc' })
                const MsgsNonVue   = conversation.Messages.filter(ele=>(ele.Vue===false));
                const CountNonVue  = MsgsNonVue.length;
        
                return {
                    ...conversation._doc,
                    CountNonVue
                };
            }
            throw new Error("il faut se connecter");
        },
                
        getConversations: async(root,_,context)=>{
            const user              = await checkAuth(context);
            if(user){
                let conversations  = await Conversation.find().or([{ Compte1: user.ID  }, { Compte2: user.ID }])
                .populate("Compte1 Compte2").populate({
                    path:"Messages",
                    model: Message,
                    options: {
                        sort: {CreatedAt: -1}
                    },
                    populate:{
                        path: "Emetteur Recepteur",
                        model: Compte
                    }
                }).sort({UpdatedAt: "desc"});
                console.log(conversations)
				let response= [];
                conversations.map((c)=>{
                    const conv = {
                        _id: c._id,
                        Compte1: c.Compte1,
                        Compte2: c.Compte2,
                        CreatedAt: c.CreatedAt,
                        Messages: c.Messages,
                        CountNonVue: 0
                    };
                    const MsgsNonVue   = c.Messages.filter(ele=>((ele.Vue===false)&&(ele.Emetteur._id!==user._id)));
                    conv.CountNonVue   = MsgsNonVue.length;
                    
                    response.push(conv);
                });
                
                return response;
            }
            throw new Error("il faut se connecter");
        },
        getMessage: async(root,{ID},context)=>{
            const user              = await checkAuth(context);
            if(user){
                let message = await Message.findById(ID).populate({
                    path:"Emetteur Recepteur",
                    model: Compte
                });
                return message;
            }
            throw new Error("il faut se connecter");
        },
        getNonVueMessages: async(root,_,context)=>{
            const user              = await checkAuth(context);
            if(user){
                let messages = await Message.find({Vue: false,Recepteur: user.ID}).sort({CreatedAt: "desc"}).populate({
                    path: "Emetteur",
                    model: Compte
                });
                
                return messages;    
            }
            throw new Error("il faut se connecter");
        },
    },
    Mutation: {
        addMessage: async (root,{Recepteur, Contenu},context)=>{
            const user = await checkAuth(context);  
            // console.log(Recepteur);
            if(user){
                //checking the recepteur
                let recepteur = await Compte.findById(Recepteur);
                if(recepteur){
                    // console.log(recepteur);
                    const message = new Message({
                        Contenu,
                        Recepteur: recepteur._id,
                        Emetteur: user.ID,
                    });
                    await message.save();
                    const response = await Message.findById(message._id).populate("Emetteur");
                    response.Recepteur = recepteur;
                    context.pubsub.publish("MESSAGE_CREATED", { messageCreated: response });
                return response;
                }
                throw new Error("recepteur non trouve");    
            }
            throw new Error("il faut se connecter");
        },
        VueConversation: async (root,{Conversation: conv},context)=>{
            const user = await checkAuth(context);  
            if(user){
                const messages = await Message.update({"Conversation": conv}, {"$set":{"Vue": true}}, {"multi": true});
                // const messages = await Message.update({Conversation: conv},{Vue: true},{multi: true})
                // const conversation = await Conversation.findByIdAndUpdate(conv, {Vue: true});
                //it's not optimized but it works LOL
                const response = await Conversation.findOne({_id:conv}).populate("Compte1 Compte2").populate({
                    path:"Messages",
                    model: Message,
                    options: {
                        sort: "CreatedAt"
                    },
                    populate:{
                        path: "Emetteur Recepteur",
                        model: Compte
                    }
                });
                const MsgsNonVue   = response.Messages.filter(ele=>(ele.Vue===false));
                const CountNonVue  = MsgsNonVue.length;
                
                return {
                    ...response._doc,
                    CountNonVue
                };
            }
        }
    },
    Subscription:{
        messageCreated: {
            subscribe: withFilter(
                (_,__,context) => context.pubsub.asyncIterator("MESSAGE_CREATED"),
                (payload, variables) => {
                    const { Emetteur, Recepteur } = payload.messageCreated;
                    const isAuthUserSenderOrReceiver = true
                        // variables.ID == Recepteur._id || variables.ID == Emetteur._id;
                        console.log(payload);
                    
                    return isAuthUserSenderOrReceiver;
                }
            )
        }
    }    
}