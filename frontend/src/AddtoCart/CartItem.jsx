import React, { useContext } from "react";
import './CartItem.css';
import { MovieContext } from "../Context/MovieContext";
import {faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CartItem = (props)=>{
    const{id,img,name,genre,price,desp  } = props.data;
    
    const{cartItems, addToCart, removeFromCart,getToCartDefault,addToFoodCart,removeFromFoodCart,cartItem} = useContext(MovieContext)
    const cartAmount = cartItems[id];
    const cartAmount1 = cartItem[id];
    console.log(cartAmount+cartAmount1)
    const totalAmount = getToCartDefault()
    return(
        <>
        
            <div className="itemWrapper">
                <div className="itemContainer">
                    <div className="itemLeft">
                        <img src={img}/>
                        <span>{name}</span>
                        <div><span>{desp}</span></div>
                        
                    </div>

                    <div className="itemRight">
                        <div className="rightContainer">
                            <span>${price}</span>
                        <span>{cartItems.length!=0 && <span>
                           <span onClick={()=>addToCart(id)}><FontAwesomeIcon style={{
                            borderRadius:"5px",
                            backgroundColor:"lightgray"
                           }} icon={faPlus} /></span> {cartAmount}
                           <span onClick={()=>removeFromCart(id)}><FontAwesomeIcon  style={{
                            marginLeft:"5px",
                            borderRadius:"5px",
                            backgroundColor:"lightgray"
                           }} icon={faMinus} /></span>
                           </span>}
                            
                            </span>

                        <span>${cartAmount*price}</span>
                        </div>
                    </div>
                </div>

            </div>
        
        </>
    )
}

export default CartItem;