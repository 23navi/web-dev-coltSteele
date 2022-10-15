const Campground= require("../src/models/campground.js")
const {cloudinary}= require("../cloudinary/index")


//show all campgrounds
module.exports.index=async (req,res)=>{
    const campgrounds= await Campground.find({});
    res.status(200).render("campgrounds/index.ejs",{campgrounds})
}


//show new campground form
module.exports.showAddPage=(req,res)=>{
    res.status(200).render("campgrounds/new.ejs");
}



//add new campground 
module.exports.addPage=async (req,res)=>{
    
    const imgArr= req.files.map(f=>({url:f.path,filename:f.filename}));
    const campground = new Campground(req.body.campground);
    campground.images=imgArr;
    campground.author= req.user._id;
    await campground.save();
    req.flash("success","Successfully created a new campground");
    res.status(200).redirect(`campgrounds/${campground.id}`);
}



//show edit form 
module.exports.showEditPage= async (req,res)=>{
    const campground= await Campground.findById(req.params.id);
    res.status(200).render("campgrounds/edit.ejs",{campground})
}


//editCamp
module.exports.editCamp=async (req,res)=>{
    let campground=await Campground.findByIdAndUpdate(req.params.id,{ ...req.body.campground });
    const images=req.files.map(f=>({url:f.path,filename:f.filename}));
    campground.images.push(...images);

    if(req.body.deleteImages){
        await campground.updateOne({$pull:{images:{filename:{$in: req.body.deleteImages}}}},{new: true})
        for(let filename of req.body.deleteImages){
            cloudinary.uploader.destroy(filename)
        }
        if(campground.images.length==req.body.deleteImages){
            console.log("heyhyy");
        }
    }
    
    await campground.save()

    req.flash("success","Successfully updated the campground");
    res.status(200).redirect(`/campgrounds/${campground.id}`);
}


// show particular campground
module.exports.showCamp=async (req,res)=>{
    const campground = await Campground.findById(req.params.id).populate(
        {  
            path:"reviews",
            populate:{
                path:"author",
            }
        }).populate("author");

    if(campground){
        res.status(200).render("campgrounds/show.ejs",{campground})
    }else{
        req.flash("error","No such campground exist");
        res.redirect("/campgrounds");
    } 
}


//delete camp
module.exports.deleteCamp=async (req,res)=>{
    const campground =await Campground.findByIdAndDelete(req.params.id);

    for(let image of campground.images){
        cloudinary.uploader.destroy(image.filename);
    }

    req.flash("success","Successfully deleted the campground");
    res.redirect("/campgrounds");
}
