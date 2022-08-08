const { default: mongoose } = require("mongoose");

require("../mongoose");


const userSchema = new mongoose.Schema({
    name:String,
    address:[
        {
            // _id:{id:false},   //if we don't want id for nested objects
            street:String,
            city:String,
            state:String,
        }]
    
})

const User=mongoose.model("User",userSchema);  // in mongo db the model will be users... and can create new user by new User


const makeUser=async()=>{
    const user1=new User({
        name:"Navi"
    })
    user1.address.push({street:"Vip road",city:"Surat",state:"Gujarat"})
    const res=await user1.save();
    console.log(res);

}

makeUser();