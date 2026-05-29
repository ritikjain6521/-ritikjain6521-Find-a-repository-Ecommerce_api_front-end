import React,{useContext,useEffect,useState} from 'react'
import Appcontext from '../context/Appcontext';


const TableProduct = ({cart}) => {
    const {decreaseqty,Addtocart,removeformcart,clearcart}= useContext(Appcontext);
 const [qty, setqty] = useState(0);
 const [price, setprice] = useState(0);
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
    <div className="table-responsive">
    <table className="table table-bordered border-primary text-center">
  <thead>
    <tr>
      <th scope="col"className='bg-dark text-light'>Product Img</th>
      <th scope="col"className='bg-dark text-light'>Title</th>
      <th scope="col"className='bg-dark text-light'> Price</th>
      <th scope="col"className='bg-dark text-light'>Qty</th>
      <th scope="col"className='bg-dark text-light'>Qty++</th>
      <th scope="col"className='bg-dark text-light'>Qty--</th>
      <th scope="col"className='bg-dark text-light'>Remove</th>
    </tr>
  </thead>
  <tbody>
      {cart?.items?.map((products)=> (
      <tr key={products._id}>
      <th scope="row "className='bg-dark text-light'>
        
        <img src={products.imgSrc} style={{width:'50px',hight:'50px'}} />
        
        </th> 
      <td className='bg-dark text-light'>{products.title}</td>
      <td className='bg-dark text-light'>{products.price}</td>
      <td className='bg-dark text-light'>{products.qty}</td>
        <td className='bg-dark text-light'> <span className="material-symbols-outlined"onClick={()=>Addtocart(products?.productId,products?.title,products?.price/products.qty,1,products?.imgSrc)}>add_circle</span>
</td>
          <td className='bg-dark text-light'  onClick={()=>decreaseqty(products?.productId,1)}><span className="material-symbols-outlined">
do_not_disturb_on
</span></td>
            <td className='bg-dark text-light' onClick={()=>
  {
    if(confirm("Are you soure,that remove from cart")){
      removeformcart(products?.productId)}
    }
    
  
  
  }><span className="material-symbols-outlined">
delete
</span> </td>
    </tr>
))}
      <tr>
      <th scope="row "className='bg-dark text-light'>
        
       
        
        </th> 
      <td className='bg-dark text-light'><button className='btn btn-primary'style={{fontWeight:'bold'}}>Total</button></td>
      <td className='bg-dark text-light'><button className='btn btn-warning'style={{fontWeight:'bold'}}>{price}</button></td>
      <td className='bg-dark text-light'><button className='btn btn-info'style={{fontWeight:'bold'}}>{qty}</button></td>
        <td className='bg-dark text-light'></td>
          <td className='bg-dark text-light'></td>
            <td className='bg-dark text-light'></td>
    </tr>
  
  </tbody>
</table>
</div>
    
    
    
    
    
     </>
  )
}

export default TableProduct