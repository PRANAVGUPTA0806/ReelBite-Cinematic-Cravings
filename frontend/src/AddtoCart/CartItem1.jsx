import React, { useContext } from "react";
import './CartItem1.css';
import { MovieContext } from "../Context/MovieContext";
import {faPlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



    const CartItem1 = ({ item}) => {
        const { productId, image, productName, price, quantity } = item;

    return (
        <div className="itemWrapper">
            <div className="itemContainer">
                <div className="itemLeft">
                    <img src={image} alt={productName} />
                    <span>{productName}</span>
                </div>

                <div className="itemRight">
                    <div className="rightContainer">
                        <span>${price}</span>
                        <span>
                            <span >
                                <FontAwesomeIcon
                                    style={{ borderRadius: "5px", backgroundColor: "lightgray" }}
                                    icon={faPlus}
                                />
                            </span> 
                            {quantity}
                            <span >
                                <FontAwesomeIcon
                                    style={{ marginLeft: "5px", borderRadius: "5px", backgroundColor: "lightgray" }}
                                    icon={faMinus}
                                />
                            </span>
                        </span>
                        <span>${quantity * price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem1;