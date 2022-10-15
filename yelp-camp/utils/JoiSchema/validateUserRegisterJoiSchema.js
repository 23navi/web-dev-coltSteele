const Joi=require("joi");
const ExpressError = require("../errors/ExpressError");

const validateUserRegisterJoiSchema=(req,res,next)=>{
    const UserJoiSchema=Joi.object({
            username:Joi.string().required(),
            email:Joi.string().required(),
            password: Joi.string().required(),
            
})

const result= UserJoiSchema.validate(req.body);


if(result.error){
    const message=result.error.details.map(el=>el.message);
    throw new ExpressError(message,400)
}else{
    next();
}
}

module.exports=validateUserRegisterJoiSchema;