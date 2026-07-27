import jwt from 'Jsonwebtoken'

//User authentication webtocken

const authUser = async(req,res,next) =>{
    try{
const {token} = req.headers
if(!token){
   return  res.json({success :false,message:"Not Authorized Login again"})

}
const token_decode =jwt.verify(token,process.env.jwt_SECRET)
req.body = req.body || {} 
req.body.userId = token_decode.id






next()

    }catch(error){
        console.log(error)
        res.status(500).
        json({ success: false, message: error.message })
    }
}

export default authUser