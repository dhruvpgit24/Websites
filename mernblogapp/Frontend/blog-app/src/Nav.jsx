import React from 'react';
import logo from './images/logo.svg';
import img from './images/arrow.svg';
import './Nav.css';
import { Links, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Nav = (props) => {
   const navigate = useNavigate();
   function nav(event){
  //   console.log('clicked');
   if(cred === undefined){
     navigate('/login');
   }
   else{
     navigate('/logout');
   }
   
   }
  const cred = Cookies.get('email');
  return (
    <div className='nav'>
        <img src={logo} alt="" />
   
  <button onClick={nav}>{cred === undefined ? <>Login</> : <>Logout</>}<img src={img} alt="" /></button>
   
    </div>
  )
}

export default Nav