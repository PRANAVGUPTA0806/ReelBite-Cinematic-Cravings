import React, { useContext } from "react";
import './CartItem.css';
import { MovieContext } from "../Context/MovieContext";
import {faPlus,faMinus,faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const CartItem = ({ item,onAdd, onRemove,ondelete }) => {
    const { productId, image, productName, productDescription, price, quantity } = item;

    return (
        <div className="itemWrapper">
            <div className="itemContainer">
                <div className="itemLeft">
                    <img src={image} alt={productName} />
                    <span>{productName}</span>
                    {productDescription !== "" ? (
                        <div>
                            <span>{productDescription}</span>
                        </div>) : null
                    }

                </div>

                <div className="itemRight">
                    <div className="rightContainer">
                        <span>${price}</span>
                        <span>
                            {/* <span onClick={() => onAdd(productId)}> */}
                            <span onClick={() => onAdd(productId)}>
                                <FontAwesomeIcon
                                    style={{ borderRadius: "5px", backgroundColor: "lightgray" }}
                                    icon={faPlus}
                                />
                            </span> 
                            {quantity}
                            {/* <span onClick={() => onRemove(productId)}> */}
                            <span onClick={() => onRemove(productId)}>
                                <FontAwesomeIcon
                                    style={{ marginLeft: "5px", borderRadius: "5px", backgroundColor: "lightgray" }}
                                    icon={faMinus}
                                />
                            </span>
                            <span onClick={() => ondelete(productId)}>
                            <FontAwesomeIcon 
                            style={{ marginLeft: "5px", borderRadius: "5px", backgroundColor: "lightgray" }}
                            icon={faTrash} />
                            </span>
                        </span>
                        <span>${quantity * price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;