import React, { useEffect, useState } from 'react'
import { blog_data, comments_data } from './images/assets';
import { useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import bg from './images/gradientBackground.png'
import bin from './images/bin_icon.svg'; 
import Nav from './Nav'
import './blogs.css';
import './Nav.css';
import axios from 'axios'
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import icon1 from './images/twitter_icon.svg';
import icon2 from './images/facebook_icon.svg';
import icon3 from './images/googleplus_icon.svg';
import Footer from './footer';
const Blogs = () => {
    const[data, setdata] = useState([]);
    const[date, setdate] = useState('');
    const[comments,setcomments] = useState();
    const[comment, setcomment] = useState('');
    const[loading, setloading] = useState(true);
    const[name, setname]= useState(null);
    const[url, seturl] = useState(null);
    const {id} = useParams();
    const cname = Cookies.get('name');
    const[bid, setbid] = useState(id);
  //  console.log(typeof bid);
  //  console.log(data);
  //  console.log(id);
 
   useEffect(() => {
    
      const name = Cookies.get('name');
      const url = Cookies.get('image');
      setname(name);
      seturl(url);
   },[]) 
    
    useEffect(() => {

       async function fetch(){
        try{
        const response = await axios.post('http://localhost:8080/findblog', {
          id: bid
        });
       

        /*const date = find.createdAt.slice(0, 10);
        const d = new Date(date);
        const datestring = d.toDateString();*/
        console.log(response.data);
      
        setdata(response.data);
       
       //  const find = await response.data.find((e) => e._id === id);
        const date = response.data.createdAt.slice(0, 10);
        const d = new Date(date);
        const datestring = d.toDateString();
        setdate(datestring)
        setcomments(response.data.comments)
        console.log('hh');}
        catch(err){
          console.log(err)
        }
        finally{
          setloading(false)
        }
    }
      
       fetch();
    },[])
    async function addcomment() {
      try{
      const addcom = await axios.post('http://localhost:8080/comments', {
        name: name,
        id: bid,
        image: url,
        comment: comment
      });
     
       toast.success("Your Comment added");
        setcomments(addcom.data.comments);
      
    }
    catch(err){
       console.log(err);
    }
    finally{
      console.log("added");
    }
    }
     async function deletecomment(id){
      try{
      const deleted = await axios.post('http://localhost:8080/deletecomment', {
        id: bid,
        cid: id
      })
      if(deleted.data.success === true){
        toast.success('Comment deleted');
        setcomments(deleted.data.blogdata.comments);
      }
      else{
        toast.error("Comment deletion failed");
      }
    }
  catch(err){
  toast.error(err);
  }
  }
  return (
  
  
    <div className='blogs'>
    <div className='nav'>
 
   </div>
   {loading ? <p>Loading data...</p> : 
   
   <>
    <img src={bg} alt="" className='img1'/>
      <p className='p-p1'>Published on {date}</p>
      <h1>{data.title}</h1>
      <p  className='p-p2'>{data.subTitle}</p>
      <p className='p-pp'>{data.name}</p>
      <img src={data.image.url} alt="" className='img2'/>
      <div dangerouslySetInnerHTML={{__html: data.description}} className='rich-text'></div>
      <div className="comments">
      <p className="p-p3">Comments ({comments.length})</p>
      {comments.length === 0 ? <div className='comment'>No comments yet</div> : <div className='cmnt'>
        {comments.map((el, i) => {
          return <div key={el._id} className='mainn'>
            <div className="items">
           <div className='i'><img src={el.image} alt="" height={30}/></div> 
            <p>{el.name}</p>
            </div>
            <p className='p-p5'>{el.comment}</p>
            <p className='p-p6'>{el.createdAt.slice(0, 10)}
            {cname === el.name || cname === 'Meshwa shah'? <><img src={bin} alt="" height={15}
              onClick={() => deletecomment(el._id)}
              /></> : <></>}
            </p>
        
          </div>
          
        })}
        </div>}
      <p className="p-p4">Add your comment</p>
      <textarea placeholder='Comment' id="" rows={10}
      onChange={(e) => setcomment(e.target.value)}
      ></textarea>
      <button className='btn1'
     onClick={addcomment}
      >Submit</button>
      <div className="follows">
      <p>Share this article on social media</p>
      <img src={icon1} alt="" />
      <img src={icon2} alt="" />
      <img src={icon3} alt="" />
    </div> 
      </div> 
    </>}
    <Footer/>
    </div>
  
  )
}

export default Blogs






