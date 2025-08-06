import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="px-6 py-10 bg-[--bg-gradient]">
      <h2 className="text-3xl font-bold text-[--text-dark] mb-6  mt-10">Categories</h2>

      <div className="flex flex-wrap justify-between gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="w-[100px] sm:w-[120px] h-[140px] flex-shrink-0 rounded-xl p-3 flex flex-col items-center justify-center shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(67,196,99,0.4)] hover:-translate-y-1 mt-10"
          >
            <img
              src={category.image}
              alt={category.text}
              className="w-10 h-10 object-contain mb-2 transition-transform duration-300"
            />
            <p className="text-[--text-dark] text-sm font-medium text-center">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
