import productModel from "./ProductModel.js";

// const products = [
//     {
//         // _id: '1',
//         name: 'Slim Shirt',
//         category: 'Shirts',
//         image: '/images/d1.jpg',
//         price: 60,
//         brand: ' Nike',
//         rating: 1,
//         numReviews: 10
//       },
//       {
//         // _id: '2',
//         name: 'Fit Shirt',
//         category: 'Shirts',
//         image: '/images/d2.jpg',
//         price: 50,
//         brand: ' Nike',
//         rating: 3.2,
//         numReviews: 5
//       },
//       {
//         // _id: '3',
//         name: 'Best Pants',
//         category: 'Pants',
//         image: '/images/d3.jpg',
//         price: 70,
//         brand: ' Nike',
//         rating: 2.5,
//         numReviews: 8
//       }, {
//         // _id: '4',
//         name: 'Best Pants',
//         category: 'Pants',
//         image: '/images/p1.jpg',
//         price: 70,
//         brand: ' Nike',
//         rating: 4.5,
//         numReviews: 8
//       }
// ]

class ProductController {


  async insertProduct(req, res) {
    try {
      const result = await productModel.insertMany(products)
      if (result) {
        return res.status(200).send({ message: "success", result: result })
      }

      return res.status(500).send({ message: "something went wrong" })

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "internal server error" })
    }
  }

  async getProduct(req, res) {
    // console.log("result");

    try {
      const result = await productModel.find({})

      if (result) {
        return res.status(200).send({ message: "success", product: result })

      }
      return res.status(500).send({ message: "something went wrong" })

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "internal server error" })
    }
  }

  async getProductById(req, res) {

    try {
      const { id } = req.params
      // console.log(id);
      if (!id) {
        return res.status(400).send({ message: "Bad request" })
      }
      const result = await productModel.findById({ _id: id })
      if (result) {

        return res.status(200).send({ message: "success", result: result })

      }
      return res.status(500).send({ message: "something went wrong" })

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "internal server error" })
    }


  }

  async Getcart(req, res) {
    try {
      const { products } = req.body
      if (!products) {
        return res.status(400).send({ message: "Missing dependency products" })
      }
      const result = await productModel.find({_id:products}).select(["name","price","_id","category","brand","countInStock","image"])
      
      if (!result) {
        return res.status(500).send({ message: "Something went wrong" })
      }
      return res.status(200).send({message:"sucsess", products:result})
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "internal server error" })
    }
  }
}

const productcontroller = new ProductController()

export default productcontroller;