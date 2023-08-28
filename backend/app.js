import express, { json } from "express"
import productcontroller from "./Product/ProductControll.js";
import cors from "cors"
import ConnectDB from "./connection.js";
import userController from "./Users/UserController.js";
import "dotenv/config"
import orderController from "./Order/OrderController.js";
import Authentication from "./Auth/Authentication.js";
import adminUserController from "./Admin/AdminuserController.js";
import fileUpload from "express-fileupload";
import mediaController from "./Media/MediaController.js";

// mongodb://localhost:27017

const App = express()
App.use(cors())

App.use(json())



ConnectDB()

App.use(fileUpload())

App.use("/Upload",express.static("./Upload"))
App.get("/",(req,res) => {
    return res.status(200).send({message:"success"})
})

App.get("/Product", productcontroller.getProduct)

App.get("/Product/:id", productcontroller.getProductById)

// App.get("/Product/insert/many" , productcontroller.insertProduct)

App.post("/registration", userController.RegisterUser)

App.post("/cart", productcontroller.Getcart)

App.post("/user/login", userController.userLogin)

// App.use(Authentication.createOrderAuth)
App.post("/order/create", Authentication.createOrderAuth, orderController.creatOrder)
App.post("/payment/verify", Authentication.createOrderAuth, orderController.paymentVerify)
App.get("/order",orderController.orders)
App.get("/order/:id", orderController.orderItembyId)

App.post("/admin/insert/user",adminUserController.insertUser)
App.get("/admin/get/user",adminUserController.getUser)
App.delete("/admin/delete/user/:id",adminUserController.deleteUser)
App.post("/admin/login/user",adminUserController.loginUser)
App.put("/admin/update/user/:id",adminUserController.upadteUser)



App.post("/admin/upload",mediaController.GetMedia)
App.get("/admin/show",mediaController.showData)


App.listen(process.env.PORT, () => {
    console.log("server started");
})






// console.log(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test("Dishadisha@1"));

// Validation({firstName:"Disha", lastName:"Dadhaniya", email:"dishapatel2230@gmail.com",password:"disha@2230"},"register") 