import mongoose, { Mongoose } from "mongoose";

class MediaModel{
    constructor() {
        this.schema = new mongoose.Schema({
            name:{type:String , required:true},
            mimetype:{type:String , required:true},
            extention:{type:String,required:true},
            path:{type:String, required:true},
            size:{type:String, required:true},
            rendersize:{type:String , default:null},
            uploadedby:{type:String , default:null},
            filePurpose:{type:String,default:null},
        },
        {
            timestamps:true
        })
    }
}

const Media = new MediaModel()
const mediaModel = mongoose.model("tbl_Media",Media.schema)
export default mediaModel