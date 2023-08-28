import { Link } from "react-router-dom"
import Rating from "./Rating"


export default function ProductCard(props){
    
 const {p}=props

 
    return(
        <>
         <div className="d-flex flex-wrap gap-5 justify-content-center mt-5">
            <Link to ={`/product/${p._id}`}>
            <div className="card " style={{ width: "18rem" }}>
                <img src={p.image} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                    <p className="Brand text-primary fw-bold text-center">{p.brand}</p>
                    <p className="item-name text-center">{p.category}</p>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                       <Rating rating={p.rating} />
                        <p className="numReviews pt-3">{p.numReviews}</p>
                    </div>
                    <span className="text-primary fs-4">{p.price}</span>
                </div>
            </div>
            </Link>
        </div>
        </>
    )
}