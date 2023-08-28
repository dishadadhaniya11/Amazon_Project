const CheakoutSteps = (props) => {

    const { Signin, Shipping, Payment, PlaceOrder } = props
    return (
        <>
            <div className="row pt-1 shadow p-3 mb-5 bg-body rounded">
                <div className="col-3 px-0" style={{ borderTop: Signin ? "3px solid #ff8000" : "3px solid gray" }}>
                    <p style={{ color: Signin ? "#ff8000" : "gray" }}>Signin</p >
                </div>
                <div className="col-3 px-0" style={{ borderTop: Shipping ? "3px solid #ff8000" : "3px solid gray" }}>
                    <p style={{ color: Shipping ? "#ff8000" : "gray" }}>Shipping</p>
                </div>
                <div className="col-3 px-0" style={{ borderTop: Payment ? "3px solid #ff8000" : "3px solid gray" }}>
                    <p style={{ color: Payment ? "#ff8000" : "gray" }} >Payment</p>
                </div>
                <div className="col-3 px-0" style={{ borderTop: PlaceOrder ? "3px solid #ff8000" : "3px solid gray" }}>
                    <p style={{ color: PlaceOrder ? "#ff8000" : "gray" }}>Place Order</p>
                </div>
            </div> 
                
        </>
    )
}

export default CheakoutSteps