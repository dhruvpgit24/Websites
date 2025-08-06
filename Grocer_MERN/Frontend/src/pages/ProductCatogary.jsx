import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
  const { products } = useAppContext()
  const { category } = useParams()

  const searchCategory = categories.find(
    item => item.path.toLowerCase() === category
  )

  const filteredProducts = products.filter(
    product => product.category.toLowerCase() === category
  )

  return (
    <div className='mt-16 px-4 sm:px-8 min-h-screen bg-gray-50 dark:bg-transparent'>
      {searchCategory && (
        <div className='flex flex-col items-start w-full mb-6'>
          <p className='text-2xl font-bold text-gray-800 dark:text-black uppercase tracking-wider'>
            {searchCategory.text}
          </p>
          <div className='w-16 h-1 bg-primary rounded-full mt-1 shadow-md' />
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 sm:gap-6'>
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className='rounded-xl bg-white dark:bg-[#ecffd7] p-4 shadow-md border border-gray-200 dark:border-gray-600 transition-transform duration-300 ease-in-out hover:scale-[1.04] hover:-translate-y-1 hover:shadow-lg'
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center h-[60vh]'>
          <p className='text-gray-600 dark:text-gray-300 text-lg'>
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductCategory
