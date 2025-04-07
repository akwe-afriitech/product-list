import React, { createContext, useState } from "react";
import { DESERTS } from "../deserts";

export const ShopContext = createContext(null); 

const getDefaultCart = () => { 
  let cart = {};
  for (let i = 1; i < DESERTS.length + 1; i++) {
    cart[i] = 0;  
  }
  return cart;
}

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart()); 
    const addToCart = (itemId) => {
        setCartItems((prev) =>({...prev, [itemId]: prev[itemId] + 1}));
    };
    const removeFromCart = (id) => {
        setCartItems((prevItems) => ({
          ...prevItems,
          [id]: Math.max((prevItems[id] || 0) - 1, 0), // Prevent negative quantities
        }));
      };
    const updateCartItem = (id, quantity) => {
        setCartItems((prevItems) => ({
          ...prevItems,
          [id]: quantity,
        }));
      };

    const contexValue = {cartItems, addToCart, removeFromCart, updateCartItem}
    console.log( cartItems)
  return (
    <ShopContext.Provider value={contexValue}>
      {props.children}
    </ShopContext.Provider>
  );
};