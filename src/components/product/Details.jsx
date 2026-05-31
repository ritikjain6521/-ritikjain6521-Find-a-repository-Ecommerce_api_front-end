
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Relatedproduct from './Relatedproduct';

const Details = () => {
  const [products, setproduct] = useState();
  const { id } = useParams();

  const url = "https://ecommerce-api-back-end-3.onrender.com/api"
  useEffect(() => {
    const fecthProduct = async () => {

      const api = await axios.get(`${url}/product/${id}`, {

        headers: {
          "Content-Type": "Application/json"

        },
        withCredentials: true

      })
      console.log(api.data.product);
      setproduct(api.data.product)

    }

    fecthProduct();

  }, [id]);
  return (


    <>

      <div className="container text-center my-5 row justify-content-center align-items-center mx-auto">
        <div className="left col-md-6 col-12 mb-4">
          <img src={products?.imgSrc} alt="" style={{ width: '250px', height: '250px', borderRadius: '10px', border: "2px solid yellow" }} />
        </div>
        <div className="right col-md-6 col-12">
          <h1>{products?.title}</h1>
          <p>{products?.description}</p>
          <h1>{products?.price} {" "}

            {"$"}
          </h1>
          {/*<h3>{products.category}</h3> */}
          <div className="my-3 d-flex justify-content-center flex-wrap gap-3">
            <button className='btn btn-danger' style={{ fontWeight: 'bold' }}>Buy Now</button>
            <button className='btn btn-warning' style={{ fontWeight: 'bold' }}>Add to cart</button>
          </div>
        </div>
      </div>



      <Relatedproduct category={products?.category} />
    </>
  );
};

export default Details
