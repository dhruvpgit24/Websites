import React from 'react'
import { assets, footerLinks } from '../assets/assets';

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/35">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-black">
                <div className="transform transition duration-300 hover:scale-[1.02] hover:drop-shadow-lg">
                    <img className="w-34 md:w-32 drop-shadow" src={assets.logo} alt="dummyLogoColored" />
                    <p className="max-w-[410px] mt-6 text-gray-700 leading-relaxed">
                        Grocer is your one-stop online marketplace for fresh groceries, delivered fast and fresh to your door. Enjoy hassle-free shopping, exclusive deals, and 24/7 customer support.
                    </p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div
                            key={index}
                            className="transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg p-2 rounded-md"
                        >
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-600">
                Copyright {new Date().getFullYear()} © Grocer. All Rights Reserved.
            </p>
        </div>
    );
}

export default Footer
