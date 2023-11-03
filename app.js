const express=require('express')
const app=express()
//call cors origin policy package
const cors=require('cors')
//enable the json data into express
app.use(express.json())
//call the user router
const userrouter=require('./routers/userrouter')
//call the category router
const categoryrouter=require('./routers/categoryrouter')
//call the product router
const productrouter=require('./routers/productrouter')
//error handler middleware import
const errorMiddleware=require('./middleware/error')

//reference of corss origin poicy
app.use(cors())
//refermce of userrputer
app.use('/api/v1/user',userrouter)
//refernece of categoery router
app.use('/api/v1/category',categoryrouter)
//refernce of product router
app.use('/api/v1/product',productrouter)
//Error handler refernce
app.use(errorMiddleware)
module.exports=app