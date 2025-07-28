import React, { useEffect } from 'react'
import './Logoutad.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bg from './images/gradientBackground.png'

const Logoutad = () => {
 useEffect(() => {
   setTimeout(() => {
    if(window.confirm("Do you want to go to login page")){
     navigate('/login')
    }
    }, 500)
   }, [])
    const navigate = useNavigate();
        function logout(){
          if(window.confirm("Are You Sure you want to logout as an admin?")){
           Cookies.remove('token');
            toast.success('You are logged out');
            navigate('/login')
          }
          else{
            navigate('/dashboard');
          }
        }
  return (
     <div className='logoutad-m'>
               <button onClick={logout}>Admin Logout</button>
               <img src={bg} alt="" />
        </div>
  )
}

export default Logoutad