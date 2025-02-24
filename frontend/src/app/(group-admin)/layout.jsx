import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/admin/Header";
import SideMenu from "@/components/admin/SideMenu";
import {ToastContainer} from 'react-toastify';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ecommerce Admin"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <>
        <ToastContainer />
        <div className="grid grid-cols-5">
            <SideMenu className="col-span-2  md:col-span-1"/>
            <div className="col-span-3 md:col-span-4">
            <Header/>
        {children}
            </div>
        </div>
        </>
      
      </body>
    </html>
  );
}
