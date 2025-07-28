import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import logo from './images/upload_area.svg';
import './Signup.css';
const Signup = () => {
      const btn1= document.getElementById('btn1');
      const[email, setemail] = useState(null);
      const[password, setpassword] = useState(null);
      const[name, setname] = useState(null);
      const[preview, setpreview] = useState('');
      const[image, setimage] = useState(null);
      const[disabled, setdisabled] = useState(false)
      async  function handlefocus(){
      if(email !== null){
      try{
       const check = await axios.post('http://localhost:8080/checkmail', {
          email: email
       });
       if(check.data.success === true){
        toast.warning(check.data.message);
        setdisabled(true);
       }
       else{
        setdisabled(false);
       }
      }
      catch(err){
         toast.error(err);
      }
      }
  }
      
      const navigate = useNavigate();
      function showphoto(event){
        const file = event.target.files[0];
        setpreview(URL.createObjectURL(file));
        setimage(file);
      }
      async function handleupload() {
        console.log('clicked')
        if(!name || !email || !password || !image){
            toast.warning("Please fill it");
        }
        else{
            
    try{
        btn1.innerHTML = "Please wait..."
        const formdata = new FormData();  
            formdata.append('name', name);
            formdata.append('email', email);
            formdata.append('password', password);
            formdata.append('image', image);
           console.log(formdata);
     const response = await axios.post('http://localhost:8080/user', formdata, {
          headers:{
            "Content-Type": "multipart/form-data",
           },
         });
        if(response.data.success === true){
            toast.success("Your account created successfully");
            Cookies.set('image', response.data.data.image.url, {expire: 1});
            Cookies.set('email', response.data.data.email, {expires: 1});
            Cookies.set('name', response.data.data.name, {expires: 1});
        }
        else{
            toast.error(response.data.message);
        }
        }
        catch(err){
            toast.error(err);
        }
        finally{
          btn1.innerHTML = "Signup";
        }
        }
      }
  return (
    <div>
        <div className='signupmain'>
         <div className="signup">
          <div className="txt-1">
            <h2><span>User</span> Signin</h2>
            <p>Enter  your credentials to create your account</p>
          </div>
          <div className="cred">
            <p>Email</p>
            <input type="email" name="" id="email" placeholder='admin@gmail.com' required
            onBlur={handlefocus}
            onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <br />
            <p>Password</p>
          <input type="password" name="" id="password" placeholder='your password' required
           onChange={(e) => setpassword(e.target.value)}
          />
            <br />
            <br/>
          <p>Name</p>
          
          <input type="text" name="" id="text" placeholder='your name' required
           onChange={(e) => setname(e.target.value)}
          />
          <br />
          <br />
          <p>your Profile photo</p>
          <div className="inpfile">
            <label htmlFor="file"><img src={logo} alt=""/>
           </label>
            <input type="file" className='file' id='file' onChange={showphoto}/> <img src={preview} alt=""  className='prev'/></div>
            <button onClick={handleupload} id='btn1' disabled={disabled}>Signup</button>
          </div>
          
         </div>
    </div>
    </div>
  )
}

export default Signup