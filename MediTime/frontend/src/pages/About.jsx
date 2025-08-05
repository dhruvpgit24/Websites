import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-6 md:px-16 py-12 text-[#2E2E2E]">
      <div className="text-center mb-12">
        <p className="text-2xl font-semibold">
          ABOUT <span className="text-[#6C63FF]">US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={assets.about_image}
            alt="About"
            className="max-w-[350px] w-full rounded-xl shadow-md object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 text-sm leading-7 text-[#444] space-y-4">
          <p>
            Welcome to <span className="font-semibold text-[#2E2E2E]">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously enhance our platform to deliver a better user experience with the latest advancements. Whether you're booking your first appointment or managing ongoing care, we're here to support you every step of the way.
          </p>
          <div>
            <p className="font-semibold mb-1 text-[#2E2E2E]">Our Vision</p>
            <p>
              To create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making access to care simple, fast, and efficient.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xl font-semibold mb-8">
        <p>
          WHY <span className="text-[#6C63FF]">CHOOSE US</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        {[
          {
            title: 'EFFICIENCY:',
            desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.',
          },
          {
            title: 'CONVENIENCE:',
            desc: 'Access to a network of trusted healthcare professionals in your area.',
          },
          {
            title: 'PERSONALIZATION:',
            desc: 'Tailored recommendations and reminders to help you stay on top of your health.',
          },
        ].map((box, i) => (
          <div
            key={i}
            className="border p-6 rounded-xl shadow-sm hover:bg-[#F6F0FF] transition duration-300 cursor-pointer"
          >
            <p className="font-bold mb-2">{box.title}</p>
            <p className="text-[#555]">{box.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
