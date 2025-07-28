import React, { useState } from 'react';
import './Dashnav.css';
import { Link } from 'react-router-dom';
import logo from './images/logo.svg';
import img from './images/arrow.svg';
import img1 from './images/home_icon.svg'
import img2 from './images/list_icon.svg'
import img3 from './images/add_icon.svg'
import img4 from './images/dashboard_icon_4.svg'
const Dashnav = () => {
     
     const[type, settype] = useState('Dashboard')
  return (
 
    <div className='dnav'>
     <div className='nav2'>
            <img src={logo} alt="" />
       
       <Link to='/logoutad'><button>Logout <img src={img} alt="" /></button></Link>
    
        </div>
   <Link to="/Dashboard/"  className='link' id='link'><li
    style={type === 'Dashboard' ? {backgroundColor: '#f0ecfd', borderRight: '5px solid #4500e2'} : {} }
    onClick={(e) => settype('Dashboard')}
    ><img src={img1} alt="" height={25}/>Dashboard </li></Link>
   <Link to="/Dashboard/Addblogs" className='link'> <li style={type === 'Add' ? {backgroundColor: '#f0ecfd', borderRight: '5px solid #4500e2'} : {} }
    onClick={(e) => settype('Add')}
    ><img src={img2} alt="" height={25} />Add blogs </li></Link>
    <Link to="/Dashboard/Lists" className='link'><li style={type === 'lists' ? {backgroundColor: '#f0ecfd', borderRight: '5px solid #4500e2'} : {} }
    onClick={(e) => settype('lists')}><img src={img3} alt=""height={25} />Blog lists </li></Link>

    <Link to="/Dashboard/editblog" className='link'><li style={type === 'edits' ? {backgroundColor: '#f0ecfd', borderRight: '5px solid #4500e2'} : {} }
    onClick={(e) => settype('edits')}><img src={img4} alt=""height={25} />Edit Blog </li></Link>
   
    </div>
  )
}

export default Dashnav