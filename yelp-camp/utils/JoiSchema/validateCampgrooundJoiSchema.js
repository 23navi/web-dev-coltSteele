const Joi=require("joi");
const ExpressError = require("../errors/ExpressError");

const validateCampgroundJoiSchema=(req,res,next)=>{
    const CampgroundJoiSchema=Joi.object({
        campground:Joi.object({
            title:Joi.string().required(),
            price:Joi.number().required(),
            location: Joi.string().required(),
            description: Joi.string().required(),
            //image:Joi.string()
        }).required(),
        deleteImages:Joi.array()
})

const result= CampgroundJoiSchema.validate(req.body);


if(result.error){
    const message=result.error.details.map(el=>el.message);
    throw new ExpressError(message,400)
}else{
    next();
}
}

module.exports=validateCampgroundJoiSchema;