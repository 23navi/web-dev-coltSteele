const Review =require("../models/reviews");
const ExpressError= require("../../utils/errors/ExpressError");
const catchAsync=require("../../utils/errors/catchAsync");
const Campground =require("../models/campground");
const validateCampgroundJoiSchema= require("../../utils/JoiSchema/validateCampgrooundJoiSchema");
const validateReviewJoiSchema=require("../../utils/JoiSchema/validateReviewJoiSchema");



const express= require("express")
const router= express.Router();

const {isLoggedIn}=require("../../middleware/isLoggedIn")
const {isReviewAuthorized}=require("../../middleware/isReviewAuthorized");







//Delete a campground's review by it's id
router.delete("/campgrounds/:id/reviews/:revId",isLoggedIn,isReviewAuthorized,catchAsync(async(req,res,next)=>{
    const campground= await Campground.findById(req.params.id);
    const review= await Review.findById(req.params.revId);

    //Campground.findByIdAndUpdate(id,{$pull:{reviews:revId}});  // remove the value provided from the array
    //Review.findByIdAndDelete(reviewId)

    console.log("remove request: ",req.params.revId)
    console.log("remove request review selected: ",review)
    console.log("before removing: ",campground.reviews)

    campground.reviews=campground.reviews.filter((arrReview)=>{
        return arrReview.toString()!==review._id.toString()
    })

    console.log("After removing: ",campground.reviews);
    
    await campground.save()
    //r1= await Review.deleteOne({"id":review.id})
    const r2= await Review.findOneAndDelete({"_id":review._id}) //note deleteOne do not trigger a middleware so we need to use findOneAndDelete
    
    console.log("Deleted review: ",r2._id);

    req.flash("success","Successfully deleted the review");
    res.redirect("/campgrounds/"+campground.id)
}))



// submit form for reviews on a particular campground

router.post("/campgrounds/:id/reviews",isLoggedIn,validateReviewJoiSchema,catchAsync(async(req,res,next)=>{
    const campground= await Campground.findById(req.params.id);
    const review=await new Review(req.body.review)
    review.author=req.user._id;
    campground.reviews.push(review)
    await campground.save();
    await review.save();
    console.log("List of reviews when new rev is created: ",campground.reviews)
    req.flash("success","Successfully created a new review");
    res.redirect("/campgrounds/"+req.params.id);
}))



module.exports=router;