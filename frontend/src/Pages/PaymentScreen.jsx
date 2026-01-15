/*import React, { useState } from "react";
import "./CSS/PaymentScreen.css";

const PaymentScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Submitted:", formData);
    alert("Payment submitted!");
  };

  return (
    <div className="payment-container">
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Payment Details</h2>

        <label htmlFor="name">Name on Card</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />

        <div className="row">
          <div className="col">
            <label htmlFor="expiry">Expiry</label>
            <input
              type="text"
              name="expiry"
              id="expiry"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="pay-button">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentScreen;*/


/*import React, { useState } from 'react';
import './CSS/PaymentScreen.css';

const PaymentScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');

  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Processing ${selectedMethod.toUpperCase()} payment...`);
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>

      <div className="payment-methods">
        {['card', 'paypal', 'upi', 'netbanking', 'wallet'].map(method => (
          <button
            key={method}
            className={selectedMethod === method ? 'active' : ''}
            onClick={() => setSelectedMethod(method)}
          >
            {method.charAt(0).toUpperCase() + method.slice(1)}
          </button>
        ))}
      </div>

      <form className="payment-form" onSubmit={handlePayment}>
        {selectedMethod === 'card' && (
          <>
            <input type="text" placeholder="Cardholder Name" required />
            <input type="text" placeholder="Card Number" required />
            <div className="row">
              <input type="text" placeholder="MM/YY" required />
              <input type="text" placeholder="CVV" required />
            </div>
          </>
        )}

        {selectedMethod === 'paypal' && (
          <input type="email" placeholder="PayPal Email" required />
        )}

        {selectedMethod === 'upi' && (
          <input type="text" placeholder="UPI ID (e.g. name@bank)" required />
        )}

        {selectedMethod === 'netbanking' && (
          <select required>
            <option value="">Select Bank</option>
            <option value="hdfc">HDFC</option>
            <option value="sbi">SBI</option>
            <option value="icici">ICICI</option>
            <option value="axis">Axis</option>
            <option value="iob">IOB</option>
          </select>
        )}

        {selectedMethod === 'wallet' && (
          <select required>
            <option value="">Select Wallet</option>
            <option value="paytm">Paytm</option>
            <option value="phonepe">PhonePe</option>
            <option value="amazonpay">Amazon Pay</option>
            <option value="mobikwik">MobiKwik</option>
          </select>
        )}

        <button type="submit" className="pay-btn">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentScreen;
*/

import React,{useContext} from 'react';
import './CSS/PaymentScreen.css';
import { ShopContext } from '../Context/ShopContext';






const PaymentScreen = () => 
  {
  const {getTotalCartAmount,clearCart} = useContext(ShopContext); 
  const handlePlaceOrder = () => {
    clearCart(); // Clear the cart after placing the order
    alert('Order placed successfully with Cash on Delivery!');
    window.location.href='/OrderSuccess'
  };

  return (
    <div className="cod-container">
      <h2>Checkout - Cash on Delivery</h2>
      <div className="order-summary">
        <p>Total Amount:</p>
        <h3>₹{getTotalCartAmount().toFixed(2)}</h3>
      </div>

      <div className="payment-info">
        <h4>Payment Method</h4>
        <p>Cash on Delivery (COD)</p>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default PaymentScreen;

