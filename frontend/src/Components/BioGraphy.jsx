import React from 'react';

const BioGraphy = ({ imageUrl }) => {
  return (
    <div className="w-[97%] flex flex-col md:flex-row justify-between items-center gap-10 mt-[100px] mb-[100px]">

      <div className='w-full md:w-[50%]'>
        <img src={imageUrl} alt="About Pic" />
      </div>


      <div className='w-full md:w-[60%]'>
        <h1 className='text-2xl font-semibold'>Who We Are</h1>
        <p className='text-base'>
          MohsinCare Hospital is a state-of-the-art facility equipped with the
          latest medical technology and staffed by highly skilled healthcare
          professionals. Whether you need routine check-ups, specialized
          treatments, or emergency care, MohsinCare Hospital ensures you
          receive the best possible care in a comforting and supportive
          environment. Welcome to MohsinCare Hospital, where your health is
          our priority.
        </p>
        <p className='text-base'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam,
          tempore?
        </p>
        <p className='text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
       
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit.</p>
      </div>
    </div>
  );
};

export default BioGraphy;
