import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addmovieproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={add_product_icon} alt="" />
      <p>Add Movie Product</p>
      </div>
      </Link>
      <Link to={'/addfoodproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={add_product_icon} alt="" />
      <p>Add Food Product</p>
      </div>
      </Link>
      <Link to={'/movieproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={list_product_icon} alt="" />
      <p>Movies Product List</p>
      </div>
      </Link> 
      <Link to={'/foodproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
        <img src={list_product_icon} alt="" />
      <p>Food Product List</p>
      </div>
      </Link> 
    </div>
  )
}

export default Sidebar
