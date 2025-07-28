import React, { useMemo, useRef, useState } from 'react'
import './Add.css'
import logo from './images/upload_area.svg';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
const Add = () => {
  const editor = useRef(null);
  const[description, setdescription] = useState(null);
  const[isPublished, setisPublished] = useState(false);
  const[title, settitle] = useState(null);
  const[subTitle, setsubTitle] = useState(null);
  const[category, setcategory] = useState('Technology');
  const[preview, setpreview] = useState('');
  const[image, setimage] = useState(null);
  const[name, setname] = useState(null);
  const[disabled, setdisabled] = useState(false);
  const btn = document.getElementById('btn');
 
  async function checktitle(){
      if(title !== null){
        try{
        const check = await axios.post('http://localhost:8080/checktitle', {
          title: title
        })
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
  const config = useMemo(
    () => ({
          readonly: false,
          height: 500,
          width: 726
    }),
    []
  );
  function showimage(event){
    const file = event.target.files[0];
    setimage(file);
    setpreview(URL.createObjectURL(file));
  }
  async function handkeupload(){
    const token = Cookies.get('token');
    if(!description || !title || !subTitle || !image){
      toast.warning('please fill it');
    }
    else if(token === undefined){
      toast.error('pls log in as an admin to continue');
    }
    else{
     
      btn.innerHTML = 'Adding blog...';
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("description", description);
      formdata.append("category", category);
      formdata.append("title", title);
      formdata.append("subTitle", subTitle);
      formdata.append("isPublished", isPublished);
      formdata.append("name", name);
      console.log(formdata)
    try{ 
      const response = await axios.post('http://localhost:8080/upload', formdata, {
        headers:{
        "Content-Type": "multipart/form-data",
        },
      });
      if(response.data){
        toast.success(`Blog added successfully`);
      }
      else{
       toast.error(`sorry try again`);
      }
    }
    catch(err){
     toast.error(`err: ${err}`)
    } 
    finally{
     btn.innerHTML = 'Add Blog';
    }
  }

  }
  const blogCategories = ['Technology', 'Startup', 'Lifestyle', 'Finance'];
  return (
    <div className='add'>
     <div className="cont">
      <p>Upload Thumbnail</p>
     <label htmlFor="file"> <img src={logo} alt="" />
      <input type="file" className='file' id='file' accept='.jpg, .jpeg, .png' onChange={showimage}/>
      <img src={preview} alt="" height={70} style={{marginLeft: '10px'}}/>
      </label>
      
      <p>Name</p>
      <input type="text" id='txt' placeholder='Type here'
      onChange={(e) => setname(e.target.value)}
      />
      <p>Blog title</p>
      <input type="text" id='txt' placeholder='Type here'
      onBlur={checktitle}
      onChange={(e) => settitle(e.target.value)}
      />
       <p>Sub title</p>
      <input type="text" id='txt' placeholder='Type here'
      onChange={(e) => setsubTitle(e.target.value)}
      />
      <p>Blog Description</p>
      <JoditEditor
      ref={editor}
      value={description}
      onChange={newcontent => setdescription(newcontent)}
      config={config}
      />
      <p>Blog category</p>
      <select name="" id="" value={category}
      onChange={(e) => setcategory(e.target.value)}
      >
      {
        blogCategories.map((el, i) => {
          return <option value={el} key={i}>{el}</option>
        })
      }
      </select>
      <p className='cont-p'>Publish now <input type="checkbox" className='checkb'
      onChange={() => setisPublished(!isPublished)}
      /></p>
      <button className='btn' onClick={handkeupload} id='btn'
      disabled={disabled}
      >Add blog</button>
     </div>
    </div>
  )
}

export default Add