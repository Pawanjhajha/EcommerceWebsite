const mongoose=require('mongoose')
const validator=require('validator')//it is use to validate 

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name"],
        trime:true
    },
    email:{
        type:String,
        required:[true,"please enter the email"],
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        select:false//means when admin show the all user then password field will not show to admin
    },
    number:{
        type:String,
        required:[true,"please enter mobile no"]
    },
    address:{
        type:{},//because we use teh text area so it will not take into string so we have to take as a boject
        required:[true,"please enter address"]
    },
    answer:{
        type:String,
        required:[true,"answer is required"]
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true})//timestamps:true mean when new user add then that time will be auto matically 


module.exports=mongoose.model("user",userSchema)