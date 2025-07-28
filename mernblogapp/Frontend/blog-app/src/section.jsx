import React, { useContext, useState } from 'react';
import './section.css';
import bg from './images/gradientBackground.png';
import icon from './images/star_icon.svg';
import {DataContext} from './Dataprovider'
const Section = () => {
    const[placeholder, setplaceholder] = useState('Search for blogs');
    const {setname} = useContext(DataContext);

  return (
    <div className='section'>
      <img src={bg} alt="" className='img'/>
      <div className='content'>
        <div className="feature">New: AI feature integrated<img src={icon} alt="" className='icon'/></div>
           
            <h1 className='h-h1'>Your own <span>blogging</span></h1>
            <h1 className='h-h2'>platform.</h1>
            <p className='p1'>This is your space to think out loud, to share what matters, and to write without
                filters. Whether
            </p>
            <p className="p2">it's one word or a thousand your story starts right there</p>
            <div className="search">
                <input type="text" placeholder={placeholder} className='inp'
                onChange={(e) => setname(e.target.value)}
                />
                
            </div>
      </div>
      
    </div>
  )
}

export default Section