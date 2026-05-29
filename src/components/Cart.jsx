import React from 'react';
import { useContext } from 'react'
import Appcontext from '../context/Appcontext'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

const Cart=()=> {
  const {cart,decreaseqty,Addtocart,removeformcart,clearcart}= useContext(Appcontext);
 const [qty, setqty] = useState(0);
 const [price, setprice] = useState(0);
const navigate= useNavigate();

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





 }, [cart] ) 

 
  return (
    <>
    {cart?.items?.length == 0 ?(
     <>
     <div className='text-center my-5'>
      <button className=' btn btn-warning mx-3'style={{fontWeight:'bold',fontSize:'1.2rem'}}
       onClick={()=>navigate('/')}
      >Continue Shoping</button>
     </div>
     
     </>

    ):(
     <>
      <div className="my-5 text-center">
     <button className=' btn btn-info mx-3'style={{fontWeight:'bold',fontSize:'1.2rem'}}>Total qty: {qty}</button>
     <button className=' btn btn-warning mx-3'style={{fontWeight:'bold',fontSize:'1.2rem'}}>Total qty: {price}</button>


    </div>
     </>
    )}

   
    {cart?.items?.map((products)=><div key={products._id} className='container p-3 bg-dark my-5 text-center'>
      <div className="d-flex flex-column flex-md-row justify-content-around align-items-center gap-3">
   <div className="cart_img">
   <img src={products.imgSrc} alt="" style={{width:'100px',height:'100px',borderRadius:'10px'}} />

   </div>
  <div className="cart_das">
     <h2>{products.title}</h2>
     <h4> {products.price}</h4>
     <h4>Qty :-{products.qty}</h4>    
  </div>
    <div className="cartaction d-flex flex-wrap justify-content-center gap-2 mt-3 mt-md-0">

  <button className="btn btn-warning" style={{fontWeight:'bold'}}
  onClick={()=>decreaseqty(products?.productId,1)}
  
  >Qty--</button>


  <button className="btn btn-info"style={{fontWeight:'bold'}}
onClick={()=>Addtocart(products?.productId,products?.title,products?.price/products.qty,1,products?.imgSrc)}>

 Qty++</button>
  <button className="btn btn-danger"style={{fontWeight:'bold'}}
  onClick={()=>
  {
    if(confirm("Are you soure,that remove from cart")){
      removeformcart(products?.productId)}
    }
    
  
  
  }

  >
  Remove
  </button>
  
    </div>

      </div>
    
    </div>) }
    {cart?.items.length>0 && (
    
    <div className="contanier text-center">

<button className='btn btn-warning mx-3'style={{fontWeight:'bold'}} 
onClick={()=>navigate("/Address")}>
  
  
  checkout</button>
<button className='btn btn-danger  mx-3'style={{fontWeight:'bold'}}

onClick={()=>{

  if(confirm("Are you sure, want to clear cart...?")){

    clearcart();
  }

}}


>clearcart</button>

    </div>
    )}
    </>
  )
}
  
export default Cart
