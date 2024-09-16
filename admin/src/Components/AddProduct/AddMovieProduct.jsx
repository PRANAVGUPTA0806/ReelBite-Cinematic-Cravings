import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddMovieProduct = () => {

    const [image,setImage]=useState(false);
    const [productDetails,setProductDetails]=useState({
        productName:"",
        category:"",
        productDescription:"",
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

        await fetch('http://localhost:8000/upload/image',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data})

        if (responseData.success){
            product.image=responseData.image_url;
            console.log(product)
            await fetch('http://localhost:8000/api/moviesproducts/',
                {
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(product),
                }
            ).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
                setProductDetails({
                  productName:"",
                  category:"",
                  productDescription:"",
                  productPrice:"",
                  available:true,
                  
          
              })
              setImage(false);
            })
        }
    }
  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input type="text" value={productDetails.productName} onChange={changeHandler} name='productName' placeholder='Type product name here ' />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Description</p>
        <input type="text" value={productDetails.productDescription} onChange={changeHandler}  name='productDescription' placeholder='Type product desc. here ' />
      </div>
      <div className="addproduct-price">
      <div className="addproduct-itemfield">
        <p>Product Price</p>
        <input type="text" value={productDetails.productPrice} onChange={changeHandler}  name='productPrice' placeholder='Type product price here ' />
      </div>
      </div>
      <div className="addproduct-itemfield">
      <p>Product Category</p>
      <input type="text" value={productDetails.category} onChange={changeHandler}  name='category' placeholder='Type product genre here ' />
      {/* <select name="category" className='add-product-selector'>
      <option value="Horror">Horror</option>
      <option value="Science fiction">Science fiction</option>
      <option value="Thriller">Thriller</option>
      <option value="Comedy">Comedy</option>
      <option value="Action">Action</option>
      <option value="Romance">Romance</option>
      <option value="Drama">Drama</option>
      <option value="Adventure">Adventure</option>
      </select> */}
      </div>
      <div className="addproduct-itemfield">
      <p>Product Available</p>
      <select name="available" value={productDetails.available} onChange={changeHandler} className='add-product-selector'>
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

export default AddMovieProduct
