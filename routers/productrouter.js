const { requireSingIn, adminAccess } = require('../middleware/authmiddleware')
const productcontroller=require('../controllers/productcontroller')
const multer=require('multer')

const router=require('express').Router()
//setup the multer
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./client/public/upload")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
let upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*4}
})

//routes
router.post('/createproduct',requireSingIn,adminAccess,upload.single('photo'),productcontroller.createProduct)
router.get('/get-allproduct',productcontroller.getallproduct)
router.get('/get-singleproduct/:id',productcontroller.singleproduct)
router.delete('/deleteproduct/:id',requireSingIn,adminAccess,productcontroller.deleteproduct)
router.put('/updateproduct/:id',requireSingIn,adminAccess,upload.single('photo'),productcontroller.updateproduct)
//filter product
router.post('/productfilters',productcontroller.productFilter)
//product count
router.get('/productcount',productcontroller.proudctcount)
//product per page
router.get('/productperpage/:page',productcontroller.productperpage)
//search product
router.get('/searchproduct/:keyword',productcontroller.searchproduct)
//similar product 
router.get('/similarproduct/:cid/:productid',productcontroller.similarproduct)
//payments routes
//get token 
router.get('/braintree/token',productcontroller.braintreetoken)
//payments 
router.post('/braintree/payment',requireSingIn,productcontroller.brainetreepayment)
module.exports=router