const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the Product name"]
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:[true,"please enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"please enter Product Price"]
    },
    category:{
        type:mongoose.ObjectId,//add productcategory id from category collection,
        ref:'category',
        required:[true,"please add product category"]
    },
    quantiy:{
        type:Number,
        required:[true,"please enter Product Quantity"]
    },
    photo:{
        type:String,
        required:[true,"Please enter the photo"]
    },
    shipping:{
        type:String,
        default:'IN-Stock'
    }
},{timestamps:true})
module.exports=mongoose.model('product',productSchema)