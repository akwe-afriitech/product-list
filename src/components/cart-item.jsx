import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import removeitem from "../assets/images/icon-remove-item.svg";

export const CartItem = (props) => {
  const { name, price, id } = props.data;
  const { cartItems, updateCartItem } = useContext(ShopContext);
  const cartItemsAmount = cartItems[id];

  const formatPrice = (price) => {
    return price % 1 === 0 ? `${price}.00` : price.toFixed(2);
  };

  const handleRemoveItem = () => {
    updateCartItem(id, 0); // Set the item quantity to 0 to remove it
  };

  return (
    <div className="cartItem">
      <div className="cartItem-div">
        <div className="cartItem-div-2">
          <p>{name}</p>
          <div className="desert-price">
            <p className="cartItemsAmount">{cartItemsAmount}x</p>
            <p>@ ${formatPrice(price)}</p>
            <p>{formatPrice(price * cartItemsAmount)}</p>
          </div>
        </div>
        <div>
          <button className="removeItem" onClick={handleRemoveItem}>
            <img src={removeitem} alt="Remove item" />
          </button>
        </div>
      </div>
    </div>
  );
};