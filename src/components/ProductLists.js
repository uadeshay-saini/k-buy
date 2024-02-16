'use client'
import { usePathname } from 'next/navigation'

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClothingProducts, fetchAllElectronicsProducts, fetchAllMiscProducts } from "@/provider/redux/productSlice";
import { addProductsToCart } from "@/provider/redux/cartSlice";
import Cookies from 'js-cookie';

import { useRouter } from 'next/navigation'
import Link from 'next/link';

const ProductLists = () => {

  const dispatch = useDispatch();
const [clothingProducts, setClothingProducts] = useState([])
const [electronicsProducts, setElectronicsProducts] = useState([])
const [miscProducts, setMiscProducts] = useState([])

useEffect( () => {
    (async () => {
        try {
            const fetchClothingProducts = await dispatch(fetchAllClothingProducts());
            if(fetchClothingProducts.payload.statusCode <=  200){
               if(fetchClothingProducts.payload.success){
                setClothingProducts(fetchClothingProducts.payload.data.products)
               }
             }

            const fetchElectronicsProducts = await dispatch(fetchAllElectronicsProducts());
            if(fetchElectronicsProducts.payload.statusCode <=  200){
              if(fetchElectronicsProducts.payload.success){
                setElectronicsProducts(fetchElectronicsProducts.payload.data.products)
              }
            }
            const fetchMiscProducts = await dispatch(fetchAllMiscProducts());
            if(fetchMiscProducts.payload.statusCode <=  200){
              if(fetchMiscProducts.payload.success){
                setMiscProducts(fetchMiscProducts.payload.data.products)
              }
            }
        } catch (error) {
          console.error('Error:', error);
          // Handle errors
        }
      })();
         
}, [])
  const pathname = usePathname()
console.log(pathname)


  return (
    
    <div>

    {pathname !== '/'? <div></div> :
 
<div className="bg-white">
<Link href={`/clothing`}>

  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Clothing Products</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

      {clothingProducts.map((product, index) => (
        <div key={index} className="group relative">
          {/* Assuming colorQuantityImages array always has at least one item */}
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.colorQuantityImages[0].colorSpecificImageUrls[0]}  // Replace with the actual property from your product object
              alt={product.title}  // Replace with the actual property from your product object
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
              <Link href={`/clothing/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {product.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.description}</p>
              <p className="mt-1 text-sm text-gray-500">Brand :-{product.brand}</p>

            </div>
            <p className="text-sm font-medium text-gray-900">${product.price || 0}</p>
          </div>
        </div>
      ))}
    

    </div>
  </div>
  </Link>
  
  <Link href={`/electronics`}>

  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Electronics Products</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

      {electronicsProducts.map((product, index) => (
        <div key={index} className="group relative">
          {/* Assuming colorQuantityImages array always has at least one item */}
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.colorQuantityImages[0].colorSpecificImageUrls[0]}  // Replace with the actual property from your product object
              alt={product.title}  // Replace with the actual property from your product object
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
              <Link href={`/electronics/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {product.title}
                  </Link>              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.description}</p>
              <p className="mt-1 text-sm text-gray-500">Brand :-{product.brand}</p>

            </div>
            <p className="text-sm font-medium text-gray-900">${product.price || 0}</p>
          </div>
        </div>
      ))}
    

    </div>
  </div>
  </Link>

  <Link href={`/misc`}>

  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Other Useful Products</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

      {miscProducts.map((product, index) => (
        <div key={index} className="group relative">
          {/* Assuming colorQuantityImages array always has at least one item */}
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.colorQuantityImages[0].colorSpecificImageUrls[0]}  // Replace with the actual property from your product object
              alt={product.title}  // Replace with the actual property from your product object
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
              <Link href={`/misc/${product._id}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {product.title}
                  </Link>              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.description}</p>
              <p className="mt-1 text-sm text-gray-500">Brand :-{product.brand}</p>

            </div>
            <p className="text-sm font-medium text-gray-900">${product.price || 0}</p>
          </div>
        </div>
      ))}
    

    </div>
  </div>
  </Link>

</div>
}

    </div>
    
  )
}

export default ProductLists