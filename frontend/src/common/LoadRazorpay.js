import apiHELPER from "./ApiHelper"

const LoadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src =  'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.onload = () => {
            resolve(window.Razorpay)
        }
        document.body.appendChild(script)
    })
}

export default async function paymentHandller(paymentOption){
    const razorPay = await LoadRazorpay()

    const options = {
        key : paymentOption.apikey,
        amount : paymentOption.amount,
        currency : paymentOption.currency,
        name:"amazon",
        description: "test payment",
        order_id:paymentOption.razorpayOrderid,
        handler:async function (response) {
            try {
                let data = {
                    orderId:paymentOption.orderId,
                    paymentId:response.razorpay_payment_id,
                    razorpayOrderId:paymentOption.razorpayorderID
                }
                const result=  await apiHELPER.verifyPayment(data)
                paymentOption.navigate(`/order/${result.data.orderId}`)
            } catch (error) {
                if(error && error.response && error.response.data && error.response.data.message){
                    paymentOption.seterror(error.response.data.message)
                    return
                }
                paymentOption.seterror(error.message)

            }
        },
        prefill:{
            name:paymentOption.name,
            contact:paymentOption.phone
        },
        notes:{
            address:paymentOption.address
        },
        theme:{
            color:"#000"
        },
        payment_method:{
            card:true,
            netbanking:true,
            wellet:true,
            upi:true
        }
    }

    const paymentObject = new razorPay(options)
    paymentObject.open();
}