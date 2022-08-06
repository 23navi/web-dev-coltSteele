const express = require("express");
const {mongoose} = require("mongoose");
const path= require("path");
require("./src/db/mongoose");
const methodoverride=require("method-override");

const app= express();
const PORT = process.env.PORT || 3000;

app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');
app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello");
})



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})