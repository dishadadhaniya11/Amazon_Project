
import orderModel from "./OrderModels.js"
import Razorpay from "razorpay"


function CreateRazorePayOrder(options) {
    return new Promise((resolve, reject) => {

        var instance = new Razorpay({
            key_id: process.env.API_KEY_ID,
            key_secret: process.env.KEY_SECRATE,
        })
        instance.orders.create(options, (err, order) => {
            if (err) return reject(err)
            resolve(order)
        })
    })

}
class OrderController {


    async creatOrder(req, res) {
        try {


            const { products, paymentMethod, shippingAddress, userInfo, totalPrice } = req.body



            if (!products) {
                return res.status(400).send({ message: "Something went wrong" })
            }

            if (!paymentMethod) {
                return res.status(400).send({ message: "Something went wrong" })
            }
            if (!shippingAddress) {
                return res.status(400).send({ message: "Something went wrong" })
            }

            const deliveredIn = new Date()
            deliveredIn.setDate(deliveredIn.getDate() + 5)

            const orderDetails = {
                product: products,
                paymentMethod,
                shippingAddress,
                user: userInfo,
                totalPrice: totalPrice,
                deliveredIn: deliveredIn
            }
            let order = await orderModel.create(orderDetails)
            order = { ...order._doc, RazorpayDetails: null }
            if (!order) return res.status(500).send({ message: "Something went wrong" })
            if (paymentMethod === "COD") {
                return res.status(200).send({ message: "Success", order })
            } else {
                const options = {
                    amount: totalPrice * 100,
                    currency: "INR",
                    receipt: "rcpt_id_" + order._id
                }
                const RazorpayResult = await CreateRazorePayOrder(options)

                if (!RazorpayResult) return res.status(500).send({ message: "Somthing went wrong" })
                order = {
                    ...order, RazorpayDetails: { ...RazorpayResult, apikey: process.env.API_KEY_ID }
                }

                return res.status(200).send({ message: "Success", order })
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" })

        }
    }

    async orders(req, res) {
        try {

            const result = await orderModel.find({})
            if (result) {
                return res.status(200).send({ message: "Success", order: result })
            }
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Sometging went wrong" })
        }
    }

    async orderItembyId(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).send({ message: "Bad request" })
            }
            const result = await orderModel.findById({ _id: id })
            if (result) {
                return res.status(200).send({ message: "Success", order: result })
            }
            return res.status(500).send({ Message: "Something went wrong" })
        } catch (error) {
            console.log(error);
            return res.status(500).send({ Message: "Internal server error" })

        }
    }

    async paymentVerify(req, res) {
        try {
            const { orderId, razorpayOrderId, paymentId } = req.body

            const instance = new Razorpay({
                key_id: process.env.API_KEY_ID,
                key_secret: process.env.KEY_SECRATE
            })


            const result = await instance.payments.fetch(paymentId)
            console.log(result);
            if ((result.status === "authorized" || result.status === "captured")) {
                let Update = await orderModel.updateOne({ _id: orderId }, { paymentStatus: "verify" })
                if (!Update || Update.modifiedCount <= 0) return res.status(500).send({ message: "Somthing went wrong 1" })
                return res.status(200).send({ message: "Success", orderId: orderId })
            }
            const update = await orderModel.updateOne({ _id: orderId }, { paymentStatus: "reject" })
            if (!update || update.matchedCount <= 0) {
                return res.status(500).send({ message: "Somthing went wrong 2" })
            }
            return res.status(400).send({ message: "Payment verification field" })

        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Internal server error" })
        }
    }
}



const orderController = new OrderController()

export default orderController;
