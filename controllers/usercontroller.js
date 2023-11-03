const User=require('../models/user')
const ErrorHandler=require('../utils/errorhandler')
const {comparePassword,convetrdpassword} =require('../helper/authentication')

const JWT=require('jsonwebtoken')//call the jsonwebtoken package

//registraion user
exports.registration=async(req,res,next)=>{
    
    try{
        
        const {name,email,password,number,address,answer}  =req.body
        //existing user
        const record=await User.findOne({email:email})
        if(record===null){
            const hashPassword= await convetrdpassword(password)//await means when till converted pass copmlitly run compire will  wait on that line
            //user save in db table use create method to run table schem validation
            const user =await User.create({name,email,password:hashPassword,address,number,answer:answer})
            
            //response
            res.status(201).json({
                success:true,
                message:"User successfully registered",
                user
            })
        }else{
            return next(new ErrorHandler("Email id is alredy taken ",400)) 
        }
    }catch(error){
        console.log(error.message)
       return next(new ErrorHandler(error.message,400))
    }
}

//Login 
exports.login=async(req,res,next)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return next(new ErrorHandler("please enter Email or Passard",400))
        }
        const record=await User.findOne({email}).select("+password")
        //select("+password") it is allow to fetch password 
        //console.log(record)
        //check user exits or not
        if(record===null){
            return next(new ErrorHandler("Email not found",201))
        }else{
            const cpass=await comparePassword(password,record.password)
            if(!cpass){//if password dont match
                return next(new ErrorHandler("Wrong Email and Password",400))
            }else{
                //create token
                //1argument genarate token base of user id
                //2argument pass Secret key
                //3 argument pass expire date of token
                const token = JWT.sign({_id:record._id},process.env.JWT_SECRET,{expiresIn:'7d'})
                const {name,email,address,_id,number,role}=record
                const user ={_id,name,email,address,number,role}
                res.status(200).json({
                    success:true,
                    message:"login successfully",
                    token,
                    user,
                })
               
            }
        }
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler(error.message,400))
    }
}

exports.userauth=async(req,res,next)=>{
    try{
        res.status(200).json({ok:true});
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler(error.message,500))
    }

}
//forgot Password
exports.forgotpassword=async(req,res,next)=>{
    try{
        const {email,answer,newPassword}=req.body
        //check email or password
        const user=await User.findOne({email:email,answer:answer})
        //validation 
        if(user==null){
            return next(new ErrorHandler('Email and answer not found',404))
        }else{
            const hashPassword= await convetrdpassword(newPassword)
            await User.findByIdAndUpdate(user._id,{password:hashPassword})
            res.status(200).json({
                success:true,
                message:'Password Reset Successfully'
            })
        }
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler(error.message,500))
    }
}
exports.adminauth=async(req,res,next)=>{
    try{
        res.status(200).json({ok:true})
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler(error.message,500))
    }
}
//update user
exports.updateuser=async(req,res,next)=>{
    try{
        const {name,number,address,email,password}=req.body
        const id=req.params.id
        
        if(password){
            const hashPassword= await convetrdpassword(password)
            var user=await User.findByIdAndUpdate(id,{name:name,number:number,address:address,email:email,password:hashPassword},{ new: true }).select("+password")
            
            res.status(200).json({
                success:true,
                message:'User has been updated',
                user
            })
        }else{
            var user=await User.findByIdAndUpdate(id,{name:name,number:number,address:address,email:email},{ new: true })
          
            res.status(200).json({
                success:true,
                message:'User has been updated',
                user
            })
        }
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler(error.message,400))
    }
}