import React, { useEffect, useState } from 'react'
import '../MovieProduct/MovieProduct.css'
import removeicon from '../../assets/cross_icon.png'
import editicon from '../../assets/edit.png'


const FoodProduct = () => {
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
  const handleDelete = (product_id) => {
    const confirmDelete = window.confirm("Do you really want to delete this product?");
    if (confirmDelete) {
      remove_product(product_id); // Pass the product_id directly
    }
  };
  
    const handleUpdate = () => {
      const confirmEditing = window.confirm("Do you really want to edit it");
      if(confirmEditing){
        saveProduct();
      }
      else{
        setIsEditing(false);
      }
      
        
    };
  const fetchInfo =async()=>{
    const token = localStorage.getItem('auth-token'); // Retrieve the token
    
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/foodproducts/all1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
      },
    }).then((res)=>res.json()).then((data)=>{
      setAllProducts(data)
    });
  }
  useEffect(()=>{
    fetchInfo();
  },[])
  const remove_product = async (product_id) => {
  
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/foodproducts/del`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({ product_id }), // Shortened object syntax
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`); // Error handling
      }
  
      await fetchInfo(); // Refresh product list after deletion
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Error deleting product:", error); // Log any errors
      alert("Failed to delete the product.");
    }
  };
  

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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/foodproducts/edit`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
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
      setIsEditing(false);
      alert("Error updating product:", error)
    }
  };
  

  return (
    
    <div className='list-product'>
      <h1>All Food Products</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Edit</p>
        <p>Available</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index)=>{
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" style={{ width: '150px', height: '90px' }}  />
            <p>{product.productName}</p>
            <p>${product.productPrice}</p>
            <img  onClick={() =>{editProduct(product,product.products_id)}} className='listproduct-remove-icon' src={editicon} alt="" />
            <p>{product.available?"true":"false"}</p>
            <img onClick={() => {
      handleDelete(product.products_id);
    }} className='listproduct-remove-icon' src={removeicon} alt="" />
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
        <button onClick={handleUpdate}>Save Changes</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    )}
  </div>
  
  )
}

export default FoodProduct
