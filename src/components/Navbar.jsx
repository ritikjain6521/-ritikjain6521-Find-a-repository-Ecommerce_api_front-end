import { useState } from 'react'
import { Link,useLocation,useNavigate} from 'react-router-dom'
import Appcontext from '../context/Appcontext'
import { useContext } from 'react'



const Navbar=()=> {
  const [searchterm, setsearchterm] = useState(" ")
  const navigate = useNavigate()
  const {setfilterdata,products,Logout,IsAuthenticated,cart} = useContext(Appcontext);
  const location = useLocation()
  const filterbyCategory = (cat) =>{
    setfilterdata(products.filter((data)=>data.category.toLowerCase() == cat.toLowerCase()));

    
  };
  const filterbyprice = (price) =>{
    setfilterdata(products.filter((data)=>data.price >= price.toLowerCase() ));

   
 };
    const submitHandler = (e) =>{
 e.preventDefault();
     navigate(`/product/search/${searchterm}`);
     setsearchterm(" ")
  };
  return (
    <>
    <div className="nav sticky-top">
    <div className="nav_bar">
        {location.pathname.includes("/admin") ? (
                   <>
                     <Link
                       to={"/admin"}
                       className="left"
                       style={{ textDecoration: "none", color: "white" }}
                     >
                       {"Admin Panel"}
                     </Link>
                   </>
                )  : (
  
       <>
                   <Link
                     to={"/"}
                     className="left"
                     style={{ textDecoration: "none", color: "white" }}
                   >
                     {"ABH SHOP"}
                   </Link>
                 </>
               )}
      <form className="search" onSubmit={submitHandler}>
      <span className="material-symbols-outlined">
search
</span>{""}
<input value={searchterm} onChange={(e)=>setsearchterm(e.target.value) }type="text" placeholder='Search Products.... '/>


      </form>
      <div className="right">
        {!location.pathname.includes("/admin")&&(
         <>
         
         {!IsAuthenticated && (
         
          <>
                             <Link to={"/login"} className="btn btn-info mx-2">
                               Login
                             </Link>
                             <Link to={"/register"} className="btn btn-secondary mx-2">
                               SignUp
                             </Link>
                           </>
                         )}
         
        



        {IsAuthenticated && (
       <>
     <Link to={"/cart"} type="button" className="btn btn-primary position-relative mx-3">
     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F3F3F3"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>
 
      {cart?.items?.length > 0 && (

        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
   {cart?.items?.length}
    <span className="visually-hidden">unread messages</span>
  </span>


      )}
 

</Link>
          <Link to={'/Profile'} className="btn btn-info mx-3 ">profile</Link>
          
         
          <button className="btn btn-danger mx-3"onClick={()=>{
                 Logout();
                    navigate('/');


          }}>Logout</button>
             <Link
                      to={"/admin"}
                      className="btn btn-info mx-2"
                      style={{ fontWeight: "bold" }}
                    >
                      Admin
                    </Link>
          
       </>

  )}
  </> 
  )}
       
    
    {location.pathname.includes("/admin") && (
                 <>
                   <Link to={"/"} className="btn btn-info mx-2">
                     Go To Home
                   </Link>
                   <Link to={"/admin/add"} className="btn btn-warning mx-2">
                     Add Product
                   </Link>
                   <Link to={"/admin/allorder"} className="btn btn-secondary mx-2">
                     All Order
                   </Link>
                   <Link to={"/admin/allusers"} className="btn btn-info mx-2">
                     All Users
                   </Link>
                 </>
               )}
        

         
       
        </div>
      </div>
      
    
     
       { location.pathname == "/" &&(
   
    <div className="sub_br">
      <div className="items " onClick={()=> setfilterdata(products)}>No filer</div>
      <div className="items"onClick={()=> filterbyCategory("Mobile")}>Mobile</div>
      <div className="items"onClick={()=> filterbyCategory("leptop")}>leptop</div>
      <div className="items"onClick={()=> filterbyCategory("HP Leptop bug")}>Leptop Begg</div>
            <div className="items"onClick={()=> filterbyCategory("Headphones")}>Noise Buds </div>
      <div className="items"onClick={()=> filterbyprice("10000")}>10000</div>
      <div className="items"onClick={()=> filterbyprice("15000")}>15000</div>
      <div className="items"onClick={()=> filterbyprice("20000")}>20000</div>
      <div className="items"onClick={()=> filterbyprice("30000")}>30000</div>
      <div className="items"onClick={()=> filterbyprice("17000")}>17000</div>
      <div className="items"onClick={()=> filterbyprice("1800")}>18000</div>
    </div>
            )}
     
    </div>
    
    </>
  )
}

export default Navbar