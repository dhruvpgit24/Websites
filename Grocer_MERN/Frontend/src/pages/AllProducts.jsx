import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion'

const AllProducts = () => {
  const { products, searchQuery } = useAppContext()
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredProducts(products)
    }
  }, [products, searchQuery])

  return (
    <div className='mt-16 flex flex-col px-4 sm:px-8 bg-gray-50 min-h-screen dark:bg-transparent'>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        className='flex flex-col items-start w-full mb-6'
      >
        <p className='text-2xl font-bold text-gray-800 dark:text-black uppercase tracking-wider'>
          All Products
        </p>
        <div className='w-16 h-1 bg-primary rounded-full mt-1 shadow-md' />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'
      >
        {filteredProducts
          .filter(product => product.inStock)
          .map((product, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                y: -6,
                boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 12 }}
              className='rounded-xl bg-white dark:bg-[#b5e8c2] p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out'
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  )
}

export default AllProducts
