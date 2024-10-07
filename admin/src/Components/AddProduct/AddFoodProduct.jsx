import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'


const AddFoodProduct = () => {
  const [image,setImage]=useState(false);
  const [productDetails,setProductDetails]=useState({
    productName:"",
    productPrice:"",
    available:true,
    

});
    const imageHandler=(e)=>{
        setImage(e.target.files[0]);
    }
    const changeHandler=(e)=>{
      setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const Add_Product=async()=>{
    console.log(productDetails);
    let responseData;
    let product=productDetails;

    let formData=new FormData();
    formData.append('product',image);
    const token = localStorage.getItem('auth-token'); // Retrieve the token
    
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }

    await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/image`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            
        },
        body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})

    if (responseData.success){
        product.image=responseData.image_url;
        console.log(product)
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/foodproducts/`,
            {
                method:'POST',
                headers:{
                    Accept:'application/json',
                    "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
                },
                body:JSON.stringify(product),
            }
        ).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Product Added"):alert("Failed")
            setProductDetails({
              productName:"",
              productPrice:"",
              available:true,
          })
          setImage(false);
        })
    }
}
  return (
    <div className='add-product'>
      <h1>Add Food Items</h1>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" value={productDetails.productName} onChange={changeHandler} name='productName' placeholder='Type product name here ' />
      </div>
      <div className="addproduct-price">
      <div className="addproduct-itemfield">
        <p>Product Price</p>
        <input type="text" value={productDetails.productPrice} onChange={changeHandler} name='productPrice' placeholder='Type product price here ' />
      </div>
      </div>
      <div className="addproduct-itemfield">
      <p>Product Available</p>
      <select value={productDetails.available} onChange={changeHandler} name="available" className='add-product-selector'>
      <option value="true">true</option>
      <option value="false">false</option>
      </select>
      </div>
      <div className="addproduct-itemfield">
      <label htmlFor="file-input">
        <img src={image?URL.createObjectURL(image):upload_area}  className='addproduct-thumbnail-img' alt="" />
      </label>
      <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn'>Add Product</button>
    </div>
  )
}

export default AddFoodProduct
