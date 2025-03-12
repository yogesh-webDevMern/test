"use client";
import React, { useState } from 'react';
import { TfiGallery } from "react-icons/tfi";
import { RxCrossCircled } from "react-icons/rx";

export default function MultipleImage({ apiUrl, other_images }) {
    const [otherImages, setOtherImages] = useState(other_images);
    const [open, setIsOpen] = useState(false);
    return (
        <>
            {
                open && <div className='fixed top-1/2 left-1/2 w-[50%] h-[50%] transform -translate-x-1/2 -translate-y-1/2 shadow-md z-[9999] bg-white'>
                    <div className='flex gap-[20px]'>
                        {otherImages.length != 0 ? otherImages.map((image, index) => {
                            return <img width={160} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/other_images/${image}`} key={index} alt="" />
                        }):'No image(s)'}
                    </div>
                    <RxCrossCircled className='cursor-pointer absolute left-[50%] bottom-[20px] text-[20px]' onClick={() => {
                        setIsOpen(false);
                    }
                    } />
                    <div className='bg-white mt-5 mb-5'> 
<input type="file" multiple/>
<button className='py-1 px-2 bg-purple-500 text-white rounded-md'>Save</button>
                    </div>
                </div>

            }

            <TfiGallery onClick={() => {
                setIsOpen(true);
            }
            } className='text-blue-500 cursor-pointer' />
        </>
    )
}
