const ExpressError= require("../../utils/errors/ExpressError");
const catchAsync=require("../../utils/errors/catchAsync");
const validateUserRegisterJoiSchema= require("../../utils/JoiSchema/validateUserRegisterJoiSchema");
const validateUserLoginJoiSchema=require("../../utils/JoiSchema/validateUserLoginJoiSchema");
const User= require("../models/users")
const express= require("express")
const router= express.Router();
const passport=require("passport")



router.get("/register",(req,res,next)=>{
    res.render("users/register.ejs");
})

router.post("/register",validateUserRegisterJoiSchema,catchAsync(async(req,res,next)=>{
    const {email,password,username}= req.body;
    const user=await new User({email,username})
    const newUser= await User.register(user,password)  // not User.register also calles .save on created user

    req.login(newUser,(err)=>{
        if(err){ return next(err)}
        req.flash("success",`Welcome ${newUser.username}` );
        res.redirect("/campgrounds");
    })
    
}))



router.get("/login",(req,res,next)=>{
    res.render("users/login.ejs");
})

router.post("/login",validateUserLoginJoiSchema,passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),catchAsync(async(req,res,next)=>{
    // this block will only run if the user was successfully logged in ... everything is taken care by passport
    req.flash("success","Welcome back "+`${req.body.username}`);
    const returnTo= req.session.returnTo || "/campgrounds";
    res.redirect(returnTo);
}))


router.get("/logout",(req,res,next)=>{
    req.logOut(()=>{});
    req.flash("success","Successfully logged out");
    res.redirect("/campgrounds");
})

module.exports= router;