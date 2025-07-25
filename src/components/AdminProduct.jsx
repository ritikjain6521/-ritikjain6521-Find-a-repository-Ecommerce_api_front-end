import React, { useContext } from "react";
import Appcontext from "../context/Appcontext";
import { Link, useNavigate } from "react-router-dom";

const AdminProduct = () => {
  const { products, deleteProduct } = useContext(Appcontext);
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        {products?.map((products)=> (
          <div key={products.id}>
            <div
              className="container bg-dark my-5 p-3 admin text-center"
              style={{ borderRadius: "10px" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={products.imgSrc}
                  alt="..."
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "10px",
                    border: "2px solid yellow",
                  }}
                />
              </div>
              <div style={{width:'500px'}}>
                <h3>{products.title}</h3>
                <p>{products.description}</p>
                <span>{products.createdAt}</span>
              </div>
              <div>
                <button
                  className="btn btn-warning mx-5"
                  onClick={()=>navigate(`/admin/edit/${products._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={async () => {
                    if (confirm("Are you sure, want to delete")) {
                      const result = await deleteProduct(products._id);
                      console.log("deleted Result ", result);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminProduct;