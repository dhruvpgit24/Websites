import React from 'react';

const Footer = () => {
  return (
    <div className="bg-[#f8f3ff] text-[#2E2E2E] px-6 md:px-16 py-12 rounded-2xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-8">
        <div className="md:w-1/2">
          <img src="/logo.png" alt="Logo" className="w-32 mb-4" />
          <p className="text-[#666666] text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-3">COMPANY</p>
          <ul className="text-[#666666] text-sm space-y-2">
            <li className="hover:text-[#000] cursor-pointer">Home</li>
            <li className="hover:text-[#000] cursor-pointer">About us</li>
            <li className="hover:text-[#000] cursor-pointer">Contact us</li>
            <li className="hover:text-[#000] cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3">GET IN TOUCH</p>
          <ul className="text-[#666666] text-sm space-y-2">
            <li className="hover:text-[#000] cursor-pointer">6659745215</li>
            <li className="hover:text-[#000] cursor-pointer">example@ex.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#D9D9D9] pt-4 text-center text-sm text-[#666666]">
        © {new Date().getFullYear()} MediTime - All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
