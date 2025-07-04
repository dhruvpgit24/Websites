import React from 'react'
import Herosection from '../components/Herosection'
import OurServices from '../components/OurServices'
import FeaturedListings from '../components/FeaturedListings'
import Footer from '../components/Footer'
import HowItWorks from '../components/HowItWorks'

const Home = () => {
  return (
    <div>
      <Herosection/>
      <OurServices/>
      <FeaturedListings/>
      <HowItWorks/>
      <Footer/>
    </div>
  )
}

export default Home