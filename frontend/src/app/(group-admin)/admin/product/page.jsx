"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { getProductData } from '@/library/api-call';
import { timeAgo } from "@/library/helper";
import Link from 'next/link';
import { FaEdit } from "react-icons/fa";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from '@/components/admin/ToggleStatus';
import ViewDetail from '@/components/admin/ViewDetail';
import MultipleImage from '@/components/admin/MultipleImage';

export default function Page() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productJson = await getProductData();
        setProducts(productJson?.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className='flex justify-between'>
        <div className='mt-[10px] font-bold text-xl ml-3'>Products</div>
        <div className='flex gap-5'>

        <div className='px-3 py-1 text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-md mt-3'><Link href="/admin/product/trash-products">View Trash</Link></div>
        <Link href="/admin/product/add" className='py-1 px-2 text-white rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 mt-3 mr-4'>Add Product</Link>
        </div>
      </div>

      <div className='p-[20px]'>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">NAME / slug</th>
              <th className="p-2 border">PRICE</th>
              <th className="p-2 border">IMAGE</th>
              <th className="p-2 border">CATEGORY</th>
              <th className="p-2 border">COLOR</th>
              <th className="p-2 border">CREATED / UPDATED</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">ACTIONS</th>

            </tr>
          </thead>
          <tbody>
            {
              products.length > 0 && products.map((prod, index) => (
                <tr key={prod._id} className="hover:bg-gray-50">
                  <td className="p-2 border text-black">{index + 1}</td>
                  <td className="p-2 border">{prod.name}/{prod.slug}</td>
                  <td className="p-2 border"><div>price : {prod.price}</div>
                    <div>  discount : {prod.discount}%</div>
                    <div>  Final Price : {prod.final_price}</div>
                  </td>
                  <td className="p-2 border">
                    <img className='rounded-lg' width={70} height={100} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/product/${prod.main_image}`} alt="" />

                  </td>
                  <td className="p-2 border">{prod.category_id.name}</td>
                  <td className="p-5 border">
                    <ul className='list-disc text-center'>


                      {
                        prod.colors.map((color) => {
                          return (
                            <>
                              <li >{color.name}</li>
                              <div style={{ backgroundColor: color.name }} className={`w-[60px] mx-auto h-[20px] rounded-full`}></div>
                            </>
                          )
                        })
                      }
                    </ul>
                  </td>
                  <td className="p-2 border">{timeAgo(prod.createdAt)} / {timeAgo(prod.updatedAt)}</td>
                  <td className="p-2 border">
                    <ToggleStatus status={prod.status} id={prod._id} apiUrl={`/product/change-status`} />
                  </td>
                  <td className="p-2 border text-center">
                    <div className='flex flex-col items-center gap-2'>


                      <Link href={`/admin/product/edit/${prod._id}`}>
                        <button className="text-yellow-500 hover:text-yellow-600">
                          <FaEdit />
                        </button>
                      </Link>
                      <DeleteBtn flag={1} deleteUrl={`/product/move-to-trash/${prod._id}`} />
                      <ViewDetail data ={prod.description}/>
                      <MultipleImage apiUrl={`/product/add-other-images/${prod._id}`} other_images={prod.other_images}/>
                    </div>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </>

  )
}

