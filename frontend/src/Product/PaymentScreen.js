import { Link, useNavigate, } from "react-router-dom"
import CheakoutSteps from "../component/CheakoutSteps"
import { useState } from "react"

const PaymentScreen = () => {
    const [payemntMethod, setPaymentMethod] = useState("cod")

    const navigate = useNavigate()

    const clickonProcced = () => {
        navigate(`/order?paymentMethod=${payemntMethod}`)
    }



    return (
        <>
            <div className="container py-5">
                <CheakoutSteps Signin={true} Shipping={true} Payment={true} />
                <div className="row d-flex justify-content-center">

                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <div className="card rounded-3 shadow-lg">
                            <div className="card-body mx-3 my-2 ">
                                <h5 className="text-center">Payment Method</h5>

                                <div className="pt-3">
                                    <div className="rounded border d-flex w-100 px-3 py-2  align-items-center">
                                        <div className="payment d-flex gap-2 align-items-center pe-3">
                                            <input id="online" type="radio" checked={payemntMethod === "online"} value={"online"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                            <label htmlFor="online" >Online</label>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row pb-3 pt-4">
                                        <div className="rounded border d-flex w-100 px-3 py-2 align-items-center">
                                            <div className="payment d-flex gap-2 align-items-center pe-3">
                                                <input id="cod" type="radio" checked={payemntMethod === "cod"} value={"cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                                <label htmlFor="cod" >COD</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="button justify-content-center ">
                                    <button onClick={clickonProcced} type="button " className="btn btn-primary btn-lg w-100" >Procced</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentScreen