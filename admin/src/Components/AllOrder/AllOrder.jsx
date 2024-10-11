import React, { useEffect, useState } from 'react';
import './AllOrder.css';
import removeicon from '../../assets/cross_icon.png';
import editicon from '../../assets/edit.png';
import Navbar from '../Navbar/Navbar';
import Admin from '../../Pages/Admin/Admin';
import Sidebar from '../Sidebar/Sidebar';

const AllOrder = () => {
  const [allproducts, setAllProducts] = useState([]);
  
  const fetchInfo = async () => {
    const token = localStorage.getItem('auth-token'); // Retrieve the token
    
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };
  
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div id="list-product">
      <h1>All Orders</h1>
      <div id="listproduct-format-main">
        <p>Order ID</p>
        <p>Details</p>
        <p>Total Price</p>
        <p>Payment Status</p>
        <p>Transaction ID</p>
        <p>Payment Method</p>
        <p>UserID</p>
        <p>Email</p>
        <p>Address/PhoneNo.</p>
        <p>Order Date & Time</p>
      </div>
      <div id="listproduct-allproducts">
        <hr />
        {allproducts.map((order, index) => (
          <div key={index} id="listproduct-format">
            <p>{order._id}</p>
            <div id="order-details">
              {order.order_summary.items.map((item, i) => (
                <div key={i}>
                  <p><strong>Title:</strong> {item.productName}</p>
                  <p><strong>Price:</strong> ${item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </div>
              ))}
            </div>
            <p>${order.order_summary.totalPrice}</p>
            <p>{order.payment_status}</p>
            <p>{order.paymentID || 'N/A'}</p>
            <p>Payment Method: {order.paymentSource}</p>
            <p>UserID: {order.userId._id}</p>
            <p> Email: {order.email_address!=='-' ? order.email_address : order.userId.email}</p>
            {/* <p>{order.billing_address}</p> */}
            
            {order.billing_address && (
        <>
          {order.billing_address.address_line_1 && (
            <p>Address Line 1: {order.billing_address.address_line_1}</p>
          )}
          {order.billing_address.address_line_2 && (
            <p>Address Line 2: {order.billing_address.address_line_2}</p>
          )}
          {order.billing_address.admin_area_2 && (
            <p>City/Area: {order.billing_address.admin_area_2}</p>
          )}
          {order.billing_address.admin_area_1 && (
            <p>State/Region: {order.billing_address.admin_area_1}</p>
          )}
          {order.billing_address.postal_code && (
            <p>Postal Code: {order.billing_address.postal_code}</p>
          )}
          {order.billing_address.country_code && (
            <p>Country Code: {order.billing_address.country_code}</p>
          )}
        </>
      )}
            <p>Phone: {order.national_number}</p>
            <p>{new Date(order.updatedAt).toLocaleString()}</p>
            {/* <hr /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrder;