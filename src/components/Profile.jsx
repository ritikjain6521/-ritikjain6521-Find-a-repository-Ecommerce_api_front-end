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
            <table className="table table-dark table-bordered border-primary">
              <thead>
                <tr className="text-center">
                  <th scope="col">orderItems</th>
                  <th scope="col"> OrderDetails & ShippingAddress</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((products) => (
                  <tr key={products._id}>
                    <th>
                      <OrderDetail
                        orders={products?.orderitems}
                        totalAmount={products?.amount}
                      />
                    </th>
                    <td scope="row">
                      <ul>
                        <li>
                          <span style={{ fontWeight: "bold" }}>
                            Order Id :{" "}
                          </span>
                          {products?.orderId}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>
                            PaymentId :{" "}
                          </span>
                          {products?.paymentId}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>
                            OrderDate :{" "}
                          </span>
                          {products?.orderDate}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>Name : </span>
                          {products?.userShipping?.fullname}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>Phone : </span>
                          {products?.userShipping?.mobileno}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>State : </span>
                          {products?.userShipping?.state}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>City : </span>
                          {products?.userShipping?.city}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>PinCode : </span>
                          {products?.userShipping?.pincode}
                        </li>
                        <li>
                          <span style={{ fontWeight: "bold" }}>Near By : </span>
                          {products?.userShipping?.address}
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;