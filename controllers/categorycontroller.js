const Category = require('../models/Category')
const ErrorHandler = require('../utils/errorhandler')
//slugify add - at place of space
const slugify = require('slugify')
exports.crateCategory = async (req, res, next) => {
   
    try {
        const { categoryName } = req.body
        //check category
        const existingCategory = await Category.findOne({ name: categoryName })
        if (existingCategory != null) {
            return next(new ErrorHandler('Category is already exits', 400))
        } else {
            const category = await Category.create({ name: categoryName, slug: slugify(categoryName) })
            res.status(201).json({
                success: true,
                message: 'Category is successfully Created',
                category
            })
        }
    } catch (error) {
        console.log(error.message)
        return next(new ErrorHandler(error.message, 400))
    }
}
//updateCategory
exports.updateCategory = async (req, res, next) => {
   
    try{
         const {categoryName} =req.body
         const id=req.params.id
         const category=await Category.findByIdAndUpdate(id,{name:categoryName,slug:slugify(categoryName)},{new:true})//{new:true} it will update the category as new
         res.status(200).json({
             success:true,
             message:"category Updated Successfully",
             category
         })
     }catch(error){
         console.log(error.message)
         return next(new ErrorHandler(error.message,500))
     }
}
//get all categpry
exports.getAllCategory = async (req, res, next) => {
    try {
        const category = await Category.find()
        res.status(200).json({
            success: true,
            message: "All category List",
            category
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}
//single category
exports.singleCategory = async (req, res, next) => {
    try {
        const slug = req.params.slug
        const singleCategory = await Category.findOne({ slug })
        res.status(200).json({
            success:true,
            message:'Get single category  Successfully',
            singleCategory
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}
//delete Category
exports.deleteCategory=async(req,res,next)=>{
    
    try{
        const  id=req.params.id
        const category=await Category.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"Category has been deleted"
        })
    }catch(error){
        return next (new ErrorHandler(error.message,500))
    }
}
