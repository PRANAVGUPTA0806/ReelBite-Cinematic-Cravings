import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/admin/addmovieproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={add_product_icon} alt="" />
      <p>Add Movie Product</p>
      </div>
      </Link>
      <Link to={'/admin/addfoodproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={add_product_icon} alt="" />
      <p>Add Food Product</p>
      </div>
      </Link>
      <Link to={'/admin/movieproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={list_product_icon} alt="" />
      <p>Movies Product List</p>
      </div>
      </Link> 
      <Link to={'/admin/foodproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={list_product_icon} alt="" />
      <p>Food Product List</p>
      </div>
      </Link> 
      <Link to={'/admin/allorders'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={list_product_icon} alt="" />
      <p>All Orders List</p>
      </div>
      </Link>
      <Link to={'/admin/allusers'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={list_product_icon} alt="" />
      <p>All Users List</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
