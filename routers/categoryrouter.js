const router=require('express').Router()
const { requireSingIn, adminAccess } = require('../middleware/authmiddleware')
const categorycontroller=require('../controllers/categorycontroller')


router.post('/create-category',requireSingIn,adminAccess,categorycontroller.crateCategory)
router.put('/update-category/:id',requireSingIn,adminAccess,categorycontroller.updateCategory)
//get allcategory
router.get('/getAllCategory',categorycontroller.getAllCategory)
//single Category
router.get('/singleCategory/:slug',categorycontroller.singleCategory)
//delete category
router.delete('/deleteCategory/:id',requireSingIn,adminAccess,categorycontroller.deleteCategory)
module.exports=router
