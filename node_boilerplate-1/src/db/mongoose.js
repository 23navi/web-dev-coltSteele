const mongoose=require("mongoose");

//mongoose

const dbName="test";

mongoose.connect("mongodb://127.0.0.1:27017/"+dbName,{useNewUrlParser: true})
.then(()=>{
    console.log("connection open");
})
.catch(err=>{
    console.log("error");
})
