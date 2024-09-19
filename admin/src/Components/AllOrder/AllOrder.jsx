import React, { useEffect, useState } from 'react'
import './AllOrder.css'
import removeicon from '../../assets/cross_icon.png'
import editicon from '../../assets/edit.png'
import Navbar from '../Navbar/Navbar'
import Admin from '../../Pages/Admin/Admin'
import Sidebar from '../Sidebar/Sidebar'

const AllOrder = () => {
  const[allproducts,setAllProducts]=useState([]);
  const fetchInfo =async()=>{
    const token = localStorage.getItem('auth-token'); // Retrieve the token
    
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
    await fetch('http://localhost:8000/api/admin/orders', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // Include token for authentication
        }}).then((res)=>res.json()).then((data)=>{
      setAllProducts(data)
    });
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  return (
    <div className='list-product'>
    
      <h1>All Orders</h1>
      <div className="listproduct-format-main">
        <p>ORDERS</p>
        <p>ID</p>
        <p>Details</p>
        <p>Total Price</p>
        <p>Payment Details </p>
      </div>
      <div className="listproduct-allproducts">
  <hr />
  {allproducts.map((order, index) => (
    <div key={index} className="listproduct-format-main listproduct-format">
   
        <p> {order._id}</p>
        {order.order_summary.items.map((item, i) => (
          <div key={i} className="listproduct-format-main listproduct-format">
            
            <p>Title:{item.productName}</p>
            <p>Price :${item.price}</p>
            <p>DESCRIPTION:{item.productDescription}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
        <p> ${order.order_summary.totalPrice}</p>
        <p>{order.order_summary.payment_status}</p>
        <p>Transaction Id:{order.transaction_id}</p>
        <p>{order.payment_method}</p>
     
      <hr />
    </div>
  ))}
</div>
  </div>

  )
}

export default AllOrder