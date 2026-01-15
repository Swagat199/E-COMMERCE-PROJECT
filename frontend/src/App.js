import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {LoginSignup}   from './Pages/LoginSignup';
import ShippingScreen from './Pages/ShippingScreen';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { Footer } from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import  PaymentScreen  from './Pages/PaymentScreen';
import { Contact } from './Pages/Contact';
import About from './Pages/About';
import OrderSuccess from './Pages/OrderSuccess';



function App() {
  return (
    <div>
      <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Shop />} />
    <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
    <Route path='/women' element={<ShopCategory banner={women_banner} category="women" />} />
    <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
    <Route path='/product/:productId' element={<Product />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/login' element={<LoginSignup />} />
    <Route path='/shippingscreen' element={<ShippingScreen />} />
    <Route path='/payment' element={<PaymentScreen />} />
    <Route path='/ordersuccess' element={<OrderSuccess/>} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/about' element={<About />} />
  </Routes>
  <Footer/>
</BrowserRouter>

    </div>
  );
}

export default App;




/*<BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner = {men_banner} category="men"/>}/>
        <Route path='/women' element={<ShopCategory banner = {women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory  banner = {kid_banner} category="kid"/>}/>
        <Route path='/product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/shippingscreen' element={<ShippingScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
      </Routes>
      <Routes><Route path='/contact' element={<Contact/>}></Route></Routes>
      <Routes><Route path='/about' element={<About/>}></Route></Routes>
      <Footer/>
      
      
      </BrowserRouter>*/