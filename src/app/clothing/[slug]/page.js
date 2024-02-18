"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPins, setPinStatus, setPin } from "@/provider/redux/pinSlice";
import { fetchSingleClothingProducts } from "@/provider/redux/productSlice";
import { addProductsToCart, setClothingId, setClothingColor, setClothingSize, setClothingQuantity } from "@/provider/redux/cartSlice";


const slug = ({ params }) => {
  // const [pin, setPin] = useState([]);
  const [effect, setEffect] = useState([]);

  const [clothingProducts, setClothingProducts] = useState();
  const [selectedColorObjects, setSelectedColorObjects] = useState();
const [quantityForCart, setQuantityForCart] = useState(1)
const [colorForCart, setColorForCart] = useState()
const [sizeForCart, setSizeForCart] = useState()
  const dispatch = useDispatch();
  const { clothing } = useSelector(state => state.cart.productsAdded);
  
  const pinsJson = useSelector((state) => state.pin.pinsJson);
  const pinStatus = useSelector((state) => state.pin.pinStatus);
  const pin = useSelector((state) => state.pin.pin);

  const onPinChange = (e) => {
    // setPin(e.target.value);
    dispatch(setPin(e.target.value));
    console.log(pin);
  };
  const checkServiceability = async () => {
    try {
      console.log(pinsJson);

      await dispatch(fetchPins());
      console.log(pinsJson);
      await setEffect("make it count baby!");
      // You can now access the updated pinStatus from the Redux store
      // const currentPinStatus = getState().pin.pinStatus;
      return;
    } catch (error) {
      // Handle errors
      console.error("Error checking serviceability:", error);
    }
  };
  console.log(pinsJson);

  const handleColorButtonClick = (colorObject) => {
    setSelectedColorObjects(colorObject);
    setColorForCart(colorObject.color)
    console.log(colorObject.color)
  };
  const handleSizeButtonClick = (size) => {
    setSizeForCart(size)
    console.log(size)
    console.log(quantityForCart)
  };

  const handleAddToCart = async () => {
    let cartParam = {
      clothing: [
        {
          _Id_OfProduct: params.slug,
          timeOfAddition: "2024-01-20T10:01:20.562Z",
          color: colorForCart,
          size: sizeForCart,
          quantity: quantityForCart,
        },
      ],
    }
    const addClothingProductsToCart = await dispatch(
      addProductsToCart(cartParam)
    );
    console.log(addClothingProductsToCart)
  };
  useEffect(() => {
    (async () => {
      try {
        const fetchClothingProducts = await dispatch(
          fetchSingleClothingProducts(params.slug)
        );
        console.log(fetchClothingProducts);
        if (fetchClothingProducts.payload.statusCode <= 200) {
          if (fetchClothingProducts.payload.success) {
            await setClothingProducts(
              fetchClothingProducts.payload.data.productDetails
            );
            setSelectedColorObjects(
              fetchClothingProducts.payload.data.productDetails
                .colorQuantityImages[0]
            );
          }
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle errors
      }
    })();
    if (pinStatus) {
      // TO CHECK THE STATUS OF THE LOADING WHETHER THE DATA IS LOADED FULLY IN pinSCLICE SLICE OF THE REDUX

      if (pinsJson === undefined) {
        //blank IF to remove error of showing cannot read properties of undefined in the below pinsjSON.includes  WHEN CLICKED AGAIN AFTER CHECKING A VALID PINCODE
      } else {
        if (pinsJson.includes(parseInt(pin))) {
          // TO CHECK IF THE PIN ENTERED BY THE USER IS PRESENT IN THE DATABASE OR NOT
          console.log(pinsJson);
          dispatch(setPinStatus(true));
        } else {
          dispatch(setPinStatus(false));
        }
      }
      // console.log("1if")
    }
    if (pin === "") {
      dispatch(setPinStatus(null));
      // console.log("2if");
    }
  }, []);

  return (
    <>
      {clothingProducts && selectedColorObjects && (
        <div>
          <h1 className="text-2xl mx-5 font-bold tracking-tight text-gray-900 sm:text-3xl">
            {/* Basic Tee 6-Pack */}
            {clothingProducts.title}
          </h1>
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {/* Men */}
                    {clothingProducts.gender}
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Clothing
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {/* Basic Tee 6-Pack */}
                  {clothingProducts.title}
                </a>
              </li>
            </ol>
          </nav>
          <div className="bg-white">
            <div className="pt-6 md:flex lg:flex">
              <div className=" sm:px-6   lg:gap-x-8 lg:px-8">
                {selectedColorObjects.colorSpecificImageUrls.map(
                  (imageUrl, index) => (
                    <div
                      key={index}
                      className="aspect-w-3 aspect-h-4 mx-5 mt-5 min-w-600 overflow-hidden rounded-lg lg:block"
                      style={{ maxWidth: '300px', maxHeight: '400px' }}
                    >
                      <img
                        src={imageUrl}
                        alt={clothingProducts.title}
                        className="object-cover object-center w-full h-full"
                        style={{ objectFit: 'cover' }}
                        />
                    </div>
                  )
                )}

              </div>
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {/* Basic Tee 6-Pack */}
                    {clothingProducts.title}
                  </h1>
                </div>

                {/* <!-- Options --> */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    ${clothingProducts.price}
                  </p>

                  {/* <!-- Reviews --> */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {/* <!-- Active: "text-gray-900", Default: "text-gray-200" --> */}
                        <svg
                          className="text-gray-900 h-5 w-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="text-gray-900 h-5 w-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="text-gray-900 h-5 w-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="text-gray-900 h-5 w-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="text-gray-200 h-5 w-5 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="sr-only">4 out of 5 stars</p>
                      <a
                        href="#"
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        117 reviews
                      </a>
                    </div>
                  </div>

                  <form className="mt-10">
                    {/* <!-- Colors --> */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Color
                      </h3>

                      <fieldset className="mt-4">
                        <legend className="sr-only">Choose a color</legend>
                        <div className="flex items-center space-x-3">
                          {/* <!--    
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                --> */}

                          {clothingProducts.colorQuantityImages.map(
                            (colorObject, index) => (
                              // <button key={index} onClick={() => handleColorButtonClick(colorObject)}>
                              //   {colorObject.color}
                              // </button>
                              <label
                                key={index}
                                className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400"
                              >
                                <input
                                  type="radio"
                                  name="color-choice"
                                  value="White"
                                  className="sr-only"
                                  aria-labelledby="color-choice-0-label"
                                  onClick={() =>
                                    handleColorButtonClick(colorObject)
                                  }
                                />
                                <span
                                  id="color-choice-0-label"
                                  className="sr-only"
                                >
                                  {colorObject.color}
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="h-8 w-8 bg-white rounded-full border border-black border-opacity-10"
                                >
                                  {colorObject.color}
                                </span>
                              </label>
                            )
                          )}

                          {/* <!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                --> */}
                          {/* <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                        <input
                          type="radio"
                          name="color-choice"
                          value="Gray"
                          className="sr-only"
                          aria-labelledby="color-choice-1-label"
                        />
                        <span id="color-choice-1-label" className="sr-only">
                          Gray
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-gray-200 rounded-full border border-black border-opacity-10"
                        ></span>
                      </label> */}
                          {/* <!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                --> */}
                          {/* <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                        <input
                          type="radio"
                          name="color-choice"
                          value="Black"
                          className="sr-only"
                          aria-labelledby="color-choice-2-label"
                        />
                        <span id="color-choice-2-label" className="sr-only">
                          Black
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-gray-900 rounded-full border border-black border-opacity-10"
                        ></span>
                      </label> */}
                        </div>
                      </fieldset>
                    </div>

                    {/* <!-- Sizes --> */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size
                        </h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Size guide
                        </a>
                      </div>

     
                      <fieldset className="mt-4">
                        <legend className="sr-only">Choose a size</legend>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
                          {
                            Object.entries(selectedColorObjects.sizeQuantity[0]).map(([key, value]) => (
                              <div key={key}>
                                
                                {value<=0? (<label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
                          <input
                            type="radio"
                            name="size-choice"
                            value="XXS"
                            disabled
                            className="sr-only"
                            aria-labelledby="size-choice-0-label"
                          />
                          <span id="size-choice-0-label">{key} {value}</span>
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1="0"
                                y1="100"
                                x2="100"
                                y2="0"
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        </label>)
                        :
                        (<label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                            <input
                            onClick={()=>handleSizeButtonClick(key)}
                              type="radio"
                              name="size-choice"
                              value="2XL"
                              className="sr-only"
                              aria-labelledby="size-choice-6-label"
                            />
                            <span id="size-choice-6-label">{key}</span>
                            {/* <!--
                    Active: "border", Not Active: "border-2"
                    Checked: "border-indigo-500", Not Checked: "border-transparent"
                  --> */}
                            <span
                              className="pointer-events-none absolute -inset-px rounded-md"
                              aria-hidden="true"
                            ></span>
                          </label>)}
                              </div>
                            ))}
                        </div>
                      </fieldset>
                    </div>

                    {/* <button
                      // onClick={handleAddToCart}
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button> */}
                  </form>
                  <button
                      onClick={handleAddToCart}
                      type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to Cart
                    </button>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* <!-- Description and details --> */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {/* The Basic Tee 6-Pack allows you to fully express your
                    vibrant personality with three grayscale options. Feeling
                    adventurous? Put on a heather gray tee. Want to be a
                    trendsetter? Try our exclusive colorway: &quot;Black&quot;.
                    Need to add an extra pop of color to your outfit? Our white
                    tee has you covered. */}
                        {clothingProducts.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Highlights
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Hand cut and sewn locally
                          </span>
                        </li>
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Dyed with our proprietary colors
                          </span>
                        </li>
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Pre-washed &amp; pre-shrunk
                          </span>
                        </li>
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Ultra-soft 100% cotton
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">
                        {/* The 6-Pack includes two black, two white, and two heather
                    gray Basic Tees. Sign up for our subscription service and be
                    the first to get new, exciting colors, like our upcoming
                    &quot;Charcoal Gray&quot; limited release. */}
                        {clothingProducts.fullDescription}
                      </p>
                    </div>
                    <div className="flex mt-10">
                      <input
                        onChange={onPinChange}
                        // value={pin}
                        type="text"
                        placeholder="Enter Your Pincode"
                        className=" border border-gray-300 p-2 mr-3 rounded-md focus:outline-none focus:border-blue-500"
                      ></input>
                      <button
                        onClick={checkServiceability}
                        type="submit"
                        className=" flex  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Check Serviceability
                      </button>
                    </div>
                    {!pinStatus && pinStatus != null && (
                      <div className="text-red-600 mt-3">
                        Sorry We currently do not deliver to this pincode{" "}
                      </div>
                    )}
                    {pinStatus && pinStatus != null && (
                      <div className="text-green-600 mt-3">
                        Congrats this pin code is serviceable{" "}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default slug;
