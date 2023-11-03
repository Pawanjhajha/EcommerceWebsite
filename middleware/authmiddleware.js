const JWT =require('jsonwebtoken')
const ErrorHandler=require('../utils/errorhandler');
const User = require('../models/user');

//Protected router token base
const requireSingIn=async(req,res,next)=>{
    try{
        //token pass in headers so req.headers
        //in 2 argument have to pass secret key
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        //pass the decode in req.user
        req.user=decode
       next()
        return decode
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler(error.message,500))
    }
}
//admin access only
const adminAccess=async(req,res,next)=>{
    try{//fetch user id
        //console.log(req.user) 
        const user =await User.findById(req.user._id)
        
        if(user.role!=="ADMIN"){
            return next (new ErrorHandler("UNAuthorized Access",401))
        }else{
            next()
        }
    }catch(error){
        return next(new ErrorHandler(error.message,500))
    }
}
module.exports= {requireSingIn,adminAccess}