import React from 'react';
import './CSS/OrderSuccess.css';

const OrderSuccess = () => {
  return (
    <div className="success-container">
      <div className="checkmark-circle">
        <div className="checkmark"></div>
      </div>
      <h2>Thank You!</h2>
      <p>Your order has been placed successfully.</p>
      <p>You will receive a confirmation message shortly.</p>
      <button onClick={() => window.location.href = '/'} className="home-btn">
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
