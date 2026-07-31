import jwt from 'jsonwebtoken'

//Authenticate Doctor 
const authDoctor = async (req, res, next) => {
 console.log("ALL HEADERS:", req.headers)
    try {

      const { dtoken } = req.headers
      console.log("dtoken specifically:", dtoken)
        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized Login again" })
        }
        const token_decode = jwt.verify(dtoken, process.env.jwt_SECRET)

       // console.log("Checking the Docter ID :", req.body.docId)
        // req.docId = token_decode.id
        req.docId = token_decode.docId
        next()
    } catch (error) {
        console.log(error)
        res.status(500).
            json({ success: false, message: error.message })
    }
}



export default authDoctor