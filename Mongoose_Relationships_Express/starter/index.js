const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const Product = require('./models/product');
const Farm = require("./models/farm");

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    console.log("this is called");
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        console.log(products);
        console.log("is this working?");
        res.render('products/index', { products, category: 'All' })

    }
})



app.get("/farms",async(req,res,next)=>{
    const farms= await(Farm.find({}));
    res.render("farms/index",{farms})
})



//render form 
app.get("/farms/new",(req,res,next)=>{
    res.render("farms/new");
})

//accept form 
app.post("/farms",async(req,res,next)=>{

    const farm = await Farm(req.body).save();
    res.redirect("/farms")
})


//show page for farm
app.get("/farms/:id",async(req,res,next)=>{
    const farm=await Farm.findById(req.params.id).populate("products");
    res.render("farms/show",{farm});
})

app.get("/farms/:id/products/new",async(req,res)=>{
    const farm = await Farm.findById(req.params.id);
    res.render('products/new', { farm,categories })
})

app.post("/farms/:id/products",async(req,res,next)=>{
    const farm = await Farm.findById(req.params.id)
    const product= await new Product(req.body);
    product.farm=farm;
    farm.products.push(product);
    farm.save();
    product.save();
    console.log("/farms/"+farm.id)
    res.redirect("/farms/"+farm.id);
})


app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct.id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


app.delete("/farms/:id",async (req,res,next)=>{
    const farm=await Farm.findByIdAndDelete(req.params.id);
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})


