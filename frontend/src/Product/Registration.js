import { useState } from "react"
import apiHELPER from "../common/ApiHelper"
import Loader from "../component/Loader"
import { useLocation, useNavigate } from "react-router-dom"
import Input from "../component/Input"
import Validation from "../common/Validation"
import MessageBox from "../component/MessageBox"


export default function Registration() {

    const location = useLocation()
    const redirect = location.search.split("?redirect=")[1]
    const [error, seterror] = useState("")
    const [isSubmited, setisSubmited] = useState(false)
    const [isLoading, setisLoding] = useState(false)
    const navigate = useNavigate()
    const [registerError, setregisterError] = useState([])
    const [ user, setUser] = useState(
        {
            firstName: "",
            email: "",
            password: "",
            confirmpassword: ""
        }
    )



    const registerHandler = async () => {

        try {
            setisSubmited(true)
            const ValidationResult = Validation(user, "register")

            if (ValidationResult.length > 0) {
                setregisterError(ValidationResult)
                return
            }
            // setregisterError(ValidationResult);
            setisLoding(true)
            const result = await apiHELPER.RegisterUser(user)

            localStorage.setItem("userInfo", JSON.stringify(result.data.user))
            localStorage.setItem("token", result.data.user.token)
            setisLoding(false)
            if (redirect) {
                navigate("/Shipping?redirect=payment")
                return
            }
            navigate("/")
            return

        } catch (error) {
            setisLoding(false)
            if (error.response && error.response.data) {
                if (error.response && error.response.status === 400 && error.response.data.message === "validation error") {
                    setregisterError(error.response.data.ValidationResult)
                    return
                }
                seterror(error.response.data.message);

            } else {
                seterror(error.response)
            }
        }
    }

    return (
        <div>
            <Loader isLoading={isLoading} />

            <MessageBox error={error} seterror={seterror} />
            <section className="" style={{ backgroundColor: "#eee", height: "88vh " }}>
                <div className="container h-80">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw "></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            type="text"
                                                            value={user.firstName}
                                                            isError={registerError.find((x) => x.key === "firstName" ? true : false)}
                                                            helperText={registerError.find((x) => x.key === "firstName")?.message}
                                                            onChange={(e) => {
                                                                setUser({ ...user, firstName: e.target.value })
                                                                if (isSubmited) {
                                                                    const ValidationResult = Validation({ ...user, firstName: e.target.value }, "register")
                                                                    setregisterError(ValidationResult)
                                                                }
                                                            }}
                                                            className="form-control"
                                                            placeholder="Your name" />


                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            value={user.email}
                                                            type="email"
                                                            id="form3Example3c"
                                                            onChange={(e) => {
                                                                setUser({ ...user, email: e.target.value })
                                                                if (isSubmited) {
                                                                    const ValidationResult = Validation(user, "register")
                                                                    setregisterError(ValidationResult)
                                                                }
                                                            }}

                                                            isError={registerError.find((x) => x.key === "email" ? true : false)}
                                                            helperText={registerError.find((x) => x.key === "email")?.message}


                                                            className="form-control"
                                                            placeholder="Your email" />
                                                        {error && (error.includes("email") || error.includes("Email")) ? (

                                                            <span className="text-danger">
                                                                {error}
                                                            </span>
                                                        ) : ""}

                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            type="password"
                                                            value={user.password}
                                                            isError={registerError.find((x) => x.key === "password" ? true : false)}
                                                            helperText={registerError.find((x) => x.key === "password")?.message}
                                                            onChange={(e) => {
                                                                setUser({ ...user, password: e.target.value })
                                                                if (isSubmited) {
                                                                    const ValidationResult = Validation(user, "register")
                                                                    setregisterError(ValidationResult)
                                                                }
                                                            }}
                                                            className="form-control"
                                                            placeholder="Password" />

                                                    </div>
                                                </div>


                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <Input
                                                            type="password"
                                                            value={user.confirmpassword}
                                                            isError={registerError.find((x) => x.key === "confirmpassword" ? true : false)}
                                                            helperText={registerError.find((x) => x.key === "confirmpassword")?.message}
                                                            onChange={(e) => {
                                                                setUser({ ...user, confirmpassword: e.target.value })
                                                                if (isSubmited) {
                                                                    const ValidationResult = Validation(user, "register")
                                                                    setregisterError(ValidationResult)
                                                                }
                                                            }}
                                                            className="form-control"
                                                            placeholder="confirm-password" />

                                                    </div>
                                                </div>



                                                <div className="form-check d-flex justify-content-center mb-5">
                                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                    <label className="form-check-label" >
                                                        I agree all statements in <a href="#!">Terms of service</a>
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" onClick={registerHandler} className="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="..." />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
