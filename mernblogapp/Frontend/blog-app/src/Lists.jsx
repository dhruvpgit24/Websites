import React from 'react'
import './lists.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import crossic from './images/cross_icon.svg';
import { toast } from 'react-toastify';
import img from './images/dashboard_icon_4.svg'
const Lists = () => {
  const[loading, setloading] = useState(true);
  const[blog, setblog] = useState();
  const[comment, setcomment] = useState();
   const[draft, setdraft] = useState([]);

   async function handle(id){
     console.log(id)
     console.log('clicked')
     const find = blog.find(e => e._id === id);
     if(find.isPublished === true){
      try{
      const res = await axios.post('http://localhost:8080/pub', {
        id: id,
        isPublished: false
      })
      if(res.data.success === true){
        toast.success('Blog Unpublished');
        setblog(res.data.data);
      }
      else{
        toast.error(res.data.message)
      }
      }
      catch(err){
       toast.error(err)
      }  
     }
     else{
       try{
      const res = await axios.post('http://localhost:8080/pub', {
        id: id,
        isPublished: true
      })
      if(res.data.success === true){
        toast.success('Blog published');
        setblog(res.data.data);
      }
      else{
        toast.error(res.data.message)
      }
      }
      catch(err){
       toast.error(err)
      }
     }
   }
   async function handleclick(id){
   console.log(id);
     try{
    const changed = await axios.post('http://localhost:8080/delete', {
        id: id
    });
     if(changed.data.success === true){
      toast.success(`blog deleted`);
      setblog(changed.data.blogdata);
     }
     else{
     toast.error(`sorry blog not deleted`);
     }
     }
     catch(err){
      toast.error(`err: ${err}`);
     }
   }
   const data = ['#', 'BLOG TITLE', 'DATE', 'STATUS', 'ACTIONS'];

  useEffect(() => {
   async function fetchdata(){
    try{
     const response = await axios.get('http://localhost:8080/send');
     console.log(response.data);
   
    // const find = response.data.blogdata
     setblog(response.data.blogdata);

    
    }
    catch(err){
      console.log(err);
    }
    finally{
      setloading(false)
    }
   }
   fetchdata();
  }, [loading])
  
  return (
    <div className='lists'>
    <div className="div1"><img src={img} alt="" height={30}/><p>All Blogs</p></div>
      {loading ? <p>loading data...</p>  : <>
       <div className="table1">
              <div className='th'>
                     <li className='num'>{data[0]}</li>
                    <li className='blg'>{data[1]}</li>
                    <li className='title'>{data[2]}</li>
                    <li className='status'>{data[3]}</li>
                      <li className='actions'>{data[4]}</li>
                 </div>
               <div className="tr">
                {blog.map((el, i) => {
                  return <div key={el._id} className='trdiv'>
                  <li className='num'>{++i}</li>
                  <li className='blg'>{el.title}</li>
                  <li className='title1'>{el.createdAt.slice(0, 10)}</li>
                  <li className='statusp' 
                  style={el.isPublished === true ? {color: 'green'} : {color: 'red'}}
                  >{el.isPublished === true ? <>Published </> : <>Unpublished</>}</li>
                  <li className='actions'
                  onClick={() => handle(el._id)}><button>{el.isPublished === true ? <>Un-Publish </> : <>Publish</>}</button></li>
                  <li><img className='crossimg' src={crossic} alt="" onClick={() => handleclick(el._id)} /></li>
                  </div>
                })
      
                }
               </div>
              </div>
              </>}
    </div>
  )
}

export default Lists