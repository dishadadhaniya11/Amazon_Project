import { Link, useNavigate } from "react-router-dom";
import apiHELPER from "../common/ApiHelper";
import { useEffect, useState } from "react";
import Loader from "../component/Loader";
import MessageBox from "../component/MessageBox";
import Rating from "../component/Rating";

export default function CartScreen(props) {

    // const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
    let { cartItems, setcartItems } = props
    const navigate = useNavigate()
    const [cart, setcart] = useState([])
    const [isLoading, setisLoding] = useState(false)
    const [error, seterror] = useState("")
    const [summerydetails, setsummerydetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        totalProducts: 0,
        delivery: 0,
        text: 0
    })



    useEffect(() => {  // eslint-disable-next-line
        cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
        setcartItems(cartItems)
        // eslint-disable-next-line
    }, [])
    // eslint-disable-next-line

    const getCart = async () => {

        try {
            setisLoding(true)
            const products = cartItems.map((x) => x.pro)

            const result = await apiHELPER.fetchCart(products)

            const InstockItem = result?.data?.products


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

        // let i = 0
        // while (i < cartItems.length) {

        //     let j = 0
        //     while (j < InstockItem.length) {

        //         if (cartItems[i].pro=== InstockItem[j]._id) {
        //             InstockItem[j].qnty = cartItems[i].qnty
        //         }
        //         j++

        //     }
        //     i++
        // }




    }
    useEffect(() => {

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


    const removeHandler = (id) => {
        cartItems = cartItems.filter((x) => x.pro !== id)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        setcartItems(cartItems)
        getCart()
    }

    const cheakOutHandler = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login?redirect=shipping")
            return
        }
        navigate("/shipping?redirect=payment")
        // localStorage.setItem("summerydetails" , JSON.stringify(summerydetails))
        // localStorage.setItem("cartInfo",JSON.stringify(cart))
    }



    return (


        <section className="h-100 h-custom  " style={{ backgroundColor: "rgb(11, 94, 215,0.4)", }}>
            <Loader isLoading={isLoading} />
            <MessageBox error={error} seterror={seterror} />
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>


                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                                                {/* <h6 className="mb-0 text-muted">3 items</h6> */}
                                            </div>
                                            <hr className="my-4" />
                                            {
                                                cart.length <= 0 ? (
                                                    <img src="https://assets.materialup.com/uploads/87d4df96-a55f-4f4b-9a17-a696eded97f3/preview.gif" alt=".."
                                                        style={{ paddingLeft: "30%", paddingTop: "10%" }} />
                                                    // <h6>Cart is empty</h6>
                                                ) :
                                                    cart && cart.map((x, key) => {
                                                        return <div key={key} className="row mb-4 d-flex justify-content-between align-items-center">
                                                            <div className="col-md-2 col-lg-2 col-xl-2">
                                                                <img src={x.image}
                                                                    className="img-fluid rounded-3" alt="..." />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-3">
                                                                <h6 className="text-muted">{x.category}</h6>
                                                                <h6 className="text-black mb-0">{x.brand}</h6>
                                                                <Rating rating={x.rating} />
                                                            </div>
                                                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">


                                                                <select disabled={x.countInStock <= 0} value={x.qnty} className="bg-gradient bg-light rounded"
                                                                    style={{ minWidth: "70px" }} onChange={(e) => {
                                                                        cart[key].qnty = Number(e.target.value)
                                                                        setcart([...cart])

                                                                        let tmp = cart.map((x) => {
                                                                            return {
                                                                                pro: x._id,
                                                                                qnty: x.qnty
                                                                            }
                                                                        })
                                                                        localStorage.setItem("cartItems", JSON.stringify(tmp))
                                                                    }}>
                                                                    


                                                                    {
                                                                        [
                                                                            ...new Array(x.countInStock).keys()
                                                                        ].map((n) => (
                                                                            <option value={n + 1} key={n + 1} > {n + 1} </option>
                                                                        ))
                                                                    }

                                                                </select>




                                                            </div>
                                                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                                <h6 className="mb-0">{x.price}</h6>
                                                            </div>
                                                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                                <button onClick={() => removeHandler(x._id)} className="text-muted border border-none bg-white " data-mdb-toggle="tooltip"><i className="fa-solid fa-trash-can"></i>   </button>
                                                            </div>
                                                            <hr className="my-4" />
                                                        </div>

                                                    })}


                                            <div className="pt-5">
                                                <Link to={"/"}> <h6 className="mb-0 text-body"><i
                                                    className="fas fa-long-arrow-alt-left me-2"></i>Back to shop</h6> </Link>
                                            </div>
                                        </div>
                                    </div>


                                    {/* summery details.............................                        */}
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr className="my-4" />

                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">Total products </h5>
                                                <h5>{cartItems.length}</h5>
                                            </div>
                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">Total Items </h5>
                                                <h5>{summerydetails.totalItems}</h5>
                                            </div>



                                            <hr className="my-4" />

                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Total price</h5>
                                                <h5>{summerydetails.totalAmount}</h5>
                                            </div>

                                            <div className="d-flex gap-1">
                                                <Link to={"/registration"} ><button type="button" className="register-btn btn btn-primary btn-block btn-lg px-2"
                                                    data-mdb-ripple-color="dark">Register</button> </Link>
                                                <button type="button" onClick={cheakOutHandler} className="buy-now-btn btn text-primary border border-primary btn-block btn-lg px-2"
                                                    data-mdb-ripple-color="dark">Buy Now</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}