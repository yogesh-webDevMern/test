"use client";
import axios from "axios";
import React from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import {titleToSlug} from '@/library/helper';
import {toast} from 'react-toastify';
import { useParams } from "next/navigation";
import {axiosApiInstance} from "@/library/helper";

export default function Page() {
  const nameRef = useRef();
  const slugRef = useRef();
  const params = useParams();
  const id = params.id;
  console.log(params.category_id);
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
  slug:slugRef.current.value
}
//send data to the server

axiosApiInstance.put(`/category/update/${id}`,data)
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
}
)
  }

  return (
    <>
    <div className="p-6">
    <div className=" p-4 rounded-lg shadow-md min-h-[calc(100vh-76px)]">
        <div className="flex justify-between items-center mb-4 ">
            <h2 className="md:text-xl font-semibold">Category / Edit</h2>
            <Link href="/admin/category" legacyBehavior>
                    <button className="bg-purple-500 text-[14px] md:text-[18px] text-white md:px-4 md:py-2 rounded hover:bg-purple-600">
                        Back to View
                    </button>
                    </Link>

       
            </div>
            <div className='max-w-[100%]  bg-purple-500 rounded-md p-4 md:p-7'>
                <form action="" className='block md:flex items-center  md:gap-7 text-white' onSubmit={submitHandler}>
                    <span >
                    <label htmlFor="categoryName" className='text-[14px] md:text-[18px]'> Category Name  </label>
                    <input ref={nameRef} onChange={nameChnageHandler} type="text" id="categoryName" className='outline-none px-2 max-w-full bg-purple-400 py-1 rounded placeholder-purple-800 placeholder:text-[13px] placeholder:text-center' placeholder='Enter Category Name' />
                    </span>
                  <span>
                  <label htmlFor="categorySlug" className='text-[14px] md:text-[18px]'> Category Slug  </label>
                  <input ref={slugRef} readOnly type="text" id="categorySlug" className='outline-none max-w-full px-2 py-1 bg-purple-400 rounded placeholder-purple-800 placeholder:text-[13px] placeholder:text-center' placeholder='Enter Category Slug' />
                    </span> 
                    <button  className='bg-purple-400 text-white px-2 py-1 mt-3 md:mt-0x rounded'>Add</button>
              
                </form>
            </div>
            </div>
    

    </div>
    </>
  )
}
