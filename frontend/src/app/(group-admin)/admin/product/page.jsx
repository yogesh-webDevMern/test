
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
// import Link from "next/link";

const products = [
  { id: 1, name: "Product 1", price: "$10", description: "Description for product 1" },
  { id: 2, name: "Product 2", price: "$20", description: "Description for product 2" },
  { id: 3, name: "Product 3", price: "$30", description: "Description for product 3" },
];

export default function ProductListing() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex justify-end">
<button className="font-bold text-white bg-purple-500 p-2 rounded-md">
  <Link href="/admin/product/add">Add product</Link>
</button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Product Listing</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow-lg rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700">{product.price}</p>
              <p className="text-gray-500 text-sm">{product.description}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <FaEdit className="text-blue-500 cursor-pointer" />
              <FaTrash className="text-red-500 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

