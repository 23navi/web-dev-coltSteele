const express = require("express");
const path= require("path");
const http= require("http");
require("./src/db/mongoose");
const ejsMate = require('ejs-mate');
const methodoverride=require("method-override");

const app= express();
const server= http.createServer(app);



app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');
app.engine('ejs', ejsMate);

app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.get("/",(req,res)=>{
    console.log("hello");
    res.send("hello");
})

module.exports = {app,server};

