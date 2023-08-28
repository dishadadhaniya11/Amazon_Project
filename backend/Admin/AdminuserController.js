
import adminUserModel from "./AdminuserModel.js"
import Validation from "./admin_validation.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

class AdminUserController {

   async insertUser(req,res){

        try {
            // const { fullName , email , role, password} = req.body
            // if(!fullName) return res.status(500).send({message:"Missing dependancy FullName of Admin-user"})
            // if(!email) return res.status(500).send({message:"Missing dependancy Email of Admin-user"})
            // if(!role) return res.status(500).send({message:"Missing dependancy Role of Admin-user"})
            // if(!password) return res.status(500).send({message:"Missing dependancy Password of Admin-user"})

            const validationResult = Validation(req.body,"adduser")
            if(validationResult.lenght > 0){
              return res.status(400).send({message:"validation error",validationResult:validationResult})
            }

            const {password} = req.body
            const EncodePassword = bcrypt.hashSync(password, 8)
            if(!EncodePassword){
              return res.status(500).send({message:"Something went wrong password"})
            }
            req.body.password = EncodePassword

            const result = await adminUserModel.create(req.body)
            delete result.password
            console.log(result);
          
            if(!result) {
              return res.status(400).send({message:"Something went wrong"})
            } else {
              return res.status(200).send({message:"Success",user:result})
            }
           

           
        } catch (error) {
            console.log(error);
            return res.status(500).send({message:"Internal server error"})
        }
    }

    async getUser(req, res) {

        try {
          const result = await adminUserModel.find({})
          if (result)  return res.status(200).send({ message: "success", user: result })
          return res.status(500).send({ message: "something went wrong" })
    
        } catch (error) {
          console.log(error);
          return res.status(500).send({ message: "internal server error" })
        }
      }

      async loginUser(req,res){
        try {
          const {email,password} = req.body
          const validationResult = Validation(req.body,"login")

          if(validationResult.length > 0){
            return res.status(400).send({message:"Validation Error", validationResult:validationResult})
          }

          const result = await adminUserModel.findOne({email:email})

          if(!result){
            return res.status(400).send({message:"Validation error",validationResult:[{key:"email",message:"Email not found"}]})
          }
          const user = result._doc

          if(!(bcrypt.compareSync(password,user.password))){
            return res.status(400).send({message:"Validation error",validationResult:[{key:"password",message:"Password are not match"}]})
          }
          delete user.password
          const  token = jwt.sign({...user},process.env.JWT_SECRATE,{expiresIn:"30d"})

          if(!token){
            return res.status(500).send({message:"Something went wrong"})
          }
          return res.status(200).send({message:"Success",user : {...user,token:token}})
        } catch (error) {
          console.log(error);
          return res.status(500).send({message:"Internal server error"})

        }
      }

      async deleteUser (req,res){
        try {
          const result = await adminUserModel.deleteOne({_id:req.params.id})
        if(result) return res.status(200).send({message:"Success"})

        return res.status(400).send({message:"Something went wrong"})
        } catch (error) {
          console.log(error);
          return res.status(500).send({message:"Internal server error"})
        }
      }

      async upadteUser (req,res){
        try {
          const id = req.params.id
          const body = req.body

          const result = await adminUserModel.updateOne({_id:id},body)
          if(result.modifiedCount > 0 || result.matchedCount > 0){
            return res.status(200).send({message:"Success"})
          }
          return res.status(400).send({message:"Something went wrong"})
        } catch (error) {
          console.log(error);
          return res.status(500).send({message:"Internal server error"})
        }
      }
}

const adminUserController = new AdminUserController()

export default adminUserController