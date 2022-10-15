const User= require("../../src/models/user");
const jwt= require("jsonwebtoken");
const mongoose  = require("mongoose");


const userId= new mongoose.Types.ObjectId();

const userOne={
    _id:userId, 
    name:"Navi",
    email:"navi@gmail.com",
    password:"navi@1234",
    age:10,
    tokens:[
        {
            token:jwt.sign({_id:userId},process.env.JWT_SECRET)
        }
    ]
}

const setupDb= (async()=>{
    await User.deleteMany();
    await new User(userOne).save()
})

module.exports={userId,userOne,setupDb}