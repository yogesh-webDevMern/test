"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { titleToSlug } from '@/library/helper';
import { getCategoryData } from "@/library/api-call";
import { getColorData } from "@/library/api-call";
import Select from 'react-select';
import { axiosApiInstance } from "@/library/helper";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";



export default function AddProduct() {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [description, setDescription] = useState("");


  const getData = async () => {
    const category_response = await getCategoryData();
    const categorie_data = category_response?.categories;
    setCategory(categorie_data);
    const color_response = await getColorData();
    const color_data = color_response.colors;
    setColor(color_data);
  }

  useEffect(
    () => {
      getData();
    }, []
  )

  const [errors, setErrors] = useState({
    name: "",
    slug: "",
    original_Price: "",
    discountInper: "",
    final_price: ""
  })
  const nameRef = useRef();
  const slugRef = useRef();
  const originalPriceRef = useRef();
  const percentageRef = useRef();
  const finalPriceRef = useRef();


  const handleChange = () => {
    axiosApiInstance.get(`/product/check-product-exists/${nameRef.current.value}`).
      then((response) => {
        if (response.data.flag == 0) {

          setErrors(
            {
              ...errors,
              name: "product name already exists"
            }
          )
        }
        else {
          setErrors(
            {
              ...errors,
              name: ""
            }
          )
        }

      }).catch((error) => {

      })
    slugRef.current.value = titleToSlug(nameRef.current.value);

  };
  const priceChangeHandler = () => {
    const originalPrice = originalPriceRef.current.value;
    const discoutPercentage = percentageRef.current.value;
    if (discoutPercentage > 100) {
      setErrors(
        {
          ...errors,
          discountInper: "Discount percent must be less then 100"
        }
      )
      return;
    }
    else if (discoutPercentage < 0) {
      setErrors(
        {
          ...errors,
          discountInper: "price must be greater than 0"
        }

      )
      return;
    }
    else {
      setErrors(
        {
          ...errors,
          discountInper: ""
        }
      )
    }
    const finalPrice = originalPrice - (discoutPercentage / 100 * originalPrice);
    finalPriceRef.current.value = finalPrice;

  }

  // const handleImageChange = (e) => {
  //   setProduct({ ...product, image: e.target.files[0] });
  // };

  // const handleSubmit = (e) => {f
  //   e.preventDefault();
  //   console.log("Product Data:", product);
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    //     const data = {
    // name:nameRef.current.value,
    // slug:slugRef.current.value,
    // original_price:originalPriceRef.current.value,
    // discount_price:originalPriceRef.current.value,
    // final_price:finalPriceRef.current.value,
    // category:e.target.category.value,
    // colors:selectedColors,
    // description:e.target.description.value
    //     }
    // console.log(e.target.image.files[0]);
    // console.log(e.target.category.value);
    // console.log(selectedColors);
    // console.log(e.target.image.files[0]);
    const formData = new FormData();
    formData.append('name', nameRef.current.value);
    formData.append('slug', slugRef.current.value);
    formData.append('original_price', originalPriceRef.current.value);
    formData.append('discount_percentage', percentageRef.current.value);
    formData.append('final_price', finalPriceRef.current.value);
    formData.append('category', e.target.category.value);
    formData.append('colors', JSON.stringify(selectedColors));
    formData.append('description',description);
    formData.append('image', e.target.image.files[0]);
    axiosApiInstance.post('/product/add', formData).
      then((response) => {
        if (response.data.flag == 1) {
          router.push("/admin/product");
          toast.success(response.data.message);
        }
        else {
          toast.error(response.data.message);
        }
      }).catch((error) => {
        toast.error("something went wrong");
      })

  }
  return (
    <div className="max-w-[90%] mt-[50px] mx-auto p-8 bg-white shadow-lg rounded-xl">
      <div className="flex justify-end">
        <div className="bg-purple-500 w-[130px] cursor-pointer py-1 text-center rounded-md text-white">
          <Link href="/admin/product">View Products</Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form className="space-y-6" onSubmit={submitHandler}>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full p-3 border h-[40px] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={handleChange} ref={nameRef}
            />
            {
              errors.name != "" &&
              <div className="text-red-500 text-sm">{errors.name}</div>
            }
          </div>

          <input
            type="text"
            name="slug"
            placeholder="Product Slug"
            className="w-full h-[40px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ref={slugRef}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* <select
            name=""
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          
          >
            <option value="">Select Category</option>
          {
            category.map((item)=>
            {
              return   <option key={item._id} value="{item.id}">{item.name}</option>
           
            })
          }
          </select>  */}
          <Select name="category" options={
            category.map((item) => {
              return { label: item.name, value: item._id }
            })
          } />
          {/* <select
            name="colors"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"

          >
            <option value="">Select Color</option>
          {
            color.map((item)=>
            {
              return <option key={item._id} value="{item.id}">{item.name}</option>
            })
          }
          </select> */}
          <Select onChange={(options) => {

            // console.log(options)
            const data = options.map((color) => {
              return color.value;
            })
            setSelectedColors(data);
          }} name="colors" closeMenuOnSelect={false} isMulti={true} options={
            color.map((item) => {
              return { label: item.name, value: item._id }
            })
          } />
        </div>
        <div className="grid grid-cols-3 gap-6">
          <input
            type="number"
            name="original_price"
            onChange={priceChangeHandler}
            ref={originalPriceRef}
            placeholder="Original Price"
            className="w-full h-[50px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"

          />
          <div className="">

            <input
              type="number"
              name="discountInper"
              placeholder="Discount %"
              onChange={priceChangeHandler}
              ref={percentageRef}
              className="w-full h-[50px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"

            />
            {errors.discountInper != "" &&
              <div className="text-red-500 text-sm  mt-1">{errors.discountInper}</div>
            }
          </div>
          <input
            type="number"
            name="final_price"
            ref={finalPriceRef}
            readOnly={true}
            placeholder="Discounted Price"
            className="w-full p-3 h-[50px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"

          />

        </div>
        <RichTextEditor value={description} changeHandler={(data) => {
          setDescription(data);
        }
        } />
        {/* <textarea placeholder="Enter the product discription.." name="description" className="w-full px-4 py-2 outline-none border  focus:border-purple-500" id=""></textarea> */}
        <ImageUpload />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
        >
          Add  product
        </button>

      </form>
    </div>
  );
}