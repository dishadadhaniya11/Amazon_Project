import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header(props) {

    const { cartItems } = props
    // const [ setcartitem] = useState(0)
    const { token, setToken, userInfo, setuserInfo, setcartItems } = props
    const navigate = useNavigate()


    // useEffect(() => {
    //     let count = 0
    //     let i = 0
    //     while (i < cartItems.length) {
    //         count += cartItems[i].qnty
    //         i++
    //     }

    //     settotalcartitem(count)
    //     // eslint-disable-next-line
    // }, [cartItems])


    useEffect(() => {
        setToken(localStorage.getItem("token"))
        setuserInfo(localStorage.getItem("userInfo"))
    }, [setToken, setuserInfo, navigate])

    useEffect(() => {
        setcartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
        // eslint-disable-next-line
    }, [])



    return (
        <>
            <header className="bg-dark d-flex justify-content-between align-items-center ">
                <div className="text-light fw-bold fs-2 py-2 px-2">
                    <span className="">amazon</span>
                </div>
                <i className="fas fa-bars text-light pe-3 d-block d-sm-none"></i>
                <div className="d-none d-sm-flex gap-1 align-items-center me-4">
                    <div className="">
                        <input type="search" placeholder="Type here" className="pe-5 rounded" />
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="d-flex align-items-center gap-2">

                        <button onClick={!token && !userInfo ? () => navigate("/login") : () => {
                            localStorage.removeItem("userInfo")
                            setuserInfo(localStorage.getItem("userInfo"))
                            localStorage.removeItem("token")
                            setToken(localStorage.getItem("token"))
                            navigate("/")
                        }} className="btn btn-primary px-3" >{!token && !userInfo ? "Sign in" : "Sign out"}</button>
                        <Link to={"/cart"}> <i className="fas fa-shopping-cart text-light position-relative fs-3">
                            <span style={{ fontSize: "0.7rem" }} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartItems.length}

                            </span>
                        </i></Link>
                    </div>
                </div>

            </header>
        </>
    )

}

export default Header;

