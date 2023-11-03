const bcrypt=require('bcrypt')


const convetrdpassword=async(password)=>{
    try{
        const solt=10
        const hashPassword=await bcrypt.hash(password,solt)
        return hashPassword;
    }catch(error){
        console.log(error)
    }
}
const comparePassword=async(password,dbPassword)=>{
    try{
       
        const cpass=await bcrypt.compare(password,dbPassword)
        return cpass
    }catch(error){
        console.log(error)
    }
}
module.exports={convetrdpassword,comparePassword}