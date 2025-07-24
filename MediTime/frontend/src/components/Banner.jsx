import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

    const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-around px-6 md:px-16 py-10 bg-[#e9daff] rounded-3xl shadow-md mx-4 md:mx-8 my-10">
      
      <div className="text-center lg:text-left space-y-3">
        <div>
          <p className="text-2xl md:text-3xl font-bold text-[#2E2E2E] leading-snug">Book Appointment</p>
          <p className="text-[#666666] text-sm">With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-[#6C63FF] hover:bg-[#9708CC] text-white px-5 py-2 rounded-full font-medium text-sm transition">
          Create Account
        </button>
      </div>

      <div className="hidden lg:block">
        <img 
          src={assets.appointment_img}
          alt="Appointment"
          className="h-60 object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
