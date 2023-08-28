import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import Design from "./Product/Pro-design";
import Footer from "./component/Footer";
import Header from "./component/Header";
import ProductScreen from "./Product/ProductScreen";
import LoginScreen from "./Product/LoginScreen";
import Registration from "./Product/Registration";
import { useState } from "react";
import CartScreen from "./Product/CartScreen";
import ShippingScreen from "./Product/ShippingScreen";
import PaymentScreen from "./Product/PaymentScreen";
import OrderScreen from "./Product/OrderScreen";


function App() {

  // const [AppState , setAppState] = useState({}) 
  const [cartItems, setcartItems] = useState(JSON.parse(localStorage.getItem("cartItems") || "[]"))
  // const [cartItems, setcartItems] = useState([])
  const [token, setToken] = useState()
  const [userInfo, setuserInfo] = useState()


  return (
    <BrowserRouter>
      <div>
        <Header cartItems={cartItems} userInfo={userInfo} setuserInfo={setuserInfo} token={token} setToken={setToken} setcartItems={setcartItems}/>

        <main className="" style={{ minHeight: "88.2vh" }}>
          <Routes>
            <Route path="/" element={<Design/>} />    {/* <Route path="/" element={<Design />}/> */} 
           
            <Route path="/login" element={<LoginScreen setuserInfo={setuserInfo} setToken={setToken}/>} />    {/* <Route path="/" element={<Design />}/> */}
            <Route path="/registration" element={<Registration setuserInfo={setuserInfo} setToken={setToken}/>} />
            <Route path="/cart" element={<CartScreen   cartItems={cartItems} setcartItems={setcartItems}/>} />
            <Route path="/shipping" element={<ShippingScreen/>} />
            <Route path="/product/:id" element={<ProductScreen  cartItems={cartItems} setcartItems={setcartItems}/>} />
            <Route path="/payment" element={ <PaymentScreen /> }/>
            <Route path="/order" element={ <OrderScreen cartItems={cartItems} setcartItems={setcartItems} />} />
            
          </Routes>


        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}


export default App;
 // eslint-disable-next-line
