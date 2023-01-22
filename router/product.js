const express=require('express')
const router=express.Router()
const {CreateProduct}=require("../controller/product")
router.get("/product",CreateProduct)
module.exports=router