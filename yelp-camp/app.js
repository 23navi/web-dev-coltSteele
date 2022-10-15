if(process.env.NODE_ENV !=="production"){
    require('dotenv').config();
}3


const express = require("express");
const path= require("path");
const ejsMate = require('ejs-mate');
const methodoverride=require("method-override");
const ExpressError= require("./utils/errors/ExpressError");
const catchAsync=require("./utils/errors/catchAsync");
const session = require("express-session");
const flash = require("connect-flash");





const User= require("./src/models/users")


// no need for passport-local-mongoose
const passport=require("passport")
const localStrategy= require("passport-local")


//routers
const campgroundRouter=require("./src/routers/campgroundRoute");
const reviewRouter=require("./src/routers/reviewsRoute");
const userRouter=require("./src/routers/userRouter");

require("./src/db/mongoose"); 

const app= express();
const PORT = process.env.PORT;


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



app.use(express.urlencoded({extended:true})); //for post request 
app.use(methodoverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());





const sessionConfig={
    secret:"secret_string",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+ 1000*60*60*24*7,   //7 days
        maxAge: 1000*60*60*24*7, //7 days
        HttpOnly:true      , //google search what is does

    }
}
app.use(session(sessionConfig))
app.use(flash());


//define passport middleware after defining express session

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{
    res.locals.currentUser= req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

app.use(campgroundRouter); // we are not changing the route like colt steele
app.use(reviewRouter);
app.use(userRouter);





app.get("/",async(req,res)=>{
    res.render("home");
})


app.all("*",(req,res,next)=>{
    return next(new ExpressError("Page not found",404));
})



app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})




