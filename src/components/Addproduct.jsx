import React, { useContext, useState } from "react";
import Appcontext from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { addProduct}=useContext(Appcontext);
  const navigate = useNavigate()
  const [productData, setproductData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imgSrc: "",
    qty: "",
  });

  const onChangeHandler =  (e) => {
    const { name, value } = e.target;
    setproductData({ ...productData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      productData.category == "--Select Category--" ||
      productData.category == ""
    ) {
      alert("Please Select Category");
    } else {
      const { title, description, price, category, imgSrc, qty } = productData;
      const result = await addProduct(
        title,
        description,
        price,
        imgSrc,
        category,
        qty
      );
      // alert(result.message)

      setTimeout(() => {
        navigate('/admin')
      }, 2000);

      console.log("data added = ",result)
    }
  };

  return (
    <>
      <div className="addproduct-wrapper">
        <div className="addproduct-card">
          <h1 className="text-center addproduct-title">➕ Add Product</h1>
          <form onSubmit={onSubmitHandler} className="addproduct-form">
            <div className="mb-3">
              <label htmlFor="prod-title" className="form-label">Title</label>
              <input
                name="title"
                value={productData.title}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="prod-title"
                placeholder="Enter product title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prod-desc" className="form-label">Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={onChangeHandler}
                className="form-control bg-dark text-light"
                id="prod-desc"
                rows={3}
                placeholder="Enter product description"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prod-price" className="form-label">Price (₹)</label>
              <input
                name="price"
                value={productData.price}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="prod-price"
                placeholder="Enter price"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prod-category" className="form-label">Category</label>
              <select
                className="form-select bg-dark text-light"
                name="category"
                id="prod-category"
                value={productData.category}
                onChange={onChangeHandler}
                required
              >
                <option>--Select Category--</option>
                <option>Mobiles</option>
                <option>Laptops</option>
                <option>Tablets</option>
                <option>Cameras</option>
                <option>Headphones</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="prod-img" className="form-label">Image URL</label>
              <input
                name="imgSrc"
                value={productData.imgSrc}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="prod-img"
                placeholder="Paste image URL"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="prod-qty" className="form-label">Product Quantity</label>
              <input
                name="qty"
                value={productData.qty}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="prod-qty"
                placeholder="Enter quantity"
                required
              />
            </div>
            <div className="d-grid my-4">
              <button type="submit" className="btn btn-primary addproduct-submit">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;