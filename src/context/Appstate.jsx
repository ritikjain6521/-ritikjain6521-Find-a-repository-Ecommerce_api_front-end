import React ,{useEffect,useState} from 'react';
import Appcontext from './Appcontext';
import axios from 'axios'
import { ToastContainer, toast,Bounce } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


const Appstate = (props) => {

const url = "https://ecommerce-api-back-end.onrender.com/api"
    const [products, setproduct] = useState([])
    const [token, settoken] = useState([])
    const [IsAuthenticated, setIsAuthenticated] = useState([false])
    const [filterdata, setfilterdata] = useState([]);
    const [user, setuser] = useState();
    const [cart,setcart] =useState([]);
    const [reload,setreload] =useState([false]);
     const [userAddress,setuserAddress] =useState([]);
       const [userOrder,setuserOrder] =useState([]);
         const [allUsers, setAllUsers] = useState([]);
          const [allOrder, setAllOrder] = useState([]);
       


    useEffect(()=>{
        const fecthProduct = async()=>{

            const api = await axios.get(`${url}/product/all`,{

          headers:{
            "Content-Type":"Application/json"

          },
         withCredentials:true

            })
        console.log("products",api.data.products)
        setproduct(api.data.products)
        setfilterdata(api.data.products)
       

        
        }
    
        fecthProduct();
        userCart();
        getAddress();
        getUserOrders();
        AllUsers();
       Profile();
       AllOrders();

    },[token,reload] );

    useEffect(()=>{
      

  let lstoken =localStorage.getItem("token");

   if(lstoken) {

  settoken(lstoken);
  setIsAuthenticated(true);


   }   
  }
,[] );
  const addProduct= async(
    title,
    description,
    price,
    imgSrc,
    category,
    qty
  ) => {
    const api = await axios.post(
      `${url}/product/add`,
      { title, description, price, imgSrc, category, qty },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setreload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

//all orders
  const AllOrders = async () => {
    const api = await axios.get(`${url}/payment/allorders`,{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // setUserOrder(api.data.orders);
    setAllOrder(api.data.orders);
     console.log("orders",api.data.orders)
  };

 const getUserOrders= async()=>{

            const api = await axios.get(`${url}/payment/orders`,{

          headers:{
            "Content-Type":"Application/json",
            Auth:token

          },
         withCredentials:true

            })
       //console.log("user order", api.data);
       
  setuserOrder(api.data.orders)
       
   console.log("user order=",api.data.orders)   
}





 // editProduct 
 const editProuduct = async (
    id,
    title,
    description,
    price,
    imgSrc,
    category,
    qty
  ) => {
    const api = await axios.put(
      `${url}/product/${id}`,
      { title, description, price, imgSrc, category, qty },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setreload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };
  // deleteproduct
  const deleteProduct = async (id) => {
    const api = await axios.delete(`${url}/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setreload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

// register user
  const register = async(name,email,password)=>{

      const api = await axios.post(`${url}/user/register`,{name,email,password},{

    headers:{
      "Content-Type":"Application/json",

    },
   withCredentials:true

      }
    );
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    return api.data;
      //alert(api.data.message)
  };
  
  // login user
  const  Login = async(email,password)=>{

    const api = await axios.post(`${url}/user/login`,{email,password},{

  headers:{
    "Content-Type":"Application/json",

  },
 withCredentials:true

    }
  );
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
    console.log("user login",api.data)
    settoken(api.data.token)
    setIsAuthenticated(true)
    localStorage.setItem('token',api.data.token)
  return api.data;
  
    //alert(api.data.message)
};
// Logout
const Logout = async () =>{
 setIsAuthenticated(false)
settoken("")
localStorage.removeItem('token');
toast.success("Logout successfully", {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
  });



}

// user profile
const Profile = async()=>{

  const api = await axios.get(`${url}/user/profile`,{

headers:{
  "Content-Type":"Application/json",
  "Auth":token

},
withCredentials:true

  })
  setuser(api.data.user)
  console.log("ritikjain",api.data.user)
  

//console.log(api.data)
}
// add to cart
const Addtocart = async(productId,title,price,qty,imgSrc)=>{

  const api = await axios.post(`${url}/cart/add`,{productId,title,price,qty,imgSrc},{

headers:{
  "Content-Type":"Application/json",
  Auth:token,

},
withCredentials:true

  })

  setreload(!reload);
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });

//console.log("my cart", api);
setcart(api.data.cart)


};
// remove qty
const decreaseqty = async(productId,qty)=>{

  const api = await axios.post(`${url}/cart/--qty`,{productId,qty},{

headers:{
  "Content-Type":"Application/json",
  "Auth":token,

},
withCredentials:true

  })
  
  setreload(!reload);
  console.log("itme decrese",api);

  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });

//console.log(api.data)
}
// usercart
const userCart = async()=>{

  const api = await axios.get(`${url}/cart/user`,{

headers:{
  "Content-Type":"Application/json",
  Auth:token,

},
withCredentials:true


  });
  
  
  setcart(api.data.cart);

  

//console.log("my cart", api);


};
// removeformcat 
const removeformcart = async(productId)=>{

  const api = await axios.delete(`${url}/cart/remove/${productId}`,{

headers:{
  "Content-Type":"Application/json",
  "Auth":token,

},
withCredentials:true

  })
  
  setreload(!reload);
  console.log("remove item form cart",api);

  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });

console.log(api.data)
}
// clearcart
const clearcart = async()=>{

  const api = await axios.delete(`${url}/cart/clear`,{

headers:{
  "Content-Type":"Application/json",
  "Auth":token,

},
withCredentials:true

  })
  
  setreload(!reload);
  console.log("remove item form cart",api);

  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });

console.log(api.data)
}
// shippingAddress
const shippingAddress = async(fullname,address,city,state,contury,pincode,mobileno)=> {

  const api = await axios.post(`${url}/address/add`,{fullname,address,city,state,contury,pincode,mobileno},{

headers:{
  "Content-Type":"Application/json",
  "Auth":token,

},
withCredentials:true

  })
  
  setreload(!reload);
  console.log("remove item form cart",api);

  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });

   return api.data
}
// getAddress
 const getAddress = async()=>{

            const api = await axios.get(`${url}/address/get`,{

          headers:{
            "Content-Type":"Application/json",
            Auth:token

          },
         withCredentials:true

            })
       console.log("user Address", api.data);
       
        setuserAddress(api.data.userAddress)
       
      
}
// user_order

//get all users
   const AllUsers = async () => {
    const api = await axios.get(`${url}/user/all`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    // setUserOrder(api.data.orders);
    // setAllOrder(api.data.orders);
    console.log("user",api.data)
    setAllUsers(api.data)
  };


  


  return (
    <Appcontext.Provider value={{products,register,Login,IsAuthenticated,setIsAuthenticated,url,token,filterdata,setfilterdata,Logout,setuser,user,Addtocart,cart,decreaseqty,removeformcart,shippingAddress,userAddress,clearcart,userOrder
      ,editProuduct,deleteProduct,addProduct,allUsers,allOrder
    }}>{props.children}</Appcontext.Provider>
  )
}

export default Appstate;
