const { model, Schema } = require('mongoose');
const CompteSchema = new Schema(
    {
        Email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        Username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        Password: {
            type: String,
            required: true,
        },
        TypeCompte : {
            type: String,
            default : "Utilisateur"
        },
        Verified : {
            type : Boolean,
            default: false,            
        },
        IsOnline : {
            type : Boolean,
            default: false,            
        },
        Image: String,
        LastLogin : {
            type: Date,
            default: Date.now
        },
        CreatedAt: {
            type: Date,
            default: Date.now
        },
        UpdatedAt : {
            type: Date,
            default: Date.now
        },
    }
);
//trigger pour mise a jour la date de (UpdatedAt)
CompteSchema.pre('save', function(next){
    now = new Date();
    this.UpdatedAt = now;
    next();
});
module.exports = model('Compte', CompteSchema);