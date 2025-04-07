import React from "react";
import orderConfirm from "../assets/images/icon-order-confirmed.svg";
import { DESERTS } from "../deserts"; // Import DESERTS to get item details

const Modal = ({ isOpen, onClose, cartItems, totalPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-intro">
          <img src={orderConfirm} alt="Order Confirmed" />
          <h2>Order Confirm</h2>
          <p>We hope you enjoy your food!</p>
        </div>

        <div className="modal-cart-items">
          {Object.keys(cartItems).map((id) => {
            if (cartItems[id] > 0) {
              const desert = DESERTS.find((d) => d.id === Number(id)); // Get dessert details
              return (
                <div key={id} className="modal-item">
                  <div>
                    <img
                      className="modal-img"
                      src={desert.image.desktop}
                      alt={desert.name}
                    />
                  </div>
                  <div>
                    <div className="desert-name">{desert.name}</div>
                    <div className="des-blw">
                      <p>{cartItems[id]}x</p>
                      <p className="desert-price">${desert.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <p>${cartItems[id] * desert.price}.00</p>
                </div>
              );
            }
            return null;
          })}
          <div className="modal-total">
            <p>Order Total:</p>
            <p className="totalprice"> ${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={onClose}>Start New Order</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
