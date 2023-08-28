import mediaModel from "./MediaModel.js"
import Randomstring from "randomstring"
import { url } from "inspector";
import fs from "fs"



class MediaController {

    async GetMedia(req, res) {
        try {
            console.log(req.files);
            let File = req.files.file
            console.log(File);
            let { mimetype, size } = File
            let name = File.name
            let extention = name.split(".")
            extention = extention[extention.length - 1]

            name = Randomstring.generate({
                length: 12,
                charset: 'alphabetic'
            }).toLowerCase();
            name = name + "." + extention
            File.name = name
            mimetype = mimetype.split("/")[0]

            if (mimetype !== "image" && mimetype !== "video") {
                mimetype = "application"
            }

            const folderName = `./Upload/${mimetype}`

            try {
                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName)
                }
            } catch (error) {
                console.log(error);
            }

            let path = `./Upload/${mimetype}/${name}`
            const result = await File.mv(path)
            path = path.substring(1,path.length)
            console.log(path);

            let Media = await mediaModel.create({ name, mimetype, extention, path, size })

            let url = `http://localhost:5000${path}`
            Media = Media._doc
            Media.url = url

            console.log(Media);


            res.json({ success: true, media: Media })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" })
        }
    }

    async showData(req,res) {
            try {
            //   const result = await mediaModel.find({})
              const result = await mediaModel.aggregate([
                {
                    $match:{
                        $or:[
                            {mimetype:"image"},
                            {mimetype:"video"}
        
                        ]
                       }
                    },
                
                {
                    $addFields:{
                        url:{
                            $concat:["http://localhost:5000","$path"]
                        }
                    }
                },
                {
                    $sort:{
                        createdAt:-1
                        
                    }
                }
            ])
        
              if (result) {
                return res.status(200).send({ message: "success", images: result })
        
              }
              return res.status(500).send({ message: "something went wrong" })
        
            } catch (error) {
              console.log(error);
              return res.status(500).send({ message: "internal server error" })
            }
          }



    }


const mediaController = new MediaController()
export default mediaController