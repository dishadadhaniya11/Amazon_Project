import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import apiHELPER from "../common/ApiHelper";
import Loader from "../component/Loader";
import MessageBox from "../component/MessageBox";

export default function Design() {

    const [products, setProduct] = useState([])
    const [isLoading, setisLoding] = useState(false)
    const [error, seterror] = useState()

    const GetProducts = async () => {
        try {
            setisLoding(true)
            const result = await apiHELPER.fetchProduct()
            if(result.status === 200){
                setProduct(result.data.product)
            }
            setisLoding(false)
        } catch (error) {
            setisLoding(false)
            if(error.response && error.response.data.message){
                console.log(error.response.data.message);
            }
            seterror(error.message)
        }
    }
    
    useEffect(() => {
        GetProducts()

    }, [])
    
    const FetchProducts = async () => {
        try {

            const result = await apiHELPER.fetchProduct()

            if (result) {
                setProduct(result.data.product)
            }
        } catch (error) {
            if(error.data && error.data.message){
                seterror(error.message)
            }
            return
        }
    }

    useEffect(() => {
        FetchProducts()

    }, [])

    return (
        <div>
             
          <Loader isLoading= {isLoading}/>
          <MessageBox error = {error} seterror={seterror}/>
            <h5 className="m-5">Featur Product</h5>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
                { products && products.map((x) => {
                    return <ProductCard key={x._id} p={x} />
                })}
            </div>

        </div>
    )
}