
import { RiMenu3Fill } from "react-icons/ri";
import SideMenu from "./SideMenu";

export default function Header({className}) {
  return (
    <div className={`box shadow p-3 flex md:justify-end justify-between items-center ${className}`}>
    <button className='bg-purple-500 px-2 py-1 rounded text-white'>Logout</button>
  </div>
  )
}
