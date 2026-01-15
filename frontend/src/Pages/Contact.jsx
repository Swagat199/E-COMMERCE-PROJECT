import React from 'react'
import './CSS/Contact.css'


export const Contact = () => {

  const submit = () =>
  {
    alert('Your Complaint is Submited');
  }
  return (
    <div className='parent'>
      <div className='heading'>
        <h1>Contact Us</h1>  
      </div>
      <div className="para-content">
          <p>We're here to help! Please reach out using the form below or our direct contact information.</p>
      </div>


      <div className="message-box">
        <div className="message-box-container"> 
          <div className="message-heading">
              <h3>Send Us Message</h3>
              </div>
              <div className="input-fields">  
                  <input   placeholder='Your Name'  name='' id='' type='text'></input>
                  <input   placeholder='E-mail'  name='' id='' type='email'></input>

        
                      <div className="subject-selection">
                      Subject:
                      <select id="subject" name="subject" placeholder='Subject'>
                      <option>Please select an option</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="return">Return/Exchange</option>
                      <option value="support">Technical Support</option>
                      <option value="general">General Inquiry</option>
                      </select>
                    </div>

      <div className="user-message">
        Your Message:
        <textarea rows={7}></textarea>
      </div>
      </div>
      <div className="buton">
        <button type='submit' onClick={()=>{submit()}} >Submit</button>
      </div>
       </div>
       </div>

       <div className="contact-info-box">
            <div className="message-box-container">
              <h3>Contact Information</h3>
              <a href='pattanayakswagat2004@gmail.com'>support@maxworldgmail.com</a>
              Phone: +91-8114724970 (Mon-Fri, 9 AM - 5 PM IST)
              <text>Address:Berhampur,HeadOffice</text>
            </div>
           
       </div>
        
      </div>
    
      
    
    
    
    
  )
}
