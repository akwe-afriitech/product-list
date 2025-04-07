import React, { useContext } from "react";
import addToCarts from "../assets/images/icon-add-to-cart.svg";
import { ShopContext } from "../context/shop-context";

export const Desert = (props) => {
  const { name, category, price, image, id } = props.data;
  const { addToCart, removeFromCart, cartItems } = useContext(ShopContext);
  
  const formatPrice = (price) => {
    return price % 1 === 0 ? `${price}.00` : price.toFixed(2);
  };

  const cartItemsAmount = cartItems[id] || 0;

  return (
    <div className="desert">
      <div className="img-div">
        <img
          src={image.desktop}
          srcSet={`
            ${image.mobile} 600w,
            ${image.tablet} 768w,
            ${image.desktop} 1200w
          `}
          sizes="(max-width: 600px) 100vw, (max-width: 768px) 50vw, 33vw"
          alt={name}
          className="desert-img"
        />
        {cartItemsAmount === 0 ? (
          <button id="add-to-cart-btn" onClick={() => addToCart(id)}>
            <img
              src={addToCarts}
              alt="Add to Cart"
              className="add-to-cart-icon"
            />
            Add To Cart
          </button>
        ) : (
          <div className="quantity-controls">
            <button onClick={() => removeFromCart(id)}>
              -
            </button>
            <span>{cartItemsAmount}</span>
            <button onClick={() => addToCart(id)}>
              +
            </button>
          </div>
        )}
      </div>
      <div className="desert-description">
        <p className="category paddingnmargin">{category}</p>
        <h4 className="name ">{name}</h4>
        <p className="price paddingnmargin"> ${formatPrice(price)}</p>
      </div>
    </div>
  );
};

export default Desert;