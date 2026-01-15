import React, { useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../Item/Item';


export const Popular = () => {

    const [popularProducts,setPopularproducts] = useState([]);

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_URL}/api/popularinwomen`)
      .then((response)=>response.json())
      .then((data)=>setPopularproducts(data));
    },[])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className='popular-item'>{popularProducts.map((item,i)=>{return <Item Key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
    </div>
    </div>
  )
}
