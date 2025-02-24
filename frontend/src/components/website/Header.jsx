"use client";
import { useState } from 'react';
import React from 'react';
import { CgProfile } from "react-icons/cg";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

export default function Header() {
  const menuitems = [
    {
      name:"Home",
      path:"/home"
    },
    {
      name:"STORE",
      path:"/store"
    },
    {
      name:"IPHONE",
      path:"/iphone"
    },
    {
      name:"IPAD",
      path:"/ipad"
    },
    {
      name:"MACEBOOK",
      path:"/mackebook"
    },
    {
      name:"ACCESSORIES",
      path:"/accessories"
    },
  ]
// const [menuBar,setMenuBar]= useState(false);
  return (

<>
<div className="header w-full">
  <div className="max-w-[1300px] py-2 px-5 mx-auto">
    <div className='flex items-center justify-between md:justify-end gap-5 font-bold text-[#262626]'>
    {/* <CiMenuFries  className='cursor-pointer md:hidden' onClick={setMenuBar(false) }/> */}
    {/* <RxCross2 className='cursor-pointer' onClick={setMenuBar(true)} /> */}
    <div className='flex  gap-2 cursor-pointer items-center'>

    <div className='flex items-center justify-end gap-2 cursor-pointer'>
   <CgProfile className='font-bold' />
   My profile
   </div> 
   <div className='flex items-center gap-2 cursor-pointer'>
   <FaBagShopping />
   2 items
   </div>
   
   <IoIosSearch className='cursor-pointer' />
    </div>
    </div>
  </div>
  <h1 className='text-center font-bold text-3xl text-[#FF4252] mt-4'>iSHOP</h1>
<div className="menuItems  max-w-[600px]  mx-auto flex justify-center items-center">
  <ul className='flex gap-5 fs'>
 {
  menuitems.map((d,i)=>
  {
    return (
      <li className='uppercase' key={i}>
      <Link className='uppercase hidden md:block'  href={d.path}>{d.name}</Link>
    </li>
    )
  })
 }
  </ul>
</div>
</div>
</>
  )
}
