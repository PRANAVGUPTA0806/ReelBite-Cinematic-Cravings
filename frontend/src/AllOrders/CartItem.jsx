import React from "react";
import './CartItem.css';

const CartItem = ({ item }) => {
  return (
    <div id="itemWrapper">
      <div id="itemContainer">
        <div id="itemLeft">
          <p>OrderId: {item._id}</p>
          {item.order_summary.items.map((item1, i) => (
            <div key={i} id="itemDetails">
              <p>Title: {item1.productName}</p>
              <p>Price: ${item1.price}</p>
              <p>Quantity: {item1.quantity}</p>
            </div>
          ))}
        </div>

        <div id="itemRight">
          <div id="rightContainer">
            <span>Total: ${item.order_summary.totalPrice}</span>
            <div id="transactionInfo">
              <p>{item.payment_status}</p>
              {item.transaction_id ? (
                <p>Transaction ID: {item.transaction_id}</p>
              ) : (
                <p>No Transaction ID Available</p>
              )}
              <p>Payment Method: {item.payment_method}</p>
            </div>
            <span>Order Date: {new Date(item.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
