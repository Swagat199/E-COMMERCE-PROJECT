import React, { useState } from 'react';
import './CSS/ShippingScreen.css';
import { useNavigate } from 'react-router-dom';


  


const ShippingScreen = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const navigate = useNavigate();

  const handlePaymentClick = (e) => 
  {
    e.preventDefault();
    console.log('Submitted:', formData);
    alert('Shipping address submitted!');
    navigate('/payment');
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  

  return (
    <div className="shipping-container">
      <form className="shipping-form" onSubmit={handlePaymentClick}>
        
        <h2>Shipping Address</h2>

        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          City
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>

        <div className="row">
          <label>
            State
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              
            />
          </label>
          <label>
            ZIP
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              
            />
          </label>
         
        </div>

        <label>
          Country
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" >Continue</button>
      </form>
    </div>
  );
};

export default ShippingScreen;
