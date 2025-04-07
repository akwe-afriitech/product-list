import "./App.css";
import { DESERTS } from "./deserts.js";
import Desert from "./components/Desert.jsx";
import { ShopContextProvider } from "./context/shop-context.jsx";
import { CartItem } from "./components/cart-item.jsx";
import React, { useContext, useState } from "react";
import { ShopContext } from "./context/shop-context.jsx";
import carbonNeutral from "./assets/images/icon-carbon-neutral.svg";
import Modal from "./components/Modal.jsx";
import illustration from "./assets/images/illustration-empty-cart.svg"

function App() {
  return (
    <ShopContextProvider>
      <Main />
    </ShopContextProvider>
  );
}

function Main() {
  const { cartItems } = useContext(ShopContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const calculateTotalPrice = () => {
    return Object.keys(cartItems).reduce((total, id) => {
      if (cartItems[id] > 0) {
        const desert = DESERTS.find((d) => d.id === Number(id));
        return total + desert.price * cartItems[id];
      }
      return total;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="App">
      <div className="shop">
        <h1 className="desert-header">Desserts</h1>
        <div className="deserts">
          {DESERTS.map((desert) => (
            <Desert key={desert.id} data={desert} />
          ))}
        </div>
      </div>
      <div className="cart">
        <div className="cart-div">
          <h1>Your Cart</h1>
          <div>
            {Object.keys(cartItems).some((id) => cartItems[id] > 0) ? (
              <>
                {Object.keys(cartItems).map((id) => {
                  if (cartItems[id] > 0) {
                    const desert = DESERTS.find((d) => d.id === Number(id));
                    return <CartItem key={id} data={desert} />;
                  }
                  return null;
                })}
                <div className="total">
                  <div className="order-total">
                    <p>Order Total</p>
                    <h3>${totalPrice.toFixed(2)}</h3>
                  </div>
                  <div className="carbon">
                    <img src={carbonNeutral} alt="Carbon Neutral" />
                    <p>
                      This is a <span>carbon-neutral</span> delivery
                    </p>
                  </div>
                  <div className="confirm-div">
                    <button onClick={() => setModalOpen(true)}>
                      Confirm Order
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="order-total1">
                <img src={illustration} alt="Remove item" />
                <p>Your added items will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default App;
