const Notification = require("../../models/Notification");
const Compte = require("../../models/Compte");
const Fichier = require("../../models/Fichier");
const { withFilter } = require('apollo-server');
const mongoose = require('mongoose');

const {checkAuth, genrateToken} = require('../../util/Token_functions');

module.exports = {
    Query: {
        getNotification: async(root,{ID},context)=>{
             const user             = await checkAuth(context);
             if(user){
                 let notification = await Notification.find({_id: ID}).populate({
                     path: "Emetteur Compte",
                     model: Compte
                 }).populate({
                     path: "Icon",
                     model: Fichier
                 });
                 return notification;    
             }
             throw new Error("il faut se connecter");
         },
        getNonVueNotifications: async(root,_,context)=>{
            const user              = await checkAuth(context);
            if(user){
                let notifications = await Notification.find({Vue: false,Compte: user.ID}).sort({CreatedAt: "desc"}).populate({
                    path: "Emetteur Compte",
                    model: Compte
                }).populate({
                    path: "Icon",
                    model: Fichier
                });
                return notifications;    
            }
            throw new Error("il faut se connecter");
        },
    },
    Mutation: {
        VueNotifications: async (root,_,context)=>{
            const user = await checkAuth(context);  
            if(user){
                const notifications = await Notification.update({"Compte": user.ID}, {"$set":{"Vue": true}}, {"multi": true});
                //it's not optimized but it works LOL
                const response = await Notification.find({Compte:user.ID}).sort({CreatedAt: "desc"}).populate({
                    path: "Emetteur Compte",
                    model: Compte
                }).populate({
                    path: "Icon",
                    model: Fichier
                });
                
                return response
            }
        }
    },
    Subscription:{
        notificationCreated: {
            subscribe: withFilter(
                (_,__,context) => context.pubsub.asyncIterator("NOTIFICATION_CREATED"),
                (payload, variables) => {
                    const { Compte } = payload.messageCreated;
                    const  isAuthUserSenderOrReceiver = variables.ID == Compte._id
                    return isAuthUserSenderOrReceiver;
                }
            )
        }
    }
}