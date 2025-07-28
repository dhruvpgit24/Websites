import React, { useState, useEffect } from 'react'
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Admin from './Admin';
const Login = () => {
 // Cookies.remove('image');
 //  Cookies.remove('email');
 // Cookies.remove('name');
  // console.log( Cookies.get('name'));
  // Cookies.remove('token');
  // console.log(Cookies.get('token'));
 
  
 
  const[type, settype] = useState('User');
  const[email, setemail] = useState('');
  const[password, setpassword] = useState('')
  const navigate = useNavigate();
  
 
  
  async function nav(){
 

    if(type === 'User'){
    try{
    const checkuser  = await axios.post('http://localhost:8080/checkuser', {
      email: email,
      password: password
    });
  if(checkuser.data.success === false){
   toast.error(checkuser.data.message);

  }
  else{
   toast.success("You are logged in");
    console.log(checkuser.data.data.image.url)
  Cookies.set('image', checkuser.data.data.image.url, {expires: 1});
  Cookies.set('email', checkuser.data.data.email, {expires: 1});
   Cookies.set('name', checkuser.data.data.name, {expires: 1});
    console.log(Cookies.get('image'));
    console.log(Cookies.get('email'));
      console.log(Cookies.get('name'));
   navigate('/');
  }
 
  }
  catch(err){
  toast.error(`err:${err}`);
  }}
  else if(type === 'Admin'){
    try{
    const res = await axios.post('http://localhost:8080/checkadmin', {
      email: email,
      password: password
    });
    if(res.data.success === true){
      toast.success(`You are logged in as an admin`);
      Cookies.set('token', res.data.token, {expires: 1});
      navigate('/dashboard/');
    }
    else{
      toast.error(res.data.message);
    }
    }
    catch(err){
     toast.error(`error: ${err}`);
    }
  }
  }
  return (
   
   <div className='loginmain'>
         <div className="login" style={type === 'User' ? {paddingBottom: '3%'} : {paddingBottom: '1.5%'}}>
          <div className="txt-1">
            <h2><span>{type}</span> Login</h2>
            <p>Enter  your credentials to access the admin panel</p>
          </div>
          <div className="cred">
            <p>Email</p>
            <input type="email" name="" id="email" placeholder='admin@gmail.com' required
            onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <br />
            <p>Password</p>
          <input type="password" name="" id="password" placeholder='your password' required
           onChange={(e) => setpassword(e.target.value)}
          /><br />
            <br />
           <select name="types" id=""
           value={type}
           onChange={(e) => settype(e.target.value)}
           >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
           </select>
           <br />
       
           <button
           onClick={nav}
           >Login</button>
           
          {type === 'User' ? <><p className='U-p'>Don't have an account ? <Link to="/signup">Signup</Link></p></>: <></>}
          </div>
          
         </div>
           
    </div>
    
 
  )
}

export default Login;
