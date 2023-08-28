import axios from "axios"

class ApiHelper {
    constructor() {
        this.baseURL = "http://localhost:5000"
        // this.baseURL = "http://192.168.29.30:5100"
    }

    AdminUserLogin() {
        return axios.get(`${this.baseURL}/admin/get/user`)
    }

    insertUser(userDetails){
        return axios.post(`${this.baseURL}/admin/insert/user`,userDetails)
    }

    deletUser(id){
        return axios.delete(`${this.baseURL}/admin/delete/user/${id}`)
    }
    loginUser(data){
        return axios.post(`${this.baseURL}/admin/login/user`,data)
    }

    updateUser(id,body){
        return axios.put(`${this.baseURL}/admin/update/user/${id}`,body)
    }

    showImages(){
        return axios.get(`${this.baseURL}/admin/show`)
    }

    uploadImages(File){
        return axios.post(`${this.baseURL}/admin/upload`,File)
    }
}   

const apiHelper = new ApiHelper()
export default apiHelper