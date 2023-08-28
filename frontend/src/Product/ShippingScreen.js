import { useState } from "react"
import Validation from "../common/Validation"
import CheakoutSteps from "../component/CheakoutSteps"
import Loader from "../component/Loader"
// import apiHELPER from "../common/ApiHelper"
import Input from "../component/Input"
import MessageBox from "../component/MessageBox"
import { useNavigate } from "react-router-dom"



const ShippingScreen = () => {

  const [loder, setLoder] = useState(false)
  const nevigate = useNavigate()
  const [error, seterror] = useState("")
  const [isSubmited, setisSubmited] = useState(false)
  const [shippingError, setshippingError] = useState([])
  const [user, setUser] = useState(
    {
      fullName: "",
      Address: "",
      City: "",
      State: "",
      Pincode: "",
      Phone: "",
      email: ""

    }
  )

  const ShippingHandler = async () => {

    try {
      setisSubmited(true)
      const ValidationResult = Validation(user, "shipping")
      if (ValidationResult.length > 0) {
        setshippingError(ValidationResult)
        return
      }
      setLoder(true)
       
      const userInfo = JSON.parse(localStorage.getItem("userInfo" || "{}"))
      userInfo.Address = user
      localStorage.setItem("userInfo",JSON.stringify(userInfo))

      

      nevigate("/Payment")

    } catch (error) {
      setLoder(false)
      if (error.response && error.response.data) {
        if (error.response.status === 400 && error.response.data && error.response.data.message === "validation error") {
          setshippingError(error.response.data.ValidationResult)
          return
        }
        seterror(error.response.data.message)
      } else {
        seterror(error.response)
      }

    }


  }
  return (
    <div>
      <div className="container">
        <CheakoutSteps Signin={true} Shipping={true} />
        <MessageBox error={error} seterror={seterror}/>

        <div className="row">
          <Loader loder={loder} />
          <div className="col-md-8 mb-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Shipping details</h5>
              </div>
              <div className="card-body">
                <form>
                  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <Input
                          type="text"
                          value={user.fullName}
                          isError={shippingError.find((x) => x.key === "fullName" ? true : false)}
                          helperText={shippingError.find((x) => x.key === "fullName")?.message}
                          onChange={(e) => {
                            setUser({ ...user, fullName: e.target.value })
                            if (isSubmited) {
                              const ValidationResult = Validation({ ...user, fullName: e.target.value }, "shipping")
                              setshippingError(ValidationResult)
                            }
                          }}
                          // id="form7Example1" 
                          className="form-control"
                          placeholder="Full name" />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Text input --> */}
                  <div className="form-outline mb-4">
                    <Input
                      value={user.Address}
                      isError={shippingError.find((x) => x.key === "Address" ? true : false)}
                      helperText={shippingError.find((x) => x.key === "Address")?.message}
                      onChange={(e) => {
                        setUser({ ...user, Address: e.target.value })
                        if (isSubmited) {
                          const ValidationResult = Validation({ ...user, Address: e.target.value }, "shipping")
                          setshippingError(ValidationResult)
                        }
                      }}
                      type="text"
                      id="form7Example4"
                      className="form-control"
                      placeholder="Address" />
                  </div>
                  <div className="form-outline mb-4">
                    <Input
                      value={user.City}
                      isError={shippingError.find((x) => x.key === "City" ? true : false)}
                      helperText={shippingError.find((x) => x.key === "City")?.message}
                      onChange={(e) => {
                        setUser({ ...user, City: e.target.value })
                        if (isSubmited) {
                          const ValidationResult = Validation({ ...user, City: e.target.value }, "shipping")
                          setshippingError(ValidationResult)
                        }
                      }}
                      type="text"
                      id="form7Example4"
                      className="form-control"
                      placeholder="City" />
                  </div>
                  <div className="form-outline mb-4">
                    <Input
                      value={user.State}
                      isError={shippingError.find((x) => x.key === "State" ? true : false)}
                      helperText={shippingError.find((x) => x.key === "State")?.message}
                      onChange={(e) => {
                        setUser({ ...user, State: e.target.value })
                        if (isSubmited) {
                          const ValidationResult = Validation({ ...user, State: e.target.value }, "shipping")
                          setshippingError(ValidationResult)
                        }
                      }}
                      type="text"
                      id="form7Example4"
                      className="form-control"
                      placeholder="State" />
                  </div>
                  <div className="form-outline mb-4">
                    <Input
                      value={user.Pincode}
                      isError={shippingError.find((x) => x.key === "Pincode" ? true : false)}
                      helperText={shippingError.find((x) => x.key === "Pincode")?.message}
                      onChange={(e) => {
                        setUser({ ...user, Pincode: e.target.value })
                        if (isSubmited) {
                          const ValidationResult = Validation({ ...user, Pincode: e.target.value }, "shipping")
                          setshippingError(ValidationResult)
                        }
                      }}
                      type="text"
                      id="form7Example4"
                      className="form-control"
                      placeholder="Pincode" />
                  </div>



                  {/* <!-- Number input --> */}
                  <div className="form-outline mb-4">
                    <Input
                      type="number"
                      value={user.Phone}
                      isError={shippingError.find((x) => x.key === "Phone" ? true : false)}
                      helperText={shippingError.find((x) => x.key === "Phone")?.message}
                      onChange={(e) => {
                        setUser({ ...user, Phone: e.target.value })
                        if (isSubmited) {
                          const ValidationResult = Validation({ ...user, Phone: e.target.value }, "shipping")
                          setshippingError(ValidationResult)
                        }
                      }}
                      id="form7Example6"
                      className="form-control"
                      placeholder="Phone" />
                  </div>

                  {/* <!-- Email input --> */}
                  <div className="form-outline mb-4">
                    <Input
                      value={user.email}
                      isError={shippingError.find((x) => x.key === "email" ? true : false)}
                      helperText={shippingError.find((x) => x.key === "email")?.message}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value })
                        if (isSubmited) {
                          const ValidationResult = Validation({ ...user, email: e.target.value }, "shipping")
                          setshippingError(ValidationResult)
                        }
                      }}
                      type="email"
                      id="form7Example5"
                      className="form-control"
                      placeholder="Email" />
                  </div>
                  {/* <!-- Checkbox --> */}
                  <div className="form-check d-flex justify-content-center mb-2">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form7Example8"  />
                    <label className="form-check-label"   >
                      Create an account?
                    </label>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="button"
                      onClick={ShippingHandler}
                      className="btn btn-primary btn-lg btn-block px-5 ">
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
export default ShippingScreen