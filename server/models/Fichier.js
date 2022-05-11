const { model, Schema } = require('mongoose');

const fichierSchema = new Schema({
  Lien: {
      type:String,
      required:true
  },
  Nom : String,
  Compte: {
    type: Schema.Types.ObjectId,
    ref: 'Compte'
  },
  Type: {
      type: String
  },
  CreatedAt: {
      type: Date,
      default: Date.now
  }
});
module.exports = model('Fichier', fichierSchema);
