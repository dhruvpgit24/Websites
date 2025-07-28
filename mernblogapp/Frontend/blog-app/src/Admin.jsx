import React, { useEffect, useState } from 'react'
import Dashnav from './Dashnav'
import './Admin.css';
import axios from 'axios';
import logo1 from './images/dashboard_icon_1.svg';
import logo2 from './images/dashboard_icon_2.svg';
import logo3 from './images/dashboard_icon_3.svg';
import logo4 from './images/dashboard_icon_4.svg';
import crossic from './images/cross_icon.svg';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Admin = () => {
  const[loading, setloading] = useState(true);
  const[blog, setblog] = useState();
  const[comment, setcomment] = useState();
   const[draft, setdraft] = useState();
   const navigate = useNavigate();
   console.log(draft);
  /* function handleclick(key){
   console.log(key);
   }*/
   const data = ['#', 'BLOG TITLE', 'DATE', 'STATUS', 'ACTIONS'];
  useEffect(() => {
    const token = Cookies.get('token');
    if(token === undefined){
       navigate('/login');
       toast.warning('Please login as an admin');
    }
  },[])
  useEffect(() => {
   async function fetchdata(){
    try{
     const response = await axios.get('http://localhost:8080/send');
     console.log(response.data);
     response.data.blogdata.sort((a, b) => {
      const datea = new Date(a.createdAt)
      const dateb = new Date(b.createdAt)
      return dateb.getTime() - datea.getTime();
     });
       const fil = [...response.data.blogdata];
       const find = fil.filter(e => e.isPublished === false);
      console.log(find)
     setblog(response.data.blogdata);
     setcomment(response.data.commentdata);
     setdraft(find);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setloading(false)
    }
   }
   fetchdata();
  }, [])
  return (
    <div className='admin'>

        {loading ? <p>loading data...</p>  : <>
        <div className="lengths">
          <div className="box">
            <div className="imgs">
            <img src={logo1} alt="" />
            </div>
            <div className="info">
              <h2>{blog.length}</h2>
              <p>Blogs</p>
            </div>
          </div>
          <div className="box">
             <div className="imgs">
            <img src={logo2} alt="" />
            </div>
               <div className="info">
                 <h2>{comment.length}</h2>
              <p>Comments</p>
               </div>
          </div>
          <div className="box">
             <div className="imgs">
            <img src={logo3} alt="" />
            </div>
               <div className="info">
                  <h2>{draft.length}</h2>
              <p>Drafts</p>
               </div>
          </div>
        </div>
        <div className="table">
        <div className='th'>
               <li className='num'>{data[0]}</li>
              <li className='blg'>{data[1]}</li>
              <li className='title'>{data[2]}</li>
              <li className='status'>{data[3]}</li>
                
           </div>
         <div className="tr">
          {blog.slice(0, 6).map((el, i) => {
            return <div key={el._id} className='trdiv'>
            <li className='num'>{++i}</li>
            <li className='blg'>{el.title}</li>
            <li className='title1'>{el.createdAt.slice(0, 10)}</li>
             <li className='statusp' 
                  style={el.isPublished === true ? {color: 'green'} : {color: 'red'}}
                  >{el.isPublished === true ? <>Published </> : <>Unpublished</>}</li>
     
          {/*<li><img src={crossic} alt="" onClick={() => handleclick(el._id)} /></li> */}
            </div>
          })

          }
         </div>
        </div>
        </>}
    </div>
  )
}

export default Admin