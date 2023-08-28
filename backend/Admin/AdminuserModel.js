import mongoose from "mongoose";

class AdminUserModel{
    constructor() {
        this.schema = new mongoose.Schema({
            fullName:{type:String, required:true},
            email:{type:String, required:true, unique:true},
            role:{type:String , required:true},
            password:{type:String , required:true}
        },{
            timestamps:true
        })
    }
}

const user = new AdminUserModel()
const adminUserModel =  mongoose.model("tbl_admin_user", user.schema)
export default adminUserModel