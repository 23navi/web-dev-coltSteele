module.exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }else{
        req.session.returnTo= req.originalUrl;
        req.flash("error","You need to login first");
        res.redirect("/login");
    }
}