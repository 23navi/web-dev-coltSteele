const Joi=require("joi");
const ExpressError = require("../errors/ExpressError");



//it will act as a middlewareee

const validateReviewJoiSchema=(req,res,next)=>{
    const reviewJoiSchema=Joi.object({
        review:Joi.object({
            rating:Joi.number().required(),
            body:Joi.string().required()
        }).required()
})

    const result= reviewJoiSchema.validate(req.body);


    
    if(result.error){
        const message=result.error.details.map(el=>el.message);
        throw new ExpressError(message,400)
    }else{
        next();
    }
}

module.exports=validateReviewJoiSchema;