import React, { useEffect, useState } from 'react'
import './MovieProduct.css'
import removeicon from '../../assets/cross_icon.png'
import editicon from '../../assets/edit.png'

const MovieProduct = () => {
  const[allproducts,setAllProducts]=useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    product_id: -1,
    productName: '',
    productPrice: '',
    category: '',
    available: false,
    image: ''
  });
  const fetchInfo =async()=>{
    await fetch('http://localhost:8000/api/moviesproducts/all').then((res)=>res.json()).then((data)=>{
      setAllProducts(data)
    });
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const remove_product=async(product_id)=>{
    await fetch('http://localhost:8000/api/moviesproducts/del',{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({product_id:product_id})
    })
    await fetchInfo();
  }
  const editProduct = (product,product_id) => {
    setIsEditing(true);
    setCurrentProduct({
      ...product, // Copy all product fields
      product_id: product_id // Set the product_id explicitly
    });
    
  };
  const handleInputChange = (e) => {
    setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
  };

  const saveProduct = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/moviesproducts/edit', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProduct),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
  
      const data = await response.json();
      
      
      setIsEditing(false);
      alert("Product updated")
      await fetchInfo();  // Refresh the product list after editing
    } catch (error) {
      alert("Error updating product:", error)
      // console.error("Error updating product:", error);
      // Optionally, show an error message to the user
    }
  };
  

  return (
    <div className='list-product'>
      <h1>All Movies</h1>
      <div className="listproduct-format-main">
        <p>Movies</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Available</p>
        <p>Remove/Edit</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.productName}</p>
            <p>${product.productPrice}</p>
            <p>{product.category}</p>
            <p>{product.available?"true":"false"}</p>
            <div>
            <img onClick={()=>{remove_product(product.product_id)}} className='listproduct-remove-icon' src={removeicon} alt="" />
            <img  onClick={() => editProduct(product,product.product_id)} className='listproduct-remove-icon' src={editicon} alt="" />
            </div>
          </div>
          <hr />
          </>
        })}
      </div>
     
     {/* Edit Form */}
     {isEditing && (
      <div className='edit-product'>
        <h2>Edit Product</h2>
        <label>Title:</label>
        <input
          type='text'
          name='productName'
          value={currentProduct.productName}
          onChange={handleInputChange}
        />
        <label>Price:</label>
        <input
          type='text'
          name='productPrice'
          value={currentProduct.productPrice}
          onChange={handleInputChange}
        />
        <label>Category:</label>
        <input
          type='text'
          name='category'
          value={currentProduct.category}
          onChange={handleInputChange}
        />
        <label>Available:</label>
        <input
          type='checkbox'
          name='available'
          checked={currentProduct.available}
          onChange={() =>
            setCurrentProduct({
              ...currentProduct,
              available: !currentProduct.available,
            })
          }
        />
        <label>Image URL:</label>
        <input
          type='text'
          name='image'
          value={currentProduct.image}
          onChange={handleInputChange}
        />
        <button onClick={saveProduct}>Save Changes</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    )}
  </div>

  )
}

export default MovieProduct