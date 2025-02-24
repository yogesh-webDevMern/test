"use client";   
import React from 'react';
// import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import {axiosApiInstance} from "@/library/helper";
import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation';


export default function DeleteBtn({deleteUrl,flag}) {
 const router = useRouter();
    const deleteHandler=()=>
    {
        if(flag==1)
        {
          //trash code 
        toast.loading("moving to trash...");
          axiosApiInstance.patch(deleteUrl).then((response)=>
            {
    if(response.data.flag==1)
    {
        toast.dismiss();
    toast.success(response.data.message);
    router.refresh();
    }
    else
    {
    toast.error(response.data.message);
    }
            }).catch((error)=>
            {
    toast.error('something went wrong');
            })

        }else
        {
          //delete code 
        toast.loading("Deleting...");
          axiosApiInstance.delete(deleteUrl).then((response)=>
            {
    if(response.data.flag==1)
    {
        toast.dismiss();
    toast.success(response.data.message);
    router.refresh();
    }
    else
    {
    toast.error(response.data.message);
    }
            }).catch((error)=>
            {
    toast.error('something went wrong');
            })
        }

    }
  return (

    <button onClick={deleteHandler} className="text-red-500 hover:text-red-600" >
    <FaTrash />
</button>
  )
}
