const mongoose=require("mongoose")

const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const crypto = require('node:crypto')


const UserSchema = new Schema({
  firstname:{
      type:String,
      maxlength:20,
      trim:true
  },
  lastname:{
      type:String,
      maxlength:20,
      trim:true
  },
  email:{
      type:String,
      trim:true,
      unique:true,
      required:true
  },
  password:{
      type:String,
      required:true
  },
  salt:String,
  role:{
      type:Number,
      default:0
  },
  purchase:{
      type:Array,
      default:[]
  },
  
},{ timestamps:true})

UserSchema.virtual("userpassword")
.set(function(plainpass){
    this.salt=uuidv4()
    this.password=this.Securepass(plainpass)
})

UserSchema.method({

    auth:function(plainpass){
        return  this.Securepass(plainpass)===this.password
      },

    Securepass:function (plainpass){
        if(!plainpass) return ''
        try{
           return crypto.createHmac('sha256',this.salt)
               .update(plainpass)
               .digest('hex')
        }catch (err){
                return ''
        }
    }




})


module.exports=mongoose.model('user',UserSchema)
