"use client";
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import { ChangeColorToColor } from '@/provider/redux/ColorChange';
import { usePathname } from 'next/navigation'

const HomePage = () => {
  const pathname = usePathname()



    const images = [
        ['./images/One.jpg', "slug-of-product"],
        ['./images/Two.jpg', "slug of product"],
        ['./images/Three.jpg', "slug of product"],
        ['./images/Four.jpg', "slug of product"],
        ['./images/Five.jpg', "slug of product"]

      ];
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        // Automatically go to the next image every 3 seconds (adjust as needed)
        const interval = setInterval(goToNextImage, 20000);
    
        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
      }, [currentImage]);
    const goToNextImage = () => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
  
    const goToPrevImage = () => {
      setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
const state  = useSelector((state)=>state.ChangeColor.color)
const dispatch  = useDispatch()


 



  return (
    <div>
          {pathname !== '/'? <div></div> :


<div className="relative m-10 shadow-md">
    <Link href={`${images[currentImage][1]}`}>
        {/* <a></a> */}
        <img
        src={images[currentImage][0]}
        alt={`Image ${currentImage + 1}`}
        className="w-full h-full object-cover rounded-lg transition-transform duration-500 shadow-lg ease-in-out "
      />
  </Link>
    <button  onClick={goToPrevImage} type="button" className="m-8 absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" onClick={goToNextImage} className="m-8 absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
    </div>
}
    </div>
  )
}

export default HomePage