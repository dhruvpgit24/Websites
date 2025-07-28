import React, { useContext, useEffect, useState } from 'react'
import './Blog.css';
import { blog_data } from './images/assets';
import { DataContext } from './Dataprovider';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import axios from 'axios';
import Cookies from 'js-cookie';
const Blog = () => {
 
  const { name } = useContext(DataContext);
  console.log(name);
  console.log(Cookies.get('name'));
    const [type, settype] = useState('');
    const[data, setdata] = useState(null);
    const[id, setid] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      
      if(id !== ''){
         navigate(`blogs/${id}`);
      }
    },[id])
    function send(event){
      console.log(event.target.key);
    }
    async function fetchapi(){
       const response = await axios.get('http://localhost:8080/blogs');
       console.log(response.data);
        console.log(blog_data);
        const filtered = response.data.filter(function(e, i){
            return e.category.includes(type) && e.title.includes(name) && e.isPublished === true; 
        });
        setdata(filtered);
    }
   
    useEffect(() => {
        fetchapi();
    },[type, name])
   
  return (
    <div className='blogs'>
        <div className="types">
            <span onClick={(e) => settype('')}
            style={type === '' ? {backgroundColor:'#4500e2', color: 'white'} : {}}
                >All</span>
            <span onClick={(e) => settype(e.target.innerHTML)}
            style={type === 'Technology' ? {backgroundColor:'#4500e2', color: 'white'} : {}}>Technology</span>
            <span onClick={(e) => settype(e.target.innerHTML)}
              style={type === 'Startup' ? {backgroundColor:'#4500e2', color: 'white'} : {}}  >Startup</span>
            <span onClick={(e) => settype(e.target.innerHTML)}
         style={type === 'Lifestyle' ? {backgroundColor:'#4500e2', color: 'white'} : {}}>Lifestyle</span>
            <span onClick={(e) => settype(e.target.innerHTML)}
            style={type === 'Finance' ? {backgroundColor:'#4500e2', color: 'white'} : {}}>Finance</span>
        </div>
      <div className="blog">
        {data !== null &&
          data.map((el, i) => {
            return <div key={i}
            onClick={() => setid(el._id)}
            className='bl'>
                   <div className="img">
                        <img src={el.image.url} alt=""/>
                      </div>
                  <div className="txt">
                    <span>{el.category}</span>
                    <p className='P-P1'>{el.title}</p>
                    <p className='P-P2'>{el.subTitle}</p>
                  </div>
            </div>
          })
        }
      </div>
      <div className='subs'>
        <h2>Never Miss a Blog!</h2>
        <p>Please leave a <span>COMMENT</span> on the blog down below if you enjoyed reading it</p>
      </div>
      <Footer/>
    </div>
  )
}

export default Blog