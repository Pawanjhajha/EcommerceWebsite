const mongoose=require('mongoose')

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log(`connect to MONGODB database server ${conn.connection.host}`)
    }catch(error){
        console.log(error.message)
    }
}
module.exports=connectDB