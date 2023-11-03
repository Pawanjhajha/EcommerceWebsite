const ErrorHandler=require('../utils/errorhandler')

module.exports=async(err,req,res,next)=>{
    console.log("hii ErrorMiddleware")
    err.statusCode=err.statusCode||500,//internal server Error
    err.message=err.message||"internal serverError"

    res.status(err.statusCode).json({
        success:false,
         //error:err//ese status code jayega error me 
        //error:err.stack//ese error ki location pata lag jayegi 
        error:err.message//esme error message jayegi
    })

}