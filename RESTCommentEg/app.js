const express=require("express");
const app=express();
const path=require("path");

const PORT= process.env.PORT||3000;

const viewPath=path.join(__dirname,"./views");
const partialPath=path.join(__dirname,"");

app.set("view engine","ejs");
app.set("views",viewPath);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const fakeCommentArray=[
    {
        name:"Navi",
        comment:"This is my comment"
    }, {
        name:"Aashi",
        comment:"This also is my comment"
    }, {
        name:"Anish",
        comment:"This too"
    }, {
        name:"Aarav",
        comment:"You got it"
    }
]

app.get("/comments",(req,res)=>{
    res.render("./comments/index",{fakeCommentArray})
})

app.get("/comments/new",(req,res)=>{
    res.render("./comments/newComment");
})

app.post("/comments",(req,res)=>{
    console.log(req.body);
    if(req.body.name && req.body.comment){
        fakeCommentArray.push({name:req.body.name,comment:req.body.comment})
    }
    res.redirect("/comments");
})

app.get("/",(req,res)=>{
    console.log(req.query);
    res.send("hello");
})

app.listen(PORT,()=>{
    console.log("Server up and running");
})
