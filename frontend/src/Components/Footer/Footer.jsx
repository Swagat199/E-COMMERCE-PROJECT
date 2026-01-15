import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import { Link } from "react-router-dom"
export const Footer = () => {


    //const [menu, setMenu] = useState(false);
  return (
    <div className='footer'>
        <div className='footer-logo'>
            <img src={footer_logo} alt=''></img>
            <p>Max World</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Product</li>
            <li>Offices</li>
            <li ><Link  style={{ textDecoration:'none' }}to='/about'>About</Link></li>
            <li ><Link  style={{ textDecoration:'none' }}to='/contact'>Contact</Link></li>
        </ul>
        <div className='footer-social-icon'>
            <div className='footer-icons-container'>
                <a href='https://www.instagram.com/max_world_official12?igsh=cGM4Yjkycnh4Z2h0'> <img src= { instagram_icon } alt=''/></a>
               
            </div>
            <div  className='footer-icons-container'>
                <img src={ pintester_icon} alt=''></img>
            </div>
            <div className='footer-icons-container'>
                <img src={whatsapp_icon} alt=''></img>
            </div>
        </div>
        <div className="footer-copyright">
            <hr/>
            <p>Copyright @ 2023 - All right reserved</p>
        </div>
    </div>
  )
}
