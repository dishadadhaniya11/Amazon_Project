import { useEffect, useState } from "react";
import apiHELPER from "../common/ApiHelper";
import MessageBox from "../component/MessageBox";
import Loader from "../component/Loader";
import Rating from "../component/Rating";
import { useLocation, useNavigate } from "react-router-dom";
import CheakoutSteps from "../component/CheakoutSteps";
import paymentHandller from "../common/LoadRazorpay";



export default function OrderScreen(props) {

    const navigate = useNavigate()
    const location = useLocation()
    const paymentMethod = location.search.split("paymentMethod=")[1]
    const redirect = location.search.split("?paymentMethod=")[1]
    let { cartItems, setcartItems } = props
    const [isLoading, setisLoding] = useState(false)
    const [error, seterror] = useState("")
    const [cart, setcart] = useState([])
    const [summerydetails, setsummerydetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0
    })

    // const redirect = location.search.split("?redirect=")[1]
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
    let shippingAddress = userInfo.Address

    useEffect(() => {
        // eslint-disable-next-line
        cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
        setcartItems(cartItems)
    }, [])

    const getCart = async () => {

        try {
            setisLoding(true)
            const products = cartItems.map((x) => x.pro)

            const result = await apiHELPER.fetchCart(products)

            const InstockItem = result?.data?.products.filter((x) => x.countInStock > 0)


            for (let i in InstockItem) {
                for (let j in cartItems) {
                    if (cartItems[j].pro === InstockItem[i]._id) {
                        InstockItem[i].qnty = cartItems[j].qnty
                    }

                }
            }
            setcart(InstockItem)
            setisLoding(false)

        } catch (error) {

            setcart([])
            setisLoding(false)

            if (error.response && error.response.data && error.response.data.message) {
                seterror(error.response.data.message)

            }
            seterror(error.message)
            return

        }

    }
    useEffect(() => {

        //  if(cartItems.length > 0){
        // } 
        getCart()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalItems = 0
        let totalProducts = 0


        while (i < cart.length) {

            if (cart[i].countInStock > 0) {
                totalItems += cart[i].qnty
                totalPrice += (cart[i].qnty * cart[i].price)
                totalProducts++
            }
            i++

        }

        setsummerydetails({ ...summerydetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })  // eslint-disable-next-line
    }, [cart])



    const CreateOrder = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo") || "[]")

            const paymentMethod =  redirect && redirect === "online" ? "online" : "cod"

            const product = cart.map((x) => {
                return {qnty: x.qnty, price:x.price, _id:x._id}
            })
            let orderDetails = {
                userInfo:userInfo,
                paymentMethod,
                products:product,
                shippingAddress,
                totalPrice:summerydetails.totalAmount
            }
            const result = await apiHELPER.createOrder(orderDetails)
            console.log(result);
            // localStorage.removeItem("cartItems")
            // setcartItems([])
            if(!result.data.order.RazorpayDetails){
                return navigate("/order" + result.data.order._id)
            }else{
                const data = result.data.order

                const Options = {
                    name:data.shippingAddress.fullName,
                    phone:data.shippingAddress.Phone,
                    Address:data.shippingAddress.Address,
                    apikey:data.RazorpayDetails.apikey,
                    amount:data.RazorpayDetails.amount,
                    currency:data.RazorpayDetails.currency,
                    razorpayorderID: data.RazorpayDetails.id,
                    orderId:data._id,
                    seterror:seterror,
                    navigate:navigate
                }

                paymentHandller(Options)
            }


        } catch (err) {
            if(err.response && err.response.data && err.response.data.message){
                seterror(err.response.data.message)
                return
            }
            seterror(err.message)
        }
    }

    return (
        <>

            <MessageBox error={error} seterror={seterror} />
            <Loader isLoading={isLoading} />

            <div className="container">
            <CheakoutSteps Signin={true} Shipping={true} Payment={true} PlaceOrder={true} />
            <div className="container border border-black d-flex mt-5 shadow p-3 mb-5 bg-white rounded">
                <div className="w-75">
                    <div>
                        <h5 className="fw-bold mb-3 mt-3">Order Information</h5>

                        <div className="my-3 d-flex">
                            <h6 className="fw-bold">Name  : </h6>
                            <p className="ms-3">{shippingAddress.fullName}</p>

                        </div>
                        <div className="my-3 d-flex">
                            <h6 className="fw-bold">Phone number  : </h6>
                            <p className="ms-3">{shippingAddress.Phone}</p>

                        </div>
                        <div className="my-3 d-flex">
                            <h6 className="fw-bold">Address  : </h6>
                            <p className="ms-3">{shippingAddress.Address},{shippingAddress.City},{shippingAddress.State}<br /> Pincode-{shippingAddress.Pincode}</p>
                        </div>

                        <h6 className="fw-bold mb-3 mt-3">Payment Method : <span><i className="text-danger">{paymentMethod}</i></span></h6>
                    </div><br /><br />


                    {
                        cart.map((x ) => {
                            return (
                                <>
                                    <div  className="row mb-4 d-flex justify-content-between align-items-center w-75">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img src={x.image}
                                                className="img-fluid rounded-3" alt="..." />
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <h6 className="text-muted">{x.name}</h6>
                                            <h6 className="text-black mb-0">{x.brand}</h6>
                                            <Rating rating={x.rating} />
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h6 className="mb-0">{x.qnty}</h6>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h6 className="mb-0">{x.price}</h6>
                                        </div>

                                        <hr className="my-4" />
                                    </div>


                                </>
                            )
                        })
                    }


                </div>

                <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                            <h6 className="text-uppercase">Total products </h6>
                            <h6>{cartItems.length}</h6>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                            <h6 className="text-uppercase">Total Items </h6>
                            <h6>{summerydetails.totalItems}</h6>
                        </div>



                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-5">
                            <h6 className="text-uppercase">Total price</h6>
                            <h6>{summerydetails.totalAmount}</h6>
                        </div>

                        <div className="">
                            <button onClick={CreateOrder} type="button" className="register-btn btn btn-primary btn-block btn-lg px-2"
                                data-mdb-ripple-color="dark">Place your order</button>
                        </div>

                    </div>
                </div>

            </div>
            </div>
        </>
    )
}