"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginUser, logoutUser, checkIfUserLoggedIn,  setLoginUserName, setLoginEmail, setLoginPassword } from "@/provider/redux/userSlice";
import { fetchCart, deleteProductsToCart } from "@/provider/redux/cartSlice";
import Cookies from 'js-cookie';
import { fetchSingleClothingProducts, fetchSingleElectronicsProducts, fetchSingleMiscProducts } from "@/provider/redux/productSlice";

import { useRouter } from 'next/navigation'
import Link from 'next/link';

const Cart = () => {
  const dispatch = useDispatch();
  const [clothingCart, setClothingCart] = useState()
  const [electronicsCart, setElectronicsCart] = useState()
  const [miscCart, setMiscCart] = useState()
  const [userNOTLoggedIn, setUserNOTLoggedIn] = useState()

  const handleClothingDeleteToCart = async (cartObject) => {
    let cartParam = {
      clothing: [
        {
          _Id_OfProduct: cartObject._Id_OfProduct,
          color: cartObject.color,
          size: cartObject.size,
        },
      ],
    }
    const deleteClothingProductsToCart = await dispatch(
      deleteProductsToCart(cartParam)
    );
    console.log(deleteClothingProductsToCart)
  };

  const handleElectronicsMiscDeleteToCart = async (cartObject, productType) => {
    let cartParam = {
      [productType]: [
        {
          _Id_OfProduct: cartObject._Id_OfProduct,
          // color: colorForCart
          // baad me jb electronics or misc ke schema me color ko add kre jb un comment krdio
        },
      ],
    }
    const deleteElectronicsMiscProductsToCart = await dispatch(
      deleteProductsToCart(cartParam)
    );
    console.log(deleteElectronicsMiscProductsToCart)
  };

  useEffect(() => {
    (async ()=>{
      const productsPresentInTheCart = await dispatch(fetchCart())
      console.log(productsPresentInTheCart)
        // Loop through each product in the array
        if(!(productsPresentInTheCart.payload === undefined)){

        for (const product of productsPresentInTheCart.payload.data.foundCart.productsAdded.clothing) {
          const productId = product._Id_OfProduct;
      
          // Make a fetch request for the product details using its ID
          const productDetails = await dispatch(fetchSingleClothingProducts(productId));

          for (const color of productDetails.payload.data.productDetails.colorQuantityImages) {
             if (color.color === product.color ){
              product.colorSpecificImageUrls = color.colorSpecificImageUrls;

             }
          }
          // Store the fetched details back in the original object
          product.title = productDetails.payload.data.productDetails.title;
          product.description = productDetails.payload.data.productDetails.description;
          product.price = productDetails.payload.data.productDetails.price;
          product.brand = productDetails.payload.data.productDetails.brand;



        }
        setClothingCart(productsPresentInTheCart.payload.data.foundCart.productsAdded.clothing)

        for (const product of productsPresentInTheCart.payload.data.foundCart.productsAdded.electronics) {
          const productId = product._Id_OfProduct;
      
          // Make a fetch request for the product details using its ID
          const productDetails = await dispatch(fetchSingleElectronicsProducts(productId));

          // for (const color of productDetails.payload.data.productDetails.colorQuantityImages) {
          //    if (color.color === product.color ){
          //     product.colorSpecificImageUrls = color.colorSpecificImageUrls;

          //    }
          // }

          product.colorSpecificImageUrls = productDetails.payload.data.productDetails.colorQuantityImages[0].colorSpecificImageUrls;

          // Store the fetched details back in the original object
          product.title = productDetails.payload.data.productDetails.title;
          product.description = productDetails.payload.data.productDetails.description;
          product.price = productDetails.payload.data.productDetails.price;
          product.brand = productDetails.payload.data.productDetails.brand;


        }
        setElectronicsCart(productsPresentInTheCart.payload.data.foundCart.productsAdded.electronics)

        for (const product of productsPresentInTheCart.payload.data.foundCart.productsAdded.misc) {
          const productId = product._Id_OfProduct;
      
          // Make a fetch request for the product details using its ID
          const productDetails = await dispatch(fetchSingleMiscProducts(productId));

          // for (const color of productDetails.payload.data.productDetails.colorQuantityImages) {
          //    if (color.color === product.color ){
          //     product.colorSpecificImageUrls = color.colorSpecificImageUrls;

          //    }
          // }

          product.colorSpecificImageUrls = productDetails.payload.data.productDetails.colorQuantityImages[0].colorSpecificImageUrls;


          // Store the fetched details back in the original object
          product.title = productDetails.payload.data.productDetails.title;
          product.description = productDetails.payload.data.productDetails.description;
          product.price = productDetails.payload.data.productDetails.price;
          product.brand = productDetails.payload.data.productDetails.brand;


        }
        setMiscCart(productsPresentInTheCart.payload.data.foundCart.productsAdded.misc)

        // Now, the original array contains the fetched details for each product
        console.log(productsPresentInTheCart);
        }else if((productsPresentInTheCart.payload === undefined)){
          setUserNOTLoggedIn(true)
        }
  })()
}, [])

  return (
    <div>
      {
        <div className="container mx-auto mt-10">
    <div className="flex shadow-md my-10">
      <div className="w-3/4 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Shopping Cart</h1>
          {/* <h2 className="font-semibold text-2xl">{cart.length} Items</h2> */}
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Remove Product</h3>
        </div>


        {userNOTLoggedIn && <span className="font-bold text-purple-600 align-middle flex justify-center text-xl">User is Not Logged In, so Login first</span>}

{ clothingCart &&  <div>
        <span className="font-bold text-sm">Clothing Products</span>

        {clothingCart.map(
          (cartObject, index)=> (

        <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          
          <div className="flex w-3/5">
          <div
                      
                      className="aspect-w-3 aspect-h-4 mx-5 mt-5 min-w-600 overflow-hidden rounded-lg lg:block"
                      style={{ maxWidth: '200px', maxHeight: '200px', minWidth:'200', minHeight:'200' }}
                    >
                      <img
                        src={cartObject.colorSpecificImageUrls[0]}
                        alt={cartObject.title}
                        className="object-cover object-center w-full h-full"
                        style={{ objectFit: 'cover' }}
                        />
                    </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-1xl">{cartObject.title}</span>
              <span className="text-red-500 text-xs">{cartObject.description}</span>
              <span className="font-semibold hover:text-red-500 text-gray-500 text-xs">{cartObject.brand}</span>
              <span className="font-bold text-1xl">{cartObject.color}</span>
              <span className="font-bold text-1xl">{cartObject.size}</span> 
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input className="mx-2 border text-center w-8" type="text" value="1"/>

            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">${cartObject.price}</span>
          <button onClick={()=>{handleClothingDeleteToCart(cartObject)}} className="font-semibold hover:text-red-500 text-gray-500 text-sm text-center w-1/5  ">Remove</button>
        </div>
          )            
        )}
              <span className="font-bold text-sm">Electronics Products</span>

{electronicsCart && electronicsCart.map(
          (cartObject, index)=> (

        <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          
          <div className="flex w-3/5">
          <div
                      
                      className="aspect-w-3 aspect-h-4 mx-5 mt-5 min-w-600 overflow-hidden rounded-lg lg:block"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    >
                      <img
                        src={cartObject.colorSpecificImageUrls[0]}
                        alt={cartObject.title}
                        className="object-cover object-center w-full h-full"
                        style={{ objectFit: 'cover' }}
                        />
                    </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{cartObject.title}</span>
              <span className="text-red-500 text-xs">{cartObject.description}</span>
              <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">{cartObject.brand}</a>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input className="mx-2 border text-center w-8" type="text" value="1"/>

            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">${cartObject.price}</span>
          <button onClick={()=>{handleElectronicsMiscDeleteToCart(cartObject, "electronics")}} className="font-semibold hover:text-red-500 text-gray-500 text-sm text-center w-1/5  ">Remove</button>
        </div>
          )
        )}

              <span className="font-bold text-sm">Other Products</span>

{miscCart && miscCart.map(
          (cartObject, index)=> (

        <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          
          <div className="flex w-3/5">
          <div
                      
                      className="aspect-w-3 aspect-h-4 mx-5 mt-5 min-w-600 overflow-hidden rounded-lg lg:block"
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    >
                      <img
                        src={cartObject.colorSpecificImageUrls[0]}
                        alt={cartObject.title}
                        className="object-cover object-center w-full h-full"
                        style={{ objectFit: 'cover' }}
                        />
                    </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{cartObject.title}</span>
              <span className="text-red-500 text-xs">{cartObject.description}</span>
              <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">{cartObject.brand}</a>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input className="mx-2 border text-center w-8" type="text" value="1"/>

            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">${cartObject.price}</span>
          <button onClick={()=>{handleElectronicsMiscDeleteToCart(cartObject, "misc")}} className="font-semibold hover:text-red-500 text-gray-500 text-sm text-center w-1/5  ">Remove</button>
        </div>
          )
        )}


      </div>}


        {/* <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div className="flex w-2/5"> 
            <div className="w-20">
              <img className="h-24" src="https://drive.google.com/uc?id=10ht6a9IR3K2i1j0rHofp9-Oubl1Chraw" alt=""/>
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">Xiaomi Mi 20000mAh</span>
              <span className="text-red-500 text-xs">Xiaomi</span>
              <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>

            <input className="mx-2 border text-center w-8" type="text" value="1"/>

            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">$40.00</span>
          <span className="text-center w-1/5 font-semibold text-sm">$40.00</span>
        </div>

        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div className="flex w-2/5">
            <div className="w-20">
              <img className="h-24" src="https://drive.google.com/uc?id=1vXhvO9HoljNolvAXLwtw_qX3WNZ0m75v" alt=""/>
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">Airpods</span>
              <span className="text-red-500 text-xs">Apple</span>
              <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
            <input className="mx-2 border text-center w-8" type="text" value="1"/>

            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">$150.00</span>
          <span className="text-center w-1/5 font-semibold text-sm">$150.00</span>
        </div> */}

        <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
      
          <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
          Continue Shopping
        </a>
      </div>

      <div id="summary" className="w-1/4 px-8 py-10">
        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Items 3</span>
          <span className="font-semibold text-sm">590$</span>
        </div>
        <div>
          <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
          <select className="block p-2 text-gray-600 w-full text-sm">
            <option>Standard shipping - $10.00</option>
          </select>
        </div>
        <div className="py-10">
          <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
          <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full"/>
        </div>
        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
        <div className="border-t mt-8">
          <div className="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>$600</span>
          </div>
          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
        </div>
      </div>

    </div>
  </div>
}
    </div>
  )
}

export default Cart