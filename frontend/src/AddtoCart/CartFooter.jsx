import React, { useContext, useEffect, useState } from "react";
import './CartFooter.css';
import { MovieContext } from "../Context/MovieContext";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CartFooter = ({ total ,cartItems}) => {
    const navigate = useNavigate();
    const [formattedTotal, setFormattedTotal] = useState("0.00");
    const [paidFor, setPaidFor] = useState(false);

    const handleCont = () => {
        navigate('/movies');
    };

    useEffect(() => {
        if (total > 0) {
            setFormattedTotal(parseFloat(total).toFixed(2));
        } else {
            setFormattedTotal("0.00");
        }
    }, [total]);

    const hanldeCheckout = async () => {
        const token = localStorage.getItem('auth-token'); // Retrieve the token
    
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
    
        try {
            // Make a request to place the order first (similar to what you'd do for PayPal)
            const response = await fetch("http://localhost:8000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Include token for authentication
                },
                body: JSON.stringify({
                    order_summary: cartItems,
                    transaction_id:"na",
                    payment_method: "CASH", // Include order summary
                    // Add other necessary fields here, e.g., billing_information, shipping_information
                }),
            });
    
            if (response.ok) {
                console.log('Order placed successfully');
    
                // Clear the cart after the order is saved
                const clearCartResponse = await fetch("http://localhost:8000/api/cart/clear", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
    
                if (clearCartResponse.ok) {
                    console.log('Cart cleared successfully');
                    navigate('/home');
                    alert("Order Placed!! Thank you for visiting :)");
                    setPaidFor(true); // Update state if needed
                } else {
                    const errorData = await clearCartResponse.json();
                    console.error("Failed to clear cart:", errorData);
                }
            } else {
                const errorData = await response.json();
                console.error("Failed to place order:", errorData);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };
    

    const handleApprove = async(orderId) => {
        
        const token = localStorage.getItem('auth-token'); // Retrieve the token
    
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
    
        try {
            // Make a request to place the order first (similar to what you'd do for PayPal)
            const response = await fetch("http://localhost:8000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Include token for authentication
                },
                body: JSON.stringify({
                    order_summary: cartItems, 
                    transaction_id:orderId,
                    payment_method: "ONLINE",// Include order summary
                    // Add other necessary fields here, e.g., billing_information, shipping_information
                }),
            });
    
            if (response.ok) {
                console.log('Order placed successfully');
    
                // Clear the cart after the order is saved
                const clearCartResponse = await fetch("http://localhost:8000/api/cart/clear", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
    
                if (clearCartResponse.ok) {
                    console.log('Cart cleared successfully');
                    navigate('/home');
                    alert("Order Placed!! Thank you for visiting :)");
                    setPaidFor(true); // Update state if needed
                } else {
                    const errorData = await clearCartResponse.json();
                    console.error("Failed to clear cart:", errorData);
                }
            } else {
                const errorData = await response.json();
                console.error("Failed to place order:", errorData);
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    if (paidFor) {
        navigate('/home');
        alert("Order Placed!! Thank You for visiting :) ");
        setTimeout(() => {
            window.location.reload();
        }, 5000);
    }

    return (
        <>
            <PayPalScriptProvider>
                <div className="cFWrapper">
                    <div className="cFContainer">
                        <span style={{
                            marginLeft: "10px",
                            fontSize: "18px",
                            marginTop: "20px"
                        }}>YOUR TOTAL AMOUNT FOR MOVIE AND FOOD :-)</span>
                        <span style={{
                            marginLeft: "10px",
                            marginTop: "20px"
                        }}>${formattedTotal}</span>
                        <button style={{ width: "70px" }} onClick={handleCont}>Continue</button>

                        {formattedTotal >= "1.00" && ( // Only show PayPal buttons if the total is greater than zero
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    currency_code: "USD",
                                                    value: formattedTotal
                                                }
                                            }
                                        ]
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    const order = await actions.order.capture();
                                    console.log("Order:", order);
                                    handleApprove(data.orderID);
                                }}
                                onCancel={() => {
                                    console.log("Payment cancelled");
                                }}
                            />
                        )}
                         {formattedTotal >= "1.00" && ( 
                        <button style={{ width: "70px" }} onClick={hanldeCheckout}>By Cash</button>)}
                    </div>
                </div>
            </PayPalScriptProvider>
        </>
    );
};

export default CartFooter;