import React, { useContext, useEffect,useState } from "react";
import './CartFooter.css';
import { MovieContext } from "../Context/MovieContext";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js";

const CartFooter = ()=>{
    const {getToCartDefault,getToCartDefault1,setCartItems,setCartItem,cartItems,cartItem} = useContext(MovieContext);
    const t1 = getToCartDefault();
    const t2 = getToCartDefault1();
    console.log("price of food", t2);
    console.log("price of movie", t1);
    const navigate = useNavigate();
    const handleCont = ()=>{
        navigate('/movies')
    }

    const hanldeCheckout = ()=>{
       
        
        navigate('/home')
        alert("Order Placed!! Thank you for visiting :)");
        window.location.reload();

    }
const[paidFor,setPaidFor] = useState(false);

    const handleApprove = (orderId)=>{
        setPaidFor(true);
    }
    if(paidFor){
        navigate('/home')
        alert("Order Placed!! Thank You for visiting :) ");

        setTimeout(()=>{
            window.location.reload();
        },5000)
       
    }
    return(
        <>
        <PayPalScriptProvider>
        <div  className="cFWrapper">
            <div className="cFContainer">
                <span style={{
                    marginLeft:" 10px",
                    fontSize:"18px",
                    marginTop:"20px"
                }}>YOUR TOTAL AMOUNT FOR MOVIE AND FOOD :-)</span>
                <span style={{
                    marginLeft:" 10px",
                    marginTop:"20px"
                }}>${t1+t2}</span>
                <button style={{width:"70px"}} onClick={handleCont}>Continue</button>
                <PayPalButtons
                     
                    createOrder={(data,actions)=>{
                        return actions.order.create({
                            purchase_units:[
                                {
                                    amount:{
                                        currency_code:"USD",
                                        value:`${t1+t2}`
                                    }
                                }
                            ]
                        })
                    }}

                    onApprove= {async(data,action)=>{
                        const order = await action.order.capture();
                        console.log("orders",order);

                        handleApprove(data.orderID)
                    }}

                    onCancel={()=>{}}
                />
                <button style={{width:"70px"}} onClick={hanldeCheckout}>By Cash</button>
            </div>
        </div>
        </PayPalScriptProvider>
        </>
    )
}

export default CartFooter;