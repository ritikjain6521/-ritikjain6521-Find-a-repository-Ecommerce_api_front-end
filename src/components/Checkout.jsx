import React from 'react';
import { useContext } from 'react'
import Appcontext from '../context/Appcontext';
import TableProduct from './TableProduct';
import { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Checkout=()=> {
  const {cart,userAddress,url,user ,clearcart}= useContext(Appcontext);
   const [qty, setqty] = useState(0);
   const [price, setprice] = useState(0);
  const navigate = useNavigate()
  
   useEffect(() => {
  
    let qty = 0;
    let price = 0;
    if(cart?.items){
     for(let  i=0; i<cart.items?.length; i++){
       
       qty += cart.items[i].qty
       price += cart.items[i].price
  
      
      
  
     }
  
    setprice(price)
    setqty(qty)
     
  
  
    }
  
  
  
  
  
   }, [cart] ) ;
   const handlePayment = async () =>{
     try{
     const OrderRespons = await axios.post(`${url}/payment/checkout`,{

        amount:price,
        qty:qty,
        cartitems : cart?.items,
       userShipping: userAddress,
       userid:user._id


     });
     console.log("order response",OrderRespons)
     const{orderId, amount:orderAmount}= OrderRespons.data;
      var options = {
    "key": "rzp_test_Sv7JoVGcWffis8", // Enter the Key ID generated from the Dashboard
    "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Rj devloper",
    "description": "Rj Devloper",
 
    "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": async function (response){
       const paymentData ={
           orderId :response.razorpay_order_id,
          paymentId :response.razorpay_payment_id,
           signature:response.razorpay_signature,
            amount:orderAmount,
            orderitems:cart?.items,
            userid:user._id,
            userShipping:userAddress,


       };
        const api = await axios.post(`${url}/payment/verify-payment`,paymentData);{
              console.log("razorpay res",api.data)
              if(api.data.success){
                clearcart();
            navigate("/orderconfirmation");
              

              }
             

        }
    },
    "prefill": {
        "name": "Rj devloper",
        "email": "Rjdevloper@gmail.com",
        "contact": "9993671347"
    },
    "notes": {
        "address": "Bhainsdehi"
    },
    "theme": {
        "color": "#3399cc"
    }
};
    const rzp = new window.Razorpay(options);
      rzp.open();
     
     }
   catch (error){

       console.log(error)

   }


   }
  
 
  return (  
    <>
   <div className="container  my-3">

    <h1 className='text-center'>Order Summary</h1>
    
   <table className="table table-bordered border-primary">
  <thead>
    <tr>
      <th scope="col"className='bg-dark text-light text-center'>Product Details</th>
      <th scope="col"className='bg-dark text-light text-center'>Shipping Address</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
       <td className='bg-dark text-light'> 

           <TableProduct cart= {cart} />




       </td>
      <td className='bg-dark text-light'>
        <ul style={{fontWeight:"bold"}}>
          <li>FullName:{" "}{userAddress?.fullname}</li>
             <li>country:{" "}{userAddress?.contury}</li>
          <li>MoblieNumber:{" "} {userAddress?.mobileno}</li>
          <li>City:{" "} {userAddress?.city}</li>
          <li>State:{" "} {userAddress?.state}</li>
          <li>Pincode: {" "}{userAddress?.pincode}</li>
           <li>NearBy Address:{" "} {userAddress?.address}</li>


        </ul>





      </td>
      
    </tr>
    

  </tbody>
</table>
      </div>
      <div className="container text-center my-5">

      <button className='btn btn-secondary btn-lg'style={{fontWeight:"bold"}}
      onClick={handlePayment}
      
      > Proccess to Pay</button>




      </div>
    </>
      
  )
}
  
export default Checkout
