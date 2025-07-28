import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './Home';
import Login from './login';
import Blogs from './blogs';
import { Dataprovider } from './Dataprovider';
import Nav from './Nav';
import Dashboard from './Dashboard';
import { ToastContainer, toast } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
 /* export default function Router(){

  return(

  

     <Routes>
     <Route path="dashboard" element={<Dashboard/>} />
    
    </Routes>
  

  )
 }*/
root.render(
  

  

<BrowserRouter>
  <Dataprovider>
    <App/>
    <ToastContainer
    position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
    />
  </Dataprovider>
 
</BrowserRouter>

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
