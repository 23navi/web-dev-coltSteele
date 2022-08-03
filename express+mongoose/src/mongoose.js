const mongoose=require("mongoose");

//mongoose

mongoose.connect("mongodb://127.0.0.1:27017/farmDb",{useNewUrlParser: true})
.then(()=>{
    console.log("connection open");
})
.catch(err=>{
    console.log("error");
})
