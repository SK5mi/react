const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const app =express();
const path = require('path');
const bcrypt = require('bcrypt');

app.use(cookieParser());
app.use(express.json());

app.get("/", function(req,res){

   bcrypt.genSalt(10,function(err,salt){       //this create a salt at 10 round 
    bcrypt.hash("mishraJI",salt,function(err,hash){   //create a hash of the passwordd 
        console.log(hash);     //printing the hassed password
        res.cookie("hassed",hash)
    })
    
   })
   
})


app.get("/home",function(req,res){ //Compare  the  hashed password 
    bcrypt.compare('mishraJI',"$2b$10$u3s4KRLivKyUNBrMqxlT3OT28.JPIA.fO2q7w3NG8kM5pinsez3yq",function(err,result){
    console.log(result)
    res.send("Encryption to ho gya")
    })
})


app.get("/jwt",function(req,res){
  let token =  jwt.sign({email:"Yukti@VECV.in"} ,"Satyam")
  console.log("Printing JWT Token")
  console.log(token)
  res.cookie("JWTtoken",token)
  res.send("Token send For JWT")
})


app.get("/read",function(req,res){
    let data = jwt.verify(req.cookies.JWTtoken,"Satyam");
    res.send("Printing encrypted data");
    console.log(data);
})

app.listen(3000);


//jsonwebtoken   bcrypt cookie-parser    HSA256 algorithm


//We can not dcrypt password but for sure we can compare its hashed or encrypted password

// encrypted for satyam :- $2b$10$u3s4KRLivKyUNBrMqxlT3OT28.JPIA.fO2q7w3NG8kM5pinsez3yq

//JWT is made up of three things HSA256,Payload(which is actual a data) , Our Secreat Signature
//For using JWT we have to import this and then use jwt sign