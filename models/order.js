const mongoose=require('mongoose')
const orderSchema=mongoose.Schema({
    products:[{
        type:mongoose.ObjectId,
        ref:'product'
    }],
    payment:{},
    buyer:{
        type:mongoose.ObjectId,
        ref:"user",
    },
    status:{
        type:String,
        default:'Not Proccess',
        enum:["Not Proccess","Processing","Shipped","deliverd","cancel"]
    }
},{timestamps:true})

module.exports=mongoose.model("order",orderSchema)