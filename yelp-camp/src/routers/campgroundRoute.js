const catchAsync=require("../../utils/errors/catchAsync");
const validateCampgroundJoiSchema= require("../../utils/JoiSchema/validateCampgrooundJoiSchema");


const {storage}= require("../../cloudinary/index");
const multer= require("multer");
// const imgUpl= multer({dest:"navi"});
const imgUpl= multer({storage});


const {isLoggedIn}= require("../../middleware/isLoggedIn.js")

const campgroundController=require("../../controller/campgroundCotroller");

const express= require("express")
const router= express.Router();

const {isAuthorized}=require("../../middleware/isAuthorized"); // as we did module.exports.isAuthorized... it will come as an obj ... not just a variable...


router.route("/campgrounds")
    .get(catchAsync(campgroundController.index))
    .post(isLoggedIn,imgUpl.array("img"),validateCampgroundJoiSchema,catchAsync(campgroundController.addPage))


router.get("/campgrounds/new",isLoggedIn,campgroundController.showAddPage);


router.get("/campgrounds/:id/edit",isLoggedIn,isAuthorized,catchAsync(campgroundController.showEditPage))


router.route("/campgrounds/:id")
    .get(catchAsync(campgroundController.showCamp))
    .delete(isLoggedIn,isAuthorized,catchAsync(campgroundController.deleteCamp))
    .put(isLoggedIn,isAuthorized,imgUpl.array('img'),validateCampgroundJoiSchema,catchAsync(campgroundController.editCamp))



module.exports=router;