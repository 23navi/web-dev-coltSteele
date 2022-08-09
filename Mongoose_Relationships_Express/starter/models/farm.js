const mongoose= require("mongoose");

const farmSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Farm name is require"]
    },
    city:{
        type:String
    },
    email: String,
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
        }
        
    ]
});

// farmSchema.pre("findOneAndDelete",async function(){
//     await console.log(this);
// })
farmSchema.post("findOneAndDelete",async function(){
    await console.log(this);
})

const Farm = mongoose.model("Farm",farmSchema);
module.exports=Farm;
