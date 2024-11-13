import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next)=>{
    // through this , we will decode the token
    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message:"Not Authorized, Login again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        console.log("userid",req.body.userId)
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleware;