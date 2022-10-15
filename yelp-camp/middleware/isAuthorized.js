// Middleware to check if the user is authorized to make changes 

const Campground= require("../src/models/campground");

module.exports.isAuthorized = async(req,res,next)=>{

    const {id}= req.params;
    const campground= await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash("error","You are not authorized")
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}