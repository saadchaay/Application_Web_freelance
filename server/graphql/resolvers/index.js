const UtilisateurResolvers = require("./Utilisateur");
const EntrepriseResolvers = require("./Entreprise");
const CompteResolvers = require("./Compte");
const CategorieResolvers = require("./Categorie");
const TravailResolvers = require("./Travail");
const ProjetResolvers = require("./Projet");
const MessageResolvers = require("./Message");
const NotificationResolvers = require("./Notification");
const NoteResolvers = require("./Note");

const WelcomeResolvers = require("./Welcome");
const UploadResolvers = require("./test");

module.exports = {
    Query: {
        ...CompteResolvers.Query,
        ...EntrepriseResolvers.Query,
        ...UtilisateurResolvers.Query,
        ...CategorieResolvers.Query,
        ...TravailResolvers.Query,
        ...ProjetResolvers.Query,
        ...MessageResolvers.Query,
        ...WelcomeResolvers.Query,
        ...NotificationResolvers.Query,
        ...NoteResolvers.Query,
    },
    Mutation: {
        ...CategorieResolvers.Mutation,
        ...CompteResolvers.Mutation,
        ...UtilisateurResolvers.Mutation,
        ...EntrepriseResolvers.Mutation,
        ...TravailResolvers.Mutation,
        ...ProjetResolvers.Mutation,
        ...MessageResolvers.Mutation,
        ...NotificationResolvers.Mutation,
        ...NoteResolvers.Mutation,
        ...UploadResolvers.Mutation,
    },
    Subscription:{
        ...MessageResolvers.Subscription,
        ...NotificationResolvers.Subscription,
    }
}