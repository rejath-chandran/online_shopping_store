const express=require('express')
const router=express.Router()
const { signin,login }=require('../controller/auth')

router.post("/signin",signin)
router.post("/login",login)

module.exports=router