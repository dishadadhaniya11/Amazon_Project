import mongoose from "mongoose";

class Order{

    constructor(){
        this.schema = new mongoose.Schema({
            product:{type:Array , require:true},
            user:{type:Object, require:true},
            paymentMethod:{type:String , require:true , default:"cod"},
            paymentStatus:{type:String , require:true , default:"pending"},
            totalPrice:{type:Number, require:true},
            shippingAddress:{type:Object , require:true},
            deliveryStatus:{type:String, require:true, default:"pending"},
            deliveredIn:{type:Date, require:true}
        },{timestamps:true})
      }
}

const order = new Order()
const orderModel = mongoose.model("tbl_order",order.schema)

export default orderModel;