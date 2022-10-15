const mongoose= require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose") // only req this... passport and passport-local will be used in app.js


const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        uniqure:true
    }
}) 

// username and password field will be added by the passport along with other methods on the User model

UserSchema.plugin(passportLocalMongoose);

module.exports= new mongoose.model("User",UserSchema);