const storeFS = require('../../upload');

module.exports = {
    Mutation: {
        uploadFichier: async(root,{file})=>{
            const pathObj = await storeFS(file);
            
            const fileLocation = pathObj.path;
            // console.log(pathObj);
            return fileLocation;
        }
    }
};