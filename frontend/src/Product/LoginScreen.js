
import {  Link, useLocation, useNavigate } from 'react-router-dom'
import apiHELPER from "../common/ApiHelper"
import Loader from "../component/Loader"
import MessageBox from "../component/MessageBox"
import Input from "../component/Input"
import Validation from "../common/Validation"
import { useEffect, useState } from "react"


export default function LoginScreen(props) {
  
  let { setuserInfo , setToken} = props
  const [error, seterror] = useState("")
  const [isSubmited, setisSubmited] = useState(false)
  const [isLoading, setisLoding] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [LoginError, setLoginError] = useState([])
  const redirect = location.search.split("?redirect=")[1]
  const token = localStorage.getItem("token")
  const User = localStorage.getItem("userInfo")
  const [user , setUser] = useState({
    email:"",
    password:""
  })
 

  useEffect(() => {
    if (token && User) {
      navigate("/") 
      return
    }
    // eslint-disable-next-line
}, [])



  // const LoginHandler = async () => {
        
  //   const redirect = location.search.split("?redirect=")[1]
  //   // console.log(redirect);
  //   try {
  //     setisSubmited(true)
  //       if (!Email) {
  //         seterror("required field email is empty")
  //         return
  //       }
  //       seterror("")
  //       if (!(/^\w+([\\.-]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/.test(Email))) {
  //         seterror("Invalid email")
  //         return
  //       }
      
  //       if (!Password) {
  //         seterror("required field password is empty")
  //         return
  //       }
  //        setisLoding(true)
  //     // const result = await apiHELPER.userLogin({ email: Email, password: Password })
  //     const result = await apiHELPER.userLogin({email:Email,password:Password})
  //     setisLoding(false)
    
      
  //     if (result && result.status === 200) {
  //       localStorage.setItem("userInfo", JSON.stringify(result.data.user))
  //       localStorage.setItem("token", JSON.stringify(result.data.user.token))
  //       if(! redirect) return navigate("/")
  //       navigate("/" + redirect) 
  //     }
  //   } catch (error) {
  //     setisLoding(false)
  //     // console.log(error);
  //     if (error && error.response && error.response.data.message) {
  //       console.log(error.response.data.message);
  //     }
  //     seterror(error.response.data.message)
      

  //   }
  // }

 

  const LoginHandler = async() => {

    try {
      setisSubmited(true)
      const ValidationResult = Validation(user,"login")
      if(ValidationResult.length > 0){
        setLoginError(ValidationResult)
        return
      }
     
      setisLoding(true)
      const result = await apiHELPER.userLogin(user)

        localStorage.setItem("userInfo",JSON.stringify(result.data.user))
        setToken(token)
        setuserInfo(user)
            localStorage.setItem("token",result.data.user.token)

            console.log(result);
            setisLoding(false)

         

            if(redirect){
              navigate("/Shipping?redirect=payment")
              return
            }
            navigate("/")
            return 

    } catch (error) {

            setisLoding(false)
         console.log(error);
     if(error.response && error.response.data){
         if(error.response && error.response.status === 400 && error.response.data.message === "validation error"){
             setLoginError(error.response.data.validationResult)
           
             return
         }
         seterror(error.response.data.message);
         return
     }else{
       seterror(error.message)
       
     }
    }
  }
  // console.log(LoginError.find((x) => x.key === "email" ? true : false));


  return (
    <div >
      <br />
      <br />  
      <br />
      <Loader isLoading={isLoading}/>
      <MessageBox error={error} seterror={seterror}/>

      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="..." />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <Input 
                  type="text"
                    onChange={(e) => {
                      setUser({...user, email : e.target.value})
                    
                      if(isSubmited){
                       const ValidationResult = Validation({...user, email : e.target.value},"login")
                      setLoginError(ValidationResult)

                     }
                    } }
                    value={user.email}
                  
                    isError={LoginError.find((x) => x.key === "email" ? true : false)}
                    helperText ={LoginError.find((x) => x.key === "email")?.message}
                    className="form-control form-control-lg"

                    placeholder="Enter a valid email address" />
             


                
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <Input
                   type="password" 
                    onChange={(e) => {
                      setUser({...user, password : e.target.value})
                        if(isSubmited){
                        const ValidationResult = Validation({...user, password : e.target.value},"login")
                       setLoginError(ValidationResult)
 
                      }
                    }}
                    value={user.password}
                    isError = {LoginError.find((x) => x.key === "password" ? true : false)}
                    helperText ={LoginError.find((x) => x.key === "password")?.message}
                    className="form-control form-control-lg"
                    placeholder="Enter password" />
                
                
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* <!-- Checkbox --> */}
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">Forgot password?</a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} onClick={LoginHandler}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                  <Link to={"/Registration"}className="link-danger">Register</Link>
                    </p>
                </div>

              </form>
            </div>
          </div>
        </div>


      </section>
    </div>



  )
}



// onChange={(e) => {
//   setEmail(e.target.value)

//   if (isSubmited) {
//     if (!Email) {
//       seterror("required field email is empty")
//       return
//     }
//     seterror("")
    
//     if (!(/^\w+([\\.-]?\w+)@\w+([\\.-]?\w+)(\.\w{2,3})+$/.test(Email))) {
//       seterror("Invalid email")
//       return
//     }
//     seterror("")
//   }


// }}

// onChange={(e) => {
//   setPassword(e.target.value)
//   if (isSubmited) {
//     if (!Password) {
//       seterror("required field password is empty")
//       return
//     }
//     seterror("")
//   }
// }}