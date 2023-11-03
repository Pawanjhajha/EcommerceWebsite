const app=require('./app')
require('dotenv').config({path:'./config/.env'})

//connect to database
const connectDB=require('./config/db')
connectDB()//call the connectDb function for connect dataBase


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT} port`)
})