import mongoose from "mongoose"
// const { default:mongoose} = require("mongoose")

const ConnectDB = async() => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/amazon")
        console.log("DB connected");
    } catch (error) {
         console.log("DB connection loss");
    }
}

// module.exports = ConnectDB;
export default ConnectDB