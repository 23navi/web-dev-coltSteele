const mongoose=require("mongoose");

//mongoose
//change the server name based on the project or user the dev.env for it

const dbName="test";

mongoose.connect(process.env.MONGODB_SERVER+dbName,{useNewUrlParser: true})
.then(()=>{
    console.log("connection open");
})
.catch(err=>{
    console.log("error");
})
