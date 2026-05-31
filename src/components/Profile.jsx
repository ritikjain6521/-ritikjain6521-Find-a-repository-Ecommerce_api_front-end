import React, { useContext, useEffect, useState } from "react";
import Appcontext from "../context/Appcontext";
import OrderDetail from "./OrderDetail";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const { user, userOrder, allOrder } = useContext(Appcontext);
  const location = useLocation();
  const [products,setproduct] = useState()

  useEffect(() => {
    // let p = ;
    // console.log(p)
    setproduct(location.pathname.includes("/admin") ? allOrder : userOrder);
    // console.log("at profile admin ",p);
  }, [location.pathname,allOrder,userOrder]);
  console.log("at profile product",products);

  return ( 
    <>
    {!location.pathname.includes('/admin') && (

      <div className="container text-center my-3">
        <h2>Welcome , {user?.name}</h2>
        <h3>{user?.email}</h3>
      </div>
      )}

      {products?.length != 0 && (
        <>
        <h1 className="text-center my-3">Total Order's = {products?.length}</h1>

          <div className="container my-5">
            {products?.map((product) => (
              <div 
                key={product._id} 
                className="order-card-responsive mb-4 p-3 p-md-4" 
                style={{ 
                  border: "1px solid hsla(293, 82%, 50%, 0.5)", 
                  borderRadius: "12px", 
                  background: "linear-gradient(145deg, hsl(293, 60%, 10%), hsl(270, 60%, 8%))" 
                }}
              >
                <div className="row">
                  {/* Left Side - Order Items */}
                  <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                    <h5 className="text-center text-light mb-3" style={{ color: "#e9d5ff" }}>🛒 Order Items</h5>
                    <OrderDetail
                      orders={product?.orderitems}
                      totalAmount={product?.amount}
                    />
                  </div>

                  {/* Right Side - Shipping Details */}
                  <div className="col-lg-5 col-md-12">
                    <h5 className="text-center text-light mb-3" style={{ color: "#e9d5ff" }}>📍 Order Details & Shipping</h5>
                    <div 
                      className="shipping-details p-3" 
                      style={{ 
                        backgroundColor: "hsla(270, 50%, 15%, 0.5)", 
                        borderRadius: "8px",
                        border: "1px solid hsla(293, 40%, 30%, 0.5)"
                      }}
                    >
                      <ul className="list-unstyled mb-0 text-light" style={{ fontSize: "0.95rem", lineHeight: "1.9" }}>
                        <li>
                          <span style={{ color: "#c4b5fd", fontWeight: "bold", width: "100px", display: "inline-block" }}>Order Id : </span>
                          <span style={{ wordBreak: "break-all" }}>{product?.orderId}</span>
                        </li>
                        <li>
                          <span style={{ color: "#c4b5fd", fontWeight: "bold", width: "100px", display: "inline-block" }}>PaymentId : </span>
                          <span style={{ wordBreak: "break-all" }}>{product?.paymentId}</span>
                        </li>
                        <li>
                          <span style={{ color: "#c4b5fd", fontWeight: "bold", width: "100px", display: "inline-block" }}>OrderDate : </span>
                          {product?.orderDate ? new Date(product.orderDate).toLocaleDateString() : "—"}
                        </li>
                        <hr style={{ borderColor: "hsla(293, 40%, 50%, 0.3)", margin: "10px 0" }} />
                        <li>
                          <span style={{ color: "#c4b5fd", fontWeight: "bold", width: "100px", display: "inline-block" }}>Name : </span>
                          {product?.userShipping?.fullname}
                        </li>
                        <li>
                          <span style={{ color: "#c4b5fd", fontWeight: "bold", width: "100px", display: "inline-block" }}>Phone : </span>
                          {product?.userShipping?.mobileno}
                        </li>
                        <li>
                          <span style={{ color: "#c4b5fd", fontWeight: "bold", width: "100px", display: "inline-block" }}>Address : </span>
                          {product?.userShipping?.address}, {product?.userShipping?.city}, {product?.userShipping?.state} - {product?.userShipping?.pincode}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;