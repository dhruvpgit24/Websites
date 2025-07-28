import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes, Route, useLocation} from 'react-router-dom';
import Home from './Home';
import Login from './login';
import Blogs from './blogs';
import Nav from './Nav';
import Dashboard from './Dashboard';
import WithNav from './WithNav';
import Comments from './Comments';
import Lists from './Lists';
import Admin from './Admin';
import Add from './Add';
import Signup from './Signup';
import Logout from './Logout';
import Logoutad from './Logoutad';

function App() {
  const location = useLocation();
  const hidenavroutes = ['/login'];
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
         { /*{!hidenavroutes.includes(location.pathname) && <Nav/>}*/}
        
          <Routes>
          <Route element={<WithNav/>}>
          <Route path="/" element={<Home/>} />
          <Route path="blogs/:id" element={<Blogs/>} />
          
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/logoutad' element={<Logoutad/>}/>
          <Route element={<Dashboard/>}>
   
          <Route path="/Dashboard/" element={<Admin/>} />
          <Route path="/Dashboard/Addblogs" element={<Add/>} />
          <Route path="/Dashboard/Lists" element={<Lists/>} />
           <Route path="/Dashboard/editblog" element={<Comments/>} />
          </Route>
       </Routes>
    </div>
  );
}

export default App;
