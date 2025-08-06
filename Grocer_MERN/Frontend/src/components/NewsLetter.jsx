import React from 'react';

const NewsLetter = () => {
  return (
    <div className="mt-20 px-4">
      <div className="flex flex-col items-center justify-center text-center space-y-3 bg-white rounded-2xl p-6 sm:p-10 shadow-lg max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
          Never Miss a Deal!
        </h1>
        <p className="text-sm md:text-lg text-gray-500/80 max-w-xl">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </p>

        <form
          className="flex flex-col md:flex-row w-full max-w-2xl gap-3 md:h-14 mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="flex-1 h-16 md:h-full px-4 text-sm md:text-base text-gray-600 bg-white border border-gray-300 rounded-md md:rounded-l-md md:rounded-r-none outline-none"
            type="email"
            placeholder="Enter your email address"
            required
          />
          <button
            type="submit"
            className="h-12 md:h-full px-6 md:px-10 bg-indigo-500 text-white font-medium text-sm md:text-base rounded-md md:rounded-r-md md:rounded-l-none hover:bg-indigo-600 active:scale-95 transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
