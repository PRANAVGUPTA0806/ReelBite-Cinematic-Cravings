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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Include token for authentication
                },
                body: JSON.stringify({
                    order_summary: cartItems,
                    paymentID:"na",
                    paymentSource: "CASH",
                    payment_status:"COMPLETED", // Include order summary
                    // Add other necessary fields here, e.g., billing_information, shipping_information
                }),
            });
    
            if (response.ok) {
                console.log('Order placed successfully');
    
                // Clear the cart after the order is saved
                const clearCartResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/clear`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
    
                if (clearCartResponse.ok) {
                    console.log('Cart cleared successfully');
                    navigate('/myorders');
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
    

    const handleApprove = async(order,data) => {
        
        const token = localStorage.getItem('auth-token'); // Retrieve the token
    
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
    
        try {
            // Make a request to place the order first (similar to what you'd do for PayPal)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Include token for authentication
                },
                body: JSON.stringify({
                    order_summary: cartItems, 
                    paymentID:data.paymentID,
                    billing_information:order.payer.address,
                    email_address:order.payer.email_address,
                    national_number:order.payer.phone.phone_number.national_number,
                    paymentSource: data.paymentSource,
                    payment_status:order.status,
                    payment_date:order.update_time,// Include order summary
                    // Add other necessary fields here, e.g., billing_information, shipping_information
                }),
            });
    
            if (response.ok) {
                console.log('Order placed successfully');
    
                // Clear the cart after the order is saved
                const clearCartResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/clear`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
    
                if (clearCartResponse.ok) {
                    console.log('Cart cleared successfully');
                    navigate('/myorders');
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
    const handleCancel = async () => {
        const token = localStorage.getItem('auth-token');
    
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    order_summary: cartItems,
                    paymentID: "", // No transaction ID since it was cancelled
                    paymentSource: "ONLINE",
                    payment_status: "Failed",
                }),
            });
    
            if (response.ok) {
                console.log('Order marked as failed due to cancellation.');
                alert("Payment was cancelled. Your order is not placed.");
            } else {
                const errorData = await response.json();
                console.error("Failed to mark order as failed:", errorData);
            }
        } catch (error) {
            console.error("Error during payment cancellation:", error);
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
                                    // console.log(data);
                                    // console.log("Order:", order);
                                    handleApprove(order,data);
                                }}
                                onCancel={() => {
                                    console.log("Payment cancelled by the user.");
                                    handleCancel(); // Handle cancellation
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