const { compareSync } = require('bcrypt')
const Product = require('../models/Product')
const Order=require('../models/order')
const ErrorHandler = require('../utils/errorhandler')
const slugify = require('slugify')

var braintree = require("braintree");  

//payment gate way intigration
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId:"zdjj66xk8pqy6pgr",
    publicKey:"4npcpvzgyrwsy8v9" ,
    privateKey: "24a7c7d32bed5e6d35d17020b76c8455",
  });

exports.createProduct = async (req, res, next) => {

    try {
        const { name, description, price, category, Quantity, shipping } = req.body


        if (req.file) {
            const filename = req.file.filename

            //console.log(filename)
            var products = await Product.create({ name, description, price, category, quantiy: Quantity, shipping, slug: slugify(name), photo: filename })
        } else {

            var products = await Product.create({ name, description, price, category, quantiy: Quantity, shipping, slug: slugify(name) })
        }
        //console.log(products)
        res.status(201).json({
            success: true,
            message: "Product has been Successfully created",
            products
        })
    } catch (error) {
        console.log(error.message)
        return next(new ErrorHandler(error.message, 500))
    }
}
//get allProduct
exports.getallproduct = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category').limit(12).sort({ createdAt: -1 })
        //console.log(products)
        res.status(200).json({
            success: true,
            total: products.length,//it will give the total product count
            message: "All Products",
            products,
            total: products.length//it will give the total product count
        })
    } catch (error) {
        console.log(error.message)
        return next(new ErrorHandler(error.message, 400))
    }
}
exports.singleproduct = async (req, res, next) => {
    const id = req.params.id

    try {
        const product = await Product.findById(id).populate('category')
        //console.log(product)
        res.status(200).json({
            success: true,
            message: "Single producted Fetched",
            product
        })
    } catch (error) {
        console.log(error.message)
        return next(new ErrorHandler(error.message, 400))
    }

}
//delete product
exports.deleteproduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Product has been deleted"
        })
    } catch (error) {
        console.log(error.message)
        return next(new ErrorHandler(error.message, 400))
    }
}
//update product
exports.updateproduct = async (req, res, next) => {
    try {
        const { name, category, quantiy, description, price } = req.body
        //console.log(category)
        const id = req.params.id
        if (req.file) {
            const filename = req.file.filename
            var product = await Product.findByIdAndUpdate(id, { name: name, category: category, quantiy: quantiy, price: price, description: description, photo: filename, slug: slugify(name) }, { new: true })
        } else {
            var product = await Product.findByIdAndUpdate(id, { name: name, category: category, quantiy: quantiy, price: price, description: description, slug: slugify(name) }, { new: true })
        }
        res.status(200).json({
            success: true,
            message: "Product has been Succefully updated",
            product
        })
    } catch (error) {
        console.log(error.message)
        return next(new ErrorHandler(error.message, 400))
    }
}
//product filter
exports.productFilter = async (req, res, next) => {
    const { checked, radio } = req.body
    //console.log(checked,radio)
    try {
        const { checked, radio } = req.body
        //query  for checked or radio
        let arg = {}
        if (checked.length > 0) {//if category check then checked.length value will be grater than 0
            arg.category = checked
        }
        if (radio.length) {//radio has maximum length 1
            arg.price = { $gte: radio[0], $lte: radio[1] }//it is mongodb validatiaon
        }
        //console.log(arg)
        //send request to mongodb
        const products = await Product.find(arg)
        //console.log(products)
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error.message)
        return next(new ErrorHandler(error.message, 400))
    }
}
//proudct count
exports.proudctcount = async (req, res, next) => {
    try {
        //create pagination
        const total = await Product.find({}).estimatedDocumentCount()//estimatedDocumentCount() mentod return all document count
       
        res.status(200).json({
            success: true,
            total,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}
//proudct per page
exports.productperpage = async (req, res, next) => {
    try {
        const perPage = 3 //set perpage value
        const page = req.params.page ? req.params.page : 1 //if req.params.page dont recevie any value then default value is 1 assign
        const products = await Product.find({}).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).json({
            success:true,
            products
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}
//search prouduct
exports.searchproduct=async(req,res,next)=>{
    try{
        const keyword=req.params.keyword
        
        const result=await Product.find({
            $or:[//it will show product according name or desctription
                {name:{$regex :keyword,$options:"i"}},// options:"i" means case insensitive
                {description:{$regex:keyword,$options:"i"}}
        ]
        })
        res.status(200).json({
            success:true,
            result 
        })
    }catch(error){
        return next(new ErrorHandler(error.message,500))
    }
}
//similar product 
exports.similarproduct=async(req,res,next)=>{
    const categoryid=req.params.cid
    const productid=req.params.productid

    try{
        const products=await Product.find({
            category:categoryid,
            _id:{$ne:productid},//search product we dont show in similar product so we remove that product
        }).limit(3).populate('category')//populate means kis ke base par product show karane h 
        res.status(200).json({
            success:true,
            products
        })
    }catch(error){
        console.log(error.message)
        return next(new ErrorHandler(error.message,500))
    }
}
//braintree token 
exports.braintreetoken=async(req,res)=>{
    try{
        //get token
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).json({
                    err
                })
            }else{
                res.send(response)
            }
        })
    }catch(error){
        console.log(error.message)
    }

}
//brainetree payment
exports.brainetreepayment=async(req,res)=>{
    try{
        //get somew details form user
        const {cart,nonce}=req.body
        let total=0
        cart.map((i)=>{total+=i.price});
        let newTransaction=gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },
        function(error,result){
            if(result){
                const order=new Order({
                    products:cart,
                    payment:result,
                    buyer:req.user._id
                }).save()
                res.json({ok:true})
            }else{
                res.status(500).json({
                    error
                })
            }
        }
        )
      
       
    }catch(error){
        console.log(error.message)
    }

}
