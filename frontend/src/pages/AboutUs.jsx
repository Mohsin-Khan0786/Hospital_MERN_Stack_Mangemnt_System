import React from 'react'
import Hero from '../Components/Hero';
import BioGraphy from '../Components/BioGraphy';
const AboutUs = () => {
  return (
    <>
    <Hero 
    title={'We are a team of developers who are passionate about creating innovative solutions for hospitals and healthcare providers.'} 
    imageurl={'/Hero-img.png'}

    
    />
    
    <BioGraphy/>
    </>

    
  )
}

export default AboutUs ;