import React from "react";

const Hero = ({ title, imageurl }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="md:w-1/2 mb-6 md:mb-0 mr-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-600">{title}</h1>
        <p className="text-gray-700">
          At MohsinCare Hospital, we are dedicated to offering exceptional
          medical care with a focus on innovation and compassion. Our
          state-of-the-art facility is equipped with the latest medical
          technology and staffed by highly skilled healthcare professionals.
          Whether you need routine check-ups, specialized treatments, or
          emergency care, MohsinCare Hospital ensures you receive the best
          possible care in a comforting and supportive environment. Welcome to
          MohsinCare Hospital, where your health is our priority.
        </p>
      </div>
     
        <div className="md:w-1/2">
          <img
            src={imageurl}
            alt="Hero Image"
            className="w-full h-auto object-cover "
          />
        </div>
     </div>
  );
};

export default Hero;
