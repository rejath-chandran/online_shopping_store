
require('dotenv').config()
const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cookieParser = require('cookie-parser')
const app=express()
const cors = require('cors')
const user=require('../mern_com/router/user')
const product=require('../mern_com/router/product')
const PORT=3000
var visit_wt=0
var visit_dbms=0
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())

app.use('/v1',user)
app.use('/v1',product)
app.get('/lab.tar', function(req, res){
  visit_wt=visit_wt+1
  const file = `/root/mern_com/lab/lab.tar`;
  res.download(file); 
});
app.get('/dbms.tar', function(req, res){

  visit_dbms=visit_dbms+1
  const file = `/root/mern_com/lab/dbms.tar`;
  res.download(file); 
});
app.get('/count', function(req, res){
  res.json({visit_wt,visit_dbms})
});

async function run(){
   mongoose.set("strictQuery", false);
   await mongoose.connect('mongodb://127.0.0.1:27017/ecom',{
      useNewUrlParser: true
    },(err) => {
      if(err) console.log(err) 
      else {console.log("mongdb is connected");
      app.listen(PORT,()=>{console.log(`RUNNING ON http://localhost:${PORT}/`)})
   }
     })
   
   
    
   
   }

run()
