"use client";
import axios from "axios";
import React from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import {titleToSlug} from '@/library/helper';
import {toast} from 'react-toastify';

export default function Page() {
  const nameRef = useRef();
  const slugRef = useRef();
  const haxRef = useRef();
  // console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
  const nameChnageHandler =()=>
  {
slugRef.current.value = titleToSlug(nameRef.current.value);
  }
  const submitHandler = (e)=>
  {
e.preventDefault();
// console.log(nameRef.current.value);
// console.log(slugRef.current.value);
const data = {
  name:nameRef.current.value,
  slug:slugRef.current.value,
    colorhex:haxRef.current.value
}
if (!data.name || !data.slug || !data.colorhex)
{
  toast.info("please fill the data");
  return;
}
//send data to the server

axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/color/create',data)
.then(response=>
{
  console.log(response.data);
  if(response.data.flag==1)
  {
e.target.reset();
toast.success(response.data.message);
  }
  else
  {
toast.error(response.data.message);
  }
}
).catch(error=>
{
  console.log(error);
  toast.error("something went wrong");
}
)
  }

  return (
    <>
    <div className="p-6">
    <div className=" p-4 rounded-lg shadow-md min-h-[calc(100vh-76px)]">
        <div className="flex justify-between items-center mb-4 ">
            <h2 className="md:text-xl font-semibold">Color / Add</h2>
            <Link href="/admin/color" legacyBehavior>
                    <button className="bg-purple-500 text-[14px]  text-white md:px-4 md:py-2 rounded hover:bg-purple-600">
                        Back to View
                    </button>
                    </Link>

       
            </div>
            <div className='max-w-[100%]  shadow-md rounded-md p-4 md:p-7'>
                <form action="" className='block md:flex items-center  md:gap-7' onSubmit={submitHandler}>
                    <span >
                    <label htmlFor="categoryName" className='text-[14px] '> Color  Name  </label>
                    <input ref={nameRef} onChange={nameChnageHandler} type="text" id="categoryName" className='outline-none px-2 max-w-[60%] shadow-xl py-1 rounded placeholder-purple-800 placeholder:text-[13px] placeholder:text-center' placeholder='Enter Color name' />
                    </span>
                    <span >
                    <label htmlFor="categoryName" className='text-[14px] '> Select colors  </label>
                    <input ref={haxRef} type="color" id="categoryName" className='outline-none px-2  max-w-[60%] shadow-xl rounded placeholder-purple-800 placeholder:text-[13px] placeholder:text-center' placeholder='Enter Color name' />
                    </span>
                  <span>
                  <label htmlFor="categorySlug" className='text-[14px] '> Category Slug  </label>
                  <input ref={slugRef} readOnly type="text" id="categorySlug" className='outline-none max-w-[60%] px-2 py-1 shadow-xl rounded placeholder-purple-800 placeholder:text-[13px] placeholder:text-center' placeholder='Enter Category Slug' />
                    </span> 
                    <button  className='bg-purple-500 text-white px-2 py-1 mt-3 md:mt-0x rounded'>Add</button>
              
                </form>
            </div>
            </div>
    

    </div>
    </>
  )
}
