import React,{createContext, useState,useEffect} from 'react'




export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
          let cart= {};
          for (let index = 0; index<300+1; index++) 
            {
              cart[index]=0;
          }
          return cart;
        }
const ShopContextProvider = (props) =>
    {
        const [all_product,setAll_Product] = useState([]);
        const [cartItems,setCartItems] = useState(getDefaultCart());
        


       useEffect(() => {
  fetch("http://localhost:4000/api/allproducts")
    .then(res => res.json())
    .then(data => setAll_Product(data));

  if (localStorage.getItem("auth-token")) {
    fetch("http://localhost:4000/api/getcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => setCartItems(data));
  }
}, []);

        


  const addToCart = (itemId) => {
  setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));

  if (localStorage.getItem("auth-token")) {
    fetch("http://localhost:4000/api/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ itemId }),
    })
      .then(res => res.text())
      .then(data => console.log(data));
  }
};


        const removeFromCart =(itemId)=>
        {
          setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
          if(localStorage.getItem('auth-token'))
          {
            fetch('http://localhost:4000/api/removefromcart',{
              method:'POST',
              headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
              },
              body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
          }
        }
        const getTotalCartAmount = () => 
        { let itemInfo;
          let totalAmount = 0;
          for (const item in cartItems) 
            {
            if (cartItems[item] > 0)
            {
               itemInfo = all_product.find((product) =>product.id === Number(item));
            }
              if (itemInfo) 
              {
                totalAmount+=itemInfo.new_price * cartItems[item];
              }          
             }
          return totalAmount;
        };
  const clearCart = () => {
  const emptyCart = getDefaultCart();
  setCartItems(emptyCart);

  if (localStorage.getItem("auth-token")) {
    fetch("http://localhost:4000/api/clearcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({})
    });
  }
};

        const getTotalCartItems = ()=>
        {
          let totalItem=0;
          for(const item in cartItems)
          {
            if(cartItems[item]>0)
              {
                totalItem+=cartItems[item];
              }
          }
          return totalItem;
        };

     


      const contextValue = {getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,getTotalCartItems,clearCart};
  return (
   <ShopContext.Provider value={contextValue}>
    {props.children}
   </ShopContext.Provider>
  )
}

export default ShopContextProvider;
 
