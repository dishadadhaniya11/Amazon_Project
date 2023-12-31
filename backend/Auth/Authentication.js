import jwt from "jsonwebtoken"

class AuthController {

    async createOrderAuth(req,res,next){
        try {
            const {token} = req.headers
            if(!token) return res.status(401).send({message:"unauthorized"})
            return jwt.verify(token,process.env.JWT_SECRATE,(err,data) => {
                
                if(data){
                    req.body.userInfo = data
                    return next()
                }
                if(err){
                    return res.status(401).send({message:"Unauthorized"})
                }
            })
        } catch (error) {
            return res.status(500).send({message:"Internal server error"})
        }
    }
}

const Authentication = new AuthController()

export default Authentication;