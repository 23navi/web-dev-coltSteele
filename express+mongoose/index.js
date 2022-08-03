const express = require("express");
const { default: mongoose } = require("mongoose");
const path= require("path");
const Product = require("./models/products");
require("./src/mongoose");
const methodoverride=require("method-override");



const app= express();
const PORT = process.env.PORT || 3000;

app.set("views",path.join(__dirname,"views"));
app.set("view engine",'ejs');
app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.json());

const categories = ['fruit', 'vegetable', 'dairy'];

app.get("",(req,res)=>{
    res.send("hello");
})


//products
app.get("/products",async (req,res)=>{
    const category=req.query.category;
    if(category){
        const products= await Product.find({category});
        res.render('products/index',{products,category});
    }else{
        const products= await Product.find({});
        res.render('products/index',{products,category:"All"});
    }
    
})


//new product form
app.get('/products/new',(req,res)=>{
    res.status(200).render('products/new.ejs',{categories})
})

app.get("/products/edit/:id",async (req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        res.status(404).send("product not found with given id");
    }
    console.log(product);
    res.status(200).render('products/edit.ejs',{product,categories});
})



//products/:id

app.get("/products/:id",async (req,res)=>{
    const product= await Product.findById(req.params.id);
    if(!product){
        res.status(404).send("Product not found")
    }
    res.status(200).render('products/show.ejs',{product});
})




//new product post
app.post("/products",async (req,res)=>{
    console.log(req.body);
    const product = new Product(req.body);
    await product.save()
    res.redirect(`products/${product.id}`);
})
//we will have to use express middleware to get the form value 
// in the req ... by default the values we will get will be empty
// app.use(express.urlencoded{extended:true})





//edit the product detailss
app.put("/products/:id",async(req,res)=>{
    const product=await Product.findById(req.params.id);
    console.log(product)

    product.name=req.body.name;
    product.price=req.body.price;
    product.category=req.body.category;
    await product.save()

    res.redirect(`/products/${product.id}`);
})



app.delete("/products/:id",async (req,res)=>{
    
    const prod= await Product.findByIdAndDelete(req.params.id);
    if(prod){
        res.redirect("/products");
    }else{
        res.status(404).send("product not found");
    }
    
})




app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})