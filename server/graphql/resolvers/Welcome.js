const Categorie = require("../../models/Categorie");
const Projet = require("../../models/Projet");
const Travail = require("../../models/Travail");
const Utilisateur = require("../../models/Utilisateur");
const Entreprise = require("../../models/Entreprise");

module.exports = {
    Query: {
        getWelcomeData: async()=>{
            const CountTravails     = await Travail.countDocuments();
            const CountProjets      = await Projet.countDocuments();
            const CountUtilisateurs = await Utilisateur.countDocuments();
            let CategorieList     = await Categorie.find().limit(18).sort({NbrUtilisations: "desc"});
            let ProjetList        = await Projet.find().limit(18).sort({UpdatedAt: "desc"});
            return {
                CountTravails,    
                CountProjets,
                CountUtilisateurs,
                TopCategories: CategorieList,
                DerniereProjets: ProjetList
            };
        }
    },
    Mutation: {}
}
            


/**
the query 
query{
  getWelcomeData{
    CountProjets
    CountTravails
    CountUtilisateurs
    TopCategories{
      Titre
      _id
      Icon
      NbrUtilisations
    }
    DerniereProjets{
      Titre
      _id
    }
  }
}

*/