import { useNavigate, useParams } from "react-router-dom"
import Rating from "../component/Rating";
import { useEffect, useState } from "react";
import apiHELPER from "../common/ApiHelper";
import Loader from "../component/Loader";
import MessageBox from "../component/MessageBox";



export default function ProductScreen(props) {
     const {cartItems, setcartItems} = props
     const navigate = useNavigate()
    const { id } = useParams()
    const [Product, setProduct] = useState({})
    const [isLoading, setisLoding] = useState(false)
    const [error, seterror] = useState("")
    const [qnty, setqnty] = useState(1)
    // const cartItems= JSON.parse(localStorage.getItem("cartItems") || "[]")

    const GetProductById = async () => {


        try {
            setisLoding(true)
            const result = await apiHELPER.fetchProductById(id)
            setProduct(result.data.result)
            setisLoding(false)

        } catch (error) {
            setisLoding(false)

            console.log(error);
            // if (error.response && error.response.data.message) {
            //     console.log(error.response.data.message);
            // } seterror(error.message)
            // return
        }
    }
    useEffect(() => {
        GetProductById()
      
        // setAppState({cartSize:cartItems.length})
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setqnty(Product.countInStock && Product.countInStock > 0 ? 1 : 0)
        
    },[Product])


    const AddToCart = () => {
      
      const cart = {
        pro:id,
        qnty:qnty
         }
        //  cartItems.push(cart)
        const findIndex = cartItems.findIndex ((x) => x.pro === id)

        if(findIndex > -1){
            cartItems[findIndex].qnty = cart.qnty
        }else{
            cartItems.push(cart)
        }   
        localStorage.setItem("cartItems",JSON.stringify(cartItems))
        setcartItems(cartItems)
        //  setAppState({cartSize:cartItems.length})
         navigate('/cart')
    }
   

    return (

        <div className="row mt-5 m-0 ">
            <Loader isLoading={isLoading} />
            <MessageBox error={error} seterror={seterror} />
            <div className="col-12 col-md-4 text_center">

                <img src={Product.image} className="" width={"300px"} alt="..." />



            </div>
            <div className="col-12 col-md-8 mt-md-0 mt-3">

                <div className="ms-md-0 ms-4">
                    <h2 className="fs-1"> {Product.category} </h2>
                    <p className="text-primary fw-bold ps-1"> {Product.brand}</p>
                    <Rating rating={Product.rating} />
                    <p> Reviews {Product.numReviews}</p>
                    <h6> High quality material</h6>
                    <br />
                    <br />

                </div>

                <div className="col-12 col-lg-4 col-md-6 col-sm-8 mb-2">
                    <div className="card-body card">
                        <div className="d-flex justify-content-between">
                            <h6 className="ps-4">Price</h6>
                            <span className="pe-5">{Product.price}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="ps-4">Quantity</h6>
                            <span className="pe-4">
                                <button onClick={() => setqnty(qnty-1)} disabled={qnty <= 1} className="btn fw-bold p-0 m-0"
                                    style={{ width: "20px", background: "white", border: "none" }}>-</button>
                                <span className="ps-2 pe-2" style={{ width: '40px' }}>{qnty}</span>
                                <button onClick={() => setqnty(qnty+1)} disabled={qnty >= Product.countInStock} className="btn fw-bold p-0 m-0"
                                    style={{ width: "20px", background: "white", border: "none" }}>+</button>
                            </span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="ps-4">Status</h6>
                            <h6 className={Product.countInStock > 0 ? "text-success" : "text-danger"}>{Product.countInStock > 0 ? "In Stock" : "Out of Stock"}</h6>
                        </div>
                        <button disabled={qnty <= 0} onClick={AddToCart} className="btn border border-0 border-secondary btn-primary w-100">Add to Cart</button>

                    </div>


                </div>
             


            </div>
        </div>


    )
}