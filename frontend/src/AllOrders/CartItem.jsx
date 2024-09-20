import React, { useContext } from "react";
import './CartItem.css';

const CartItem = ({ item }) => {
    return (
        <div className="itemWrapper">
            <div className="itemContainer">
                <div className="itemLeft">
                <p>OrderId: {item._id}</p>
                {item.order_summary.items.map((item1, i) => (
          <div key={i}>
            
            <p>Title:{item1.productName}</p>
            <p>Price :${item1.price}</p>
            <p>DESCRIPTION:{item1.productDescription}</p>
            <p>Quantity: {item1.quantity}</p>
          </div>
        ))}
                
                </div>

                <div className="itemRight">
                    <div className="rightContainer">
                        
                        <span>${item.order_summary.totalPrice}</span>
                        <span>
                        <p>{item.order_summary.payment_status}</p>
                        {item.transaction_id ? (<p>Transaction ID: {item.transaction_id}</p>
                        ) : (<p>No Transaction ID Available</p>)}

                        <p>{item.payment_method}</p>
                           
                        </span>
                        <span><p>{item.updatedAt}</p></span>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
        
    );
}

export default CartItem;