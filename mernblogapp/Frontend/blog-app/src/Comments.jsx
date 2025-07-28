import React, { useState, useMemo, useRef } from 'react';
import './Comments.css';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Comments = () => {
    const Categories = ['title', 'subTitle', 'description'];
    const [category, setcategory] = useState('title');
    const [value, setvalue] = useState(null);
    const[title, settitle] = useState(null);
    const btn = document.getElementById('btn');
    console.log(btn);
     const editor = useRef(null);
    //  const[description, setdescription] = useState(null);
    console.log(category);
   async function handleupload(){
    btn.innerHTML = 'Updating blog';
    try{
        const update = await axios.post('http://localhost:8080/updateblog', {
          title: title,
          type: category,
          value: value
        })
         if(update.data.success === true){
          toast.success(update.data.message);
         }
         else{
          toast.error(update.data.message);
         }
      }
      catch(err){
        toast.error(err);
      }
      finally{
        btn.innerHTML = 'Update blog';
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
  return (
    <div className='cmain'>
      <div className="cont1">
       
        <h2>Edit Blogs</h2>
        <p>Select the type</p>
          <select name="" id="" value={category}
      onChange={(e) => setcategory(e.target.value)}
      >
      {
        Categories.map((el, i) => {
          return <option value={el} key={i}>{el.toUpperCase()}</option>
        })
      }
      </select>

       <p>Enter the title :</p>
        <input type="text" placeholder='Write the title of the blog' className='cont1-inp' required
         onChange={(e) => settitle(e.target.value)}
        />
      <p>Enter the changes :</p>
      {category !== 'description' ? <> <input type="text" id='txt' placeholder='Write the changes here' className='cont1-inp' required
      onChange={(e) => setvalue(e.target.value)}
      /></> : <>
       <JoditEditor
             ref={editor}
             value={value}
             onChange={newcontent => setvalue(newcontent)}
             config={config}
             />
      </>}
      <button className='c-btn' onClick={handleupload} id='btn'>Update blog</button>
      </div>
    </div>
  )
}

export default Comments