const { default: mongoose } = require("mongoose");

require("../mongoose");



const productSchema= mongoose.Schema({
    name:String,
    price:Number,

})

const shopSchema= new mongoose.Schema({
    name:String,
    location:String,
    products:[{type: mongoose.Schema.Types.ObjectId, ref:"Product"}]
})

const Product= mongoose.model("Product",productSchema);
const Shop= mongoose.model("Shop",shopSchema);

// const prod1=new Product({
//     name:"Lichi",
//     price:50
// })
// prod1.save()

const makeFarm=async()=>{
    const prod=await Product.find({name:"Apple"})

    const shop1= new Shop({
        name:"Navi Shop",
        location:"Surat"
    })

    shop1.products.push(prod[0].id)
    // shop1.save()
    console.log(shop1);
    

}

makeFarm()
