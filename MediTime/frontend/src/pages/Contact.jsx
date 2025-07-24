import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="px-6 md:px-16 py-12 text-[#2E2E2E]">
      <div className="text-center mb-12">
        <p className="text-2xl font-semibold">
          CONTACT <span className="text-[#6C63FF]">US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={assets.contact_image}
            alt="Contact"
            className="max-w-[350px] w-full rounded-xl shadow-md object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-6 text-sm text-[#444] leading-7">
          <div>
            <p className="font-semibold text-[#2E2E2E] mb-1">OUR OFFICE</p>
            <p>
              00000 Willms Station <br />
              Suite 000, Washington, USA
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2E2E2E] mb-1">CONTACT</p>
            <p>
              Tel: (000) 000-0000 <br />
              Email: greatstackdev@gmail.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-[#2E2E2E] mb-1">
              CAREERS AT PRESCRIPTO
            </p>
            <p>Learn more about our teams and job openings.</p>
            <button className="mt-3 px-4 py-2 bg-[#6C63FF] text-white rounded-lg hover:bg-[#574bc8] transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
