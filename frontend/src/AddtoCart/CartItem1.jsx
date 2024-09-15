import React, { useContext } from "react";
import './CartItem1.css';
import { MovieContext } from "../Context/MovieContext";
import {faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CartItem1 = (props)=>{
    const{id,img,name,price } = props.data1;
    
    const{addToFoodCart,removeFromFoodCart,cartItem,itema,item} = useContext(MovieContext)
    // const cartAmount = cartItems[id];
    const cartAmount1 = cartItem[id];
    console.log(cartAmount1)
    return(
        <>
            <div className="itemWrapper">
                <div className="itemContainer">
                    <div className="itemLeft">
                        <img src={img}/>
                        <span>{name}</span>
                        {/* <div><span>{desp}</span></div> */}
                        
                    </div>

                    <div className="itemRight">
                        <div className="rightContainer">
                            <span>${price}</span>
                        <span>{cartItem.length!=0 && <span>
                           <span onClick={()=>addToFoodCart(id)}><FontAwesomeIcon style={{
                            borderRadius:"5px",
                            backgroundColor:"lightgray"
                           }} icon={faPlus} /></span> {cartAmount1}
                           <span onClick={()=>removeFromFoodCart(id)}><FontAwesomeIcon  style={{
                            marginLeft:"5px",
                            borderRadius:"5px",
                            backgroundColor:"lightgray"
                           }} icon={faMinus} /></span>
                           </span>}
                            
                            </span>

                        <span>${cartAmount1*price}</span>
                        </div>
                    </div>
                </div>
                

            </div>
        </>
    )
}

export default CartItem1;