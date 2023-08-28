import userModel from "./UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Validation from "./Validation.js";

class UserController {
  
    // async addUser(req, res) {
    //     try {
            
    //         let { firstName, lastName, email, password, isAdmin } = req.body
            
    //         password = bcrypt.hashSync(password, 8)
    //         //   console.log(password);
            
    //         const result = await userModel.create({ firstName, lastName, email, password, isAdmin: isAdmin || false })
    //         if (result) return res.status(200).send({ message: "success", result: result })
            
    //         console.log(error);
    //         return res.status(500).send({ message: "something went wrong" })
            
    //     } catch (error) {
    //         console.log(error);
    //         if (error.message.includes("E11000")) {
    //             return res.status(500).send({ message: "Emai already exist" })
    //         }
    //         return res.status(500).send({ message: "internal server error" })
    //     }
    // }


//   validate(data,type){
//     let error = []
//     const register = "register"
//     if(type === register){
//         if(!(data.firstName)){
//             error.push({key:"firstName",message:"please enter firstname"})
//         }
//         if(!(data.lastName)){
//             error.push({key:"lastName",message:"please enter lastname"})
//         }
//         if(!(data.email)){
//             error.push({key:"email",message:"please enter email"})
//         }
//         else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))){
//             error.push({key:"email",message:"Invalid emil"})
//         }

//         if(!(data.password)){
//             error.push({key:"password",message:"please enter your password"})
//         }
//         else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(data.password))){
//             error.push({key:"email",message:"Password must be atleast 8 characters,One character is Capital"})
//         }
//     }
//     return error

//   }

    async RegisterUser(req,res){
        try {
            const validationResult =Validation(req.body, "register")
            if(validationResult.length > 0){
                return res.status(400).send({message:"validation error", validationResult:validationResult})
            }
            
            const { password} = req.body
            const EncodePassword = bcrypt.hashSync(password, 8)
            if(! EncodePassword){
                return res.status(500).send({message:"something went wrong"})
            }

            req.body.password = EncodePassword
            const result = await userModel.create(req.body)
            if(!result){
                return res.status(500).send({message:"something went wrong"})
            }
            
            let user =result._doc
            delete user.password

            const token = jwt.sign({...user}, process.env.JWT_SECRATE,{expiresIn:"30d"})
            if(!token) return res.status(500).send({message:"something went wrong"})
            return res.status(200).send({message:"Success", user : {...user,token:token}})
            
        } catch (error) {
            if(error && error.message && error.message.includes("E11000")){
                return res.status(400).send({message:"validation error",validationResult:[{key:"email", message:"Email is already exist"}]})
            }
            return res.status(400).send({message:"Internal server error"})
        }
    }

    async userLogin(req, res) {

       console.log("object");

        try {
            const { email, password } = req.body
           

            const validationResult = Validation(req.body,"login")

            if(validationResult > 0){
                return res.status(400).send({ message: "validation error", validationResult:validationResult})

            }
            let user = await userModel.findOne({ email: email })
           

            if (!user) {
                return res.status(400).send({message:"validation error",validationResult:[{key:"email", message:"Email not found"}]})

            }
             user = user._doc
            if (!(bcrypt.compareSync(password, user.password))) {
                // return res.status(400).send({ message: "Email and password are not match" })
                return res.status(400).send({message:"validation error",validationResult:[{key:"password", message:"Email and Password are not match"}]})

            }

            delete user.password 

            const token = jwt.sign(user, process.env.JWT_SECRATE, { expiresIn: "30d" })
            if (!token) {
                return res.status(500).send({ message: "Something went wrong" })
            }
             user.token = token
                   
            return res.status(200).send({ message: "success", user:user})

        } catch (error) {
            
            console.log(error);
            return res.status(500).send({ message: "Internal server error"})

        }
    }


}

const userController = new UserController()

export default userController;





