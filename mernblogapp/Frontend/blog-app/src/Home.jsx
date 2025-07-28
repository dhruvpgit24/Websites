import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Section from './section';
import Blog from './Blog';
import './Home.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Home = () => {
  const[data, setdata] = useState(false);
  const navigate = useNavigate();
  console.log(Cookies.get('email'));
  console.log(Cookies.get('name'));
  useEffect(() => {
    console.log('hello');
   const cookie = Cookies.get('email');
   if(cookie === undefined){
    toast.warning('Please login to continue');
   navigate('/login');
   }
  },[])
  function update(){
    setdata(prev => !prev);
  }
  return (
    <div className='main'>
      {data && <div className='popup'>admin</div>}
     {/*<Nav update={update}/>*/}
      <Section/>
      <Blog/>
   
    </div>
  )
}

export default Home