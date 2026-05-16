import React from 'react'
import Header from '../Components/Header'
import TopDoctors from '../Components/TopDoctors'
import SpecialityMenu from '../Components/SpecialityMenu'
import Banner from '../Components/Banner'


const Home = () => {
  return (
    <div>
      
      <Header />
      <SpecialityMenu />
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home
