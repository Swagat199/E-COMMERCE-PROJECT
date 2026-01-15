import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p> An e-commerce website 
                is an online platform that focitanes the buying and selling of products or services over the intamet it 
                serves as a virtual mortatplace where businesses and individuals con showcase their products Customers, 
                and conduct transactions without the need for a physical presence E-commerce websites have
                gained immense popularity due to their conveniences, accessibility, ond the global reach they 
                offer E-commerce websites typically display products or services along with detailed descriptions,
                images, prices, and ony available variations (eg, sizes, colors). Each product usually has its own
                dedicated page with relevant information
            </p>
        </div>
    </div>
  )
}
