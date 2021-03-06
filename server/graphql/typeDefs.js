const gql = require('graphql-tag');
/*Slogan === tagline -->true*/
module.exports = gql`
#############
type Compte{
    _id: ID!
    Email: String!
    Username: String!
    Password: String!
    TypeCompte: String!
    Verified: Boolean!
    IsOnline: Boolean!
    Nationalite: String!
    LastLogin: String!
    CreatedAt: String!
    UpdatedAt: String!
    Token: String!
    Examinations: [Int!]! 
    Image: String
    IdProfile: String!
}
##############
type Utilisateur{
    _id: ID!
    Nom: String!
    Prenom: String!
    DateNaissance: String
    Sexe: String!
    PrixMin: Int!
    Compte: Compte!
    Adresse: String
    Slogan: String
    Description: String
    Tele: String
    Avatar: String!
    ArrierePlan: String
    CreatedAt: String!
    UpdatedAt: String!
}
##############
type Entreprise{
    _id: ID!
    Denomination: String!
    DateCreation: String!
    ChiffreAffaire: Int!
    Compte: Compte!
    EmailContact: String
    Adresse: String!
    Description: String
    StatueJuridique: String
    Tele: String
    Logo: String!
    ArrierePlan: String!
    CreatedAt: String!
    UpdatedAt: String!
}
##############
#TASK
type Projet{
    _id: ID!
    Titre: String!
    Categorie: Categorie!
    Adresse: String!
    MinBudget: Int!
    MaxBudget: Int!
    CompetecesRequis: [String!]!
    TypePayment:String!
    Description: String!
    Attachement: [String!]!
    CreatedAt: String!
    Compte: Compte!
    DateExperation: String!
    Won: Boolean!
    EnchereProjet: [EnchereProjet]!
}
##############
#JOB
type Travail{
    _id: ID!
    Titre: String!
    Type: String!
    Categorie: Categorie!
    Adresse: String!
    Description: String!
    Attachement: [String!]
    Etiquesttes: [String]!
    MinSalaire: Int!
    MaxSalaire: Int!
    CreatedAt: String!
    Compte: Compte!
    DateExperation: String!
    Occupe: Boolean!
    Candidats: [Candidat!]!
}
type Categorie{
    _id: ID!
    Titre:String!
    Icon:String
    NbrUtilisations: Int!
}

type Message{
    _id: ID!
    Contenu: String!
    Conversation: String! #the ID of the conversation 
    Emetteur: Compte!
    Recepteur: Compte!
    CreatedAt: String!
    Vue: Boolean!
}
    
##############
type Conversation{
    _id: ID!
    Compte1: Compte!
    Compte2: Compte!
    CreatedAt: String!
    Messages: [Message!]!
    CountNonVue: Int!
}
##############
type Fichier{
    _id: ID!
    Lien: String!
    Nom: String!
    Compte: Compte!
    Type: String!
    CreatedAt: String!
}
##############
type Notification{
    _id: ID!
    Compte: Compte!
    Emetteur: Compte!
    Icon: String!
    Vue: Boolean!
    Type: String!
    Contenu: String!
    CreatedAt: String!
}
##############
#biddingTask
type EnchereProjet{
    _id: ID!
    Projet: Projet!
    Encherisseur: Compte!
    PrixMin:  Int!
    LivraisonTemps: String!
    CreatedAt: String!
}
##############
type Candidat{
    _id: ID!
    Candidat: Compte!
    Travail: Projet!
    Attachements: [Fichier!]!
    CreatedAt: String!
}
##############
type Examination{
    _id: ID!
    Examinateur: Compte!
    Examine: Compte!                #reviewed =  Examin??
    Question1: Boolean!
    Question2: Boolean!
    Commentaire: String!
    Etoiles: Int!
    CreatedAt: String!
    UpdatedAt: String!
}
##############
type Note{
    _id: ID!
    Priorete: String!
    Contenu: String!
    CreatedAt: String!
}
##############
type Experence{
    _id: ID!
    Titre: String!
}
type AuthPayload{
    ### ID === compte(ID)
    _id: ID!
    TypeCompte: String!
    Compte: Compte!
    Utilisateur: Utilisateur
    Entreprise: Entreprise
}
type NotificationPayload{
    _id: ID!
    Compte: Compte!
    Vue: Boolean!
    Type: String!
    Contenu: String!
    CreatedAt: String!
}
type WelcomeData{
    CountTravails: Int!
    CountProjets: Int!
    CountUtilisateurs: Int!
    TopCategories: [Categorie!]!
    DerniereProjets: [Projet!]!
}

type Query{
    #this for get the data for le welcome page be couse it doesn't require the authorization
    ## Welcome.js
    getWelcomeData: WelcomeData!
    #### pour le verfication des donnees ou cours d'inscriptions
    register_step0(Email: String!): Boolean!
    register_step1_utilisateur(Nom: String! Prenom: String! Sexe: String! DateNaissance: String!):Boolean!
    register_step1_entreprise(Denomination: String! StatueJuridique: String! DateCreation: String!):Boolean!
    register_step2(Username: String! Password: String! Password2: String!):Boolean!
    ##########################################################################################################
    #### pour les utilisateur et les entreprise
    getUtilisateurs(skip: Int=0 limit: Int=25): [Utilisateur!]!
    getUtilisateur(ID: ID!): Utilisateur!
    getEntreprises(skip: Int=0 limit: Int=25): [Entreprise!]!
    getEntreprise(ID: ID!): Entreprise!
    getCompte: Compte!
    ##########################################################################################################
    #### pour les categories
    getCategories(skip: Int=0 limit: Int=25): [Categorie!]!
    getCategorie(ID: ID!): Categorie!
    ##########################################################################################################
    #### pour les projet
    getProjets(skip: Int=0 limit: Int=25): [Projet!]!
    getProjet(ID: ID!): Projet!
    ##########################################################################################################
    #### pour les Travails 
    getTravails(skip: Int=0 limit: Int=25): [Travail!]!
    getTravail(ID: ID!): Travail!
    ##########################################################################################################
    ##### pour les message
    ##getConversations IDs
    getConversation(ID: ID! Skip: Int=0 Limit: Int=25): Conversation!
    getConversations: [Conversation!]!
    getNonVueMessages: [Message!]!
    getMessage(ID: ID!):Message!
    #####
    getNotification(ID: ID!):Notification! 
    getNonVueNotifications: [Notification!]!
    ##
    
}

type Mutation{
    ##### pour la login/logout/register
    login(Username: String! Password: String!): Compte!
    logout: Boolean!
    addUtilisateur(Data: RegisterUtilisateurInput!): Boolean!
    addEntreprise(Data: RegisterEntrepriseInput!): Boolean!
    
    ##########################################################################################################
    ##### pour les categories
    addCategorie(Data: CategorieInput!): Categorie!
    deleteCategorie(ID: ID!): Boolean!
    updateCategorie(ID: ID! Data: CategorieInput!): Categorie!
    
    ##########################################################################################################
    ##### pour les Travails
    addTravail(Data: TravailInput!): Travail!
    updateTravail(ID:ID! Data: TravailInput!): Travail!
    deleteTravail(ID: ID!): Boolean!
    addCandidatureTravail(ID: ID!): Candidat!
    annulerCandidatureTravail(ID: ID!): Boolean!
    ##########################################################################################################
    ##### pour les projets
    addProjet(Data: ProjetInput!): Projet!
    updateProjet(Data: ProjetInput!): Projet!
    deleteProjet(ID: ID!): Boolean!
    addEnchereProjet(ID: ID! PrixMin: Int! LivraisonDans: String!): EnchereProjet!
    annulerEnchereProjet(ID: ID!): Boolean!
    ##########################################################################################################
    ##### pour les message
    addMessage(Recepteur: ID! Contenu: String!): Message!
    VueConversation(Conversation: ID): Conversation! #pour mettre a jour tout les message d'une conversation (Vue=True) 
    ##########################################################################################################
    ##### pour le statue
    toggelOnline: Boolean!
    ##########################################################################################################
    VueNotifications: [Notification!]!
}
type Subscription{
    messageCreated(ID: ID!): Message!
    notificationCreated: Notification!
    
}
input RegisterUtilisateurInput{
    Email: String!
    Nom: String! 
    Prenom: String! 
    Sexe: String! 
    DateNaissance: String! 
    Username: String! 
    Password: String!
}
input RegisterEntrepriseInput{
    Email: String! 
    Denomination: String! 
    StatueJuridique: String! 
    DateCreation: String! 
    Username: String! 
    Password: String!
}
input CategorieInput{
    Titre: String!
    Description: String!
}
input TravailInput{
    Titre: String! 
    Type: String! 
    Categorie: String! 
    Adresse: String! 
    Description: String! 
    Attachement: [String!]! 
    Etiquesttes: [String!]! 
    MinSalaire: Int! 
    MaxSalaire: Int! 
    DateExperation: String!
}
input ProjetInput{
    Titre: String!
    Categorie: String!
    Adresse: String!
    MinBudget: Int!
    MaxBudget: Int!
    CompetecesRequis: [String!]!
    TypePayment: String!
    Description: String!
    Attachement: [String!]!
    DateExperation: String!
}
`;
//"ID": "5e7c01418ba97b2d38ca0c2c",
//