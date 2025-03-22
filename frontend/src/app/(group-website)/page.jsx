import React from 'react';
import image from "@/images/phone.png";
import Image from "next/image";
export default function Page() {
  return (
    <div className='text-center w-full'>
<div className='max-w-[1500px] mx-auto min-h-screen bg-gradient-to-r from-[#E71D3A] via-[#ECC7C1] via-45% via-[#EFCAC4] via-58% via-[#E4BDB8] via-70% to-[#42A8FE]'>
  <div className='flex justify-end md:mr-[50px]'>

<Image 
          src={image} 
          alt="Carousel Image" 
          width={570} 
          className=""
          priority // Loads this image first
          />
          </div>
</div>
    </div>
  )
}
