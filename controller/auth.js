const User=require("../models/user")

const { expressjwt } = require("express-jwt")

const jwt = require('jsonwebtoken')

exports.signin=async(req,res)=>{
    
   
    const u=new User(req.body)
    u.save()
    .then(()=>{return res.status(200).send(u)})
    .catch((err)=>{   return res.status(400).json({error:"not saved"})})
    
}

exports.login=async (req, res) => {

   
      
      try {
        const u=await User.findOne({email:req.body.email})
        if(u.auth(req.body.password)){
  
  
          //created token jwt
          const token=jwt.sign({_id:u._id},process.env.SECRET)
  
          //put token in cookie
          res.cookie("token",token,{expire: new Date() + 999})
  
          return res.status(200).json({
            name:u.firstname,
            email:u.email,
            token
          })
        }
        else{
          return res.status(400).json({error:"email or password not matching"})
        }
  
      } catch (error) {
        return res.status(400).json({error:"email or password not matching"})
      }
  }