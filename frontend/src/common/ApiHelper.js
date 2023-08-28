import axios from "axios"

class ApiHELPER{
    constructor(){
  
        this.baseUrl = "http://localhost:5000"
        this.token = localStorage.getItem("token")
        // axios.interceptors.request.use(function(config){
        //     return config
        // })
    }

    fetchProduct(){
        return axios.get(this.baseUrl +'/product')
    }
    fetchProductById(id){
      return axios.get(this.baseUrl + "/product/" + id)
    }
    userLogin(data){
        return axios.post(this.baseUrl + "/user/login", data)
    }
    RegisterUser(data){
        return axios.post(this.baseUrl + "/registration",data)
    }
    fetchCart(products){
        return axios.post(`${this.baseUrl}/cart`,{products:products})
    }

    createOrder(OrderDetails){
     
        return axios.post(`${this.baseUrl}/order/create`, OrderDetails, {
            headers:{token:this.token}
        })
    }
    verifyPayment(data){
        return axios.post(`${this.baseUrl}/payment/verify`, data, {headers:{token:this.token}})
    }
    
}
const apiHELPER = new ApiHELPER()
export default apiHELPER;