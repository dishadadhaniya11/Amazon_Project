import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Path from "./Common/Path";
import DashboardScreen from "./Screen/Dashboard/Dashboard";
import "./App.css"
import ProductScreen from "./Screen/Product/ProductScreen";
import UserScreen from "./Screen/Users/UserScreen";
import LoginScreen from "./Screen/Users/LoginScreen";
import { useState } from "react";

function App() {

  const [Auth , setAuth] = useState(localStorage.getItem("TOKEN") ? true : false)
  // console.log(Auth);

  // const routes = <Routes>
  //   <Route  path={Path.Dashboard} element={<DashboardScreen/> } />
  //   <Route  path={Path.ProductScreen} element={<ProductScreen/> } />
  //   <Route  path={Path.userScreen} element={<UserScreen/> } />
  //   <Route path={Path.LoginScreen} element={<LoginScreen />} />
  // </Routes> 
  return (
    <BrowserRouter>
      {/* <div>
        <Layout routes={routes} />
      </div> */}
      <Routes>
        <Route path={Path.Dashboard} element={<Layout Auth={Auth} setAuth={setAuth} content={<DashboardScreen/>} /> }/>
        <Route path={Path.ProductScreen} element={<Layout Auth={Auth} setAuth={setAuth} content={<ProductScreen/>} /> }/>
        <Route path={Path.userScreen} element={<Layout Auth={Auth} setAuth={setAuth} content={<UserScreen/>} /> }/>
        <Route path={Path.LoginScreen} element={<LoginScreen Auth = {Auth} setAuth={setAuth}/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
