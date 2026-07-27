import jwt from 'Jsonwebtoken'

//admin authentication webtocken

const authAdmin = async(req,res,next) =>{
    try{
const {atoken} = req.headers
if(!atoken){
   return  res.json({success :false,message:"Not Authorized Login again"})

}
const token_decode =jwt.verify(atoken,process.env.jwt_SECRET)
if(token_decode != process.env.Admin_email + process.env.Admin_pass){
    return  res.json({success :false,message:"Not Authorized Login again"})
}

next()

    }catch(error){
        console.log(error)
        res.status(500).
        json({ success: false, message: error.message })
    }
}

export default authAdmin