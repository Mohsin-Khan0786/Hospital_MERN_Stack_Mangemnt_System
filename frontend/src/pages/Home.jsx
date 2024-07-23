import React from 'react';
import Hero from '../Components/Hero';
import BioGraphy from '../Components/BioGraphy';
import Departments from '../Components/Departments';
import MessageForm from '../Components/MessageForm';


const Home = () => {
  return (
    <div className="p-6">
      
      <Hero
        title={'Welcome to MohsinCare Hospital: Providing Innovative and Compassionate Healthcare Services'}
        imageurl={'/Hero-img.png'}
      />
      <BioGraphy imageUrl={'/about.png'} />
      <Departments />
      <MessageForm />
    </div>
  );
};

export default Home;
