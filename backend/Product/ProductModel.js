import mongoose from "mongoose";

class ProductModel {

    constructor() {
        this.schema = new mongoose.Schema({
            name: { type: String, require: true },
            category: { type: String, require: true },
            image: { type: String, require: true },
            brand: { type: String, require: true },
            description: { type: String, require: true },
            price: { type: Number, require: true },
            rating: { type: Number, require: true },
            numReviews: { type: Number, require: true },
            countInStock: {type:Number,require:true}
        })
    }
}

const product = new ProductModel()
const productModel = mongoose.model("tbl_products", product.schema)

export default productModel
// module.exports = productModel