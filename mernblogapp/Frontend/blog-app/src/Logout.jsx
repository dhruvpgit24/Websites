import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Logout.css';
import bg from './images/gradientBackground.png'
const Logout = () => {
    const navigate = useNavigate();
    // useEffect(() => {
    // setTimeout(() => {
    //   if(window.confirm("Are You Sure you want to logout as an admin?")){
    //    Cookies.remove('token');
    //     toast.success('You are logged out')
    //     navigate('/login')
    //   }
    //   }, 500)
    
    // }, [])
    useEffect(() => {
      setTimeout(() => {
       if(window.confirm("Do you want to go to login page")){
        navigate('/login')
       }
       }, 500)
      }, [])
    function logout(){
      if(window.confirm("Are You Sure you want to logout as an User?")){
       Cookies.remove('name');
       Cookies.remove('email');
        Cookies.remove('image');
        toast.success('You are logged out');
        navigate('/login')
      }
      else{
        navigate('/');
      }
    }
  return (
    <div className='logout-m'>
           <button onClick={logout}>User Logout</button>
           <img src={bg} alt="" />
    </div>
  )
}

export default Logout