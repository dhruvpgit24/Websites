import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const MainBanner = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const textColor = useTransform(scrollYProgress, [0, 0.4], ["#1e1e1e", "#ffffff"]);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const x = (e.clientX - container.offsetLeft) / container.offsetWidth;
    const y = (e.clientY - container.offsetTop) / container.offsetHeight;

    container.style.setProperty("--rotateX", `${(0.5 - y) * 10}deg`);
    container.style.setProperty("--rotateY", `${(x - 0.5) * 10}deg`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[90vh] overflow-hidden rounded-xl perspective-[1000px]"
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateX(var(--rotateX)) rotateY(var(--rotateY))",
        transition: "transform 0.1s ease-out",
      }}
    >
      <>
  <motion.img
    src={assets.main_banner_bg}
    alt="Banner"
    className="hidden sm:block absolute inset-0 w-full h-full object-cover"
    style={{ scale, opacity }}
  />
  <motion.img
    src={assets.main_banner_bg_sm}
    alt="Mobile Banner"
    className="block sm:hidden absolute inset-0 w-full h-full object-cover"
    style={{ scale, opacity }}
  />
</>


      <motion.div
        className="absolute top-1/2 left-[8%] -translate-y-1/2 text-left z-10 max-w-[90%] sm:max-w-[500px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ color: textColor }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-xl mb-6 leading-tight">
          Freshness You Can Trust,<br />Savings You'll Love!
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full px-4">
  <Link
    to="/products"
    className="w-full sm:w-auto text-center flex items-center justify-center gap-2 bg-[#43c463] text-white px-6 py-3 rounded-full hover:scale-105 transition duration-300 shadow-lg"
  >
    Shop Now
    <img src={assets.white_arrow_icon} alt="→" className="w-4 h-4" />
  </Link>

  <Link
    to="/products"
    className="hidden sm:flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition duration-300 shadow-md"
  >
    Explore Deals
    <img src={assets.black_arrow_icon} alt="→" className="w-4 h-4" />
  </Link>
</div>

      </motion.div>
    </div>
  );
};

export default MainBanner;
