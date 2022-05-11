const Categorie = require("../../models/Categorie");
const Fichier = require("../../models/Fichier");
const {checkAuth, genrateToken} = require('../../util/Token_functions');

module.exports = {
    Query: {
        getCategories: async(root,{skip,limit})=>{
            let Catlist = await Categorie.find().skip(skip).limit(limit).sort({ NbrUtilisations: 'desc' })//.populate({
            //     path:"Icon",
            //     model: Fichier
            // });
            if(Catlist){
                Catlist = Catlist.map(ele=>{
                    if(ele.Icon){
                        ele.Icon = ele.Icon.Lien
                    }
                    return ele;
                })
				return Catlist;
			}
             throw new Error("categorie non trouver");
        },
        getCategorie: async(root,{ID})=>{
            const categorie = await Categorie.findById(ID).populate({
                path:"Icon",
                model: Fichier
            });
            if(categorie){
                if(categorie.Icon){
                    categorie.Icon = categorie.Icon.Lien
                }
                return categorie;
            }
            throw new Error("categorie non trouver");
        }
    },
    
    Mutation: {
        addCategorie: async(root,{Data},context)=>{
            const user = await checkAuth(context);
            const categorie = new Categorie({...Data});
            await categorie.save();
            let response = await Categorie.findById(categorie._id).populate({
                path:"Icon",
                model: Fichier
            });
            if(response.Icon){
                response.Icon = response.Icon.Lien
            }
            return response;
        },
        deleteCategorie: async(root,{ID},context)=>{
            const user = await checkAuth(context);
            if(user){
                const categorie = await Categorie.findByIdAndRemove(ID);
                return true;
            }
            throw new Error("you have to login");
        },
        updateCategorie: async(root,{ID, Data} ,context)=>{
            const user = await checkAuth(context);
            if(user){
                const categorie = await Categorie.findByIdAndUpdate(ID, {...Data});
                let response = await Categorie.findById(categorie._id).populate({
                    path:"Icon",
                    model: Fichier
                });
                if(response.Icon){
                    response.Icon = response.Icon.Lien
                }
                return response;
            }
            throw new Error("you have to login");
        }
    }
}