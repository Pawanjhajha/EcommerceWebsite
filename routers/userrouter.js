const router=require('express').Router()
const usercontroller=require('../controllers/usercontroller')
const  {requireSingIn,adminAccess}=require('../middleware/authmiddleware')

router.post('/registration',usercontroller.registration)
router.post('/login',usercontroller.login)
//forgot password
router.post('/forgotpassword',usercontroller.forgotpassword)
//protected router for user
router.get('/user-auth',requireSingIn,usercontroller.userauth)
//protected router for admin
router.get('/admin-auth',requireSingIn,adminAccess,usercontroller.adminauth)
//UPDATE user 
router.put('/userupdate/:id',requireSingIn,usercontroller.updateuser)

module.exports=router