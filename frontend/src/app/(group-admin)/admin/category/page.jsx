// "use client"

// import { useState } from "react";
import { FaEdit} from "react-icons/fa";
import Link from "next/link";
import {getCategoryData} from "@/library/api-call";
import {timeAgo} from "@/library/helper";
import DeleteBtn from "@/components/admin/DeleteBtn";
import ToggleStatus from "@/components/admin/ToggleStatus";

const CategoryList =async () => {
 
const categoryJSON = await getCategoryData();
const categories = categoryJSON?.categories;
    // const handleDelete = (id) => {
    //     setCategories(categories.filter((category) => category.id !== id));
    // };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className=" bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Categories</h2>
                    <div className="flex gap-5">
                    <Link href="/admin/category/move-to-trash">
                    
                    <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center hover:bg-purple-600">
                    View Trash
                    </button>
                    </Link>
                    <Link href="/admin/category/add">
                    
                    <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center hover:bg-purple-600">
                        + Add Category
                    </button>
                    </Link>
                    </div>
                
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">NAME</th>
                            <th className="p-2 border">Slug</th>
                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Created</th>
                            <th className="p-2 border">Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {categoryJSON!=null && categories.map((category,index) => (
                            <tr key={category._id} className="hover:bg-gray-50">
                                <td className="p-2 border text-black">{index+1}</td>
                                <td className="p-2 border">{category.name}</td>
                                <td className="p-2 border">{category.slug}</td>
                                <td className="p-2 border">
                                <ToggleStatus status={category.status} id={category._id} apiUrl={`/category/change-status`} />
                                </td>
                                <td className="p-2 border">{timeAgo(category.createdAt)}</td>
                                <td className="p-2 border flex justify-center gap-3">
                                    <Link href={`/admin/category/edit/${category._id}`}>
                                    <button className="text-yellow-500 hover:text-yellow-600">
                                        <FaEdit />
                                    </button>
                                    </Link>
                            <DeleteBtn flag={1} deleteUrl={`/category/move-to-trash/${category._id}`}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;