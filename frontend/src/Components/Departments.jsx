import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Departments = () => {
  const departmentsArray = [
    { name: 'Pediatrics', imageUrl: '/Pediatrics.jpg' },
    { name: 'Orthopedics', imageUrl: '/Orthopedics.jpg' },
    { name: 'Cardiology', imageUrl: '/Cardiology.jpg' },
    { name: 'Neurology', imageUrl: '/Neurology.jpg' },
    { name: 'Oncology', imageUrl: '/Oncology.jpg' },
    { name: 'Radiology', imageUrl: '/Radiology.jpg' },
    { name: 'Physical Therapy', imageUrl: '/Physical-Therapy.jpg' },
    { name: 'Dermatology', imageUrl: '/Dermatology.jpg' },
    { name: 'ENT', imageUrl: '/ENT.jpg' },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Departments</h2>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        className="mb-6"
      >
        {departmentsArray.map((depart, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 mx-2"
          >
            <div className="text-lg font-semibold mb-2 text-gray-800">{depart.name}</div>
            <img
              src={depart.imageUrl}
              alt={depart.name}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Departments;
