"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser,checkIfUserLoggedIn,  setRegisterUserName, setRegisterEmail, setRegisterFullName, setRegisterPassword} from "@/provider/redux/userSlice";

import { useRouter } from 'next/navigation'

const register = () => {

  const router = useRouter()
const [messageToDisplay, setMessageToDisplay] = useState("")
const [isUserRegisteredSuccessfully, setIsUserRegisteredSuccessfully] = useState(false)
const [disableRegisterbutton, setDisableRegisterButton] = useState(false)


  const dispatch = useDispatch();
  const { username, email, fullName, password } = useSelector(state => state.user.register);

  // const username = useSelector((state) => state.user.register.email);

    const onLoginChange = (e) => {
      // console.log(e.target.name, 'useer');
        if(e.target.name==="username"){
        dispatch(setRegisterUserName(e.target.value));
        console.log(username);
        }
        if(e.target.name==="fullName"){
          dispatch(setRegisterFullName(e.target.value));
          console.log(fullName);

        }
        if(e.target.name==="email"){
          dispatch(setRegisterEmail(e.target.value));
          console.log(email);

        }
        if(e.target.name==="password"){
          dispatch(setRegisterPassword(e.target.value));
          console.log(password);

          }
      };

const createRegisterUser = async () =>{
  try {
    console.log("hello there");
    const isUserRegistered = await dispatch(registerUser());

    console.log(isUserRegistered.payload);

if(isUserRegistered.payload.statusCode > 200){
  if(!isUserRegistered.payload.success){
    setIsUserRegisteredSuccessfully(isUserRegistered.payload.success)
   setMessageToDisplay(isUserRegistered.payload.message)
    console.log(isUserRegisteredSuccessfully)
  }
  
}else if(isUserRegistered.payload.statusCode <=  200){
  
  setMessageToDisplay(isUserRegistered.payload.message)
  setIsUserRegisteredSuccessfully(isUserRegistered.payload.success)
  
  setTimeout(() => {
    router.push('/login');
  }, 4000);

}

  } catch (error) {
    
  }
}

useEffect(() => {
  (async () => {
    try {
        const isUserLoggedIn = await dispatch(checkIfUserLoggedIn());
        if(isUserLoggedIn.payload.statusCode <=  200){
           if(isUserLoggedIn.payload.success){
            setDisableRegisterButton(true)
           }
           
         }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  })();
  messageToDisplay
  setMessageToDisplay

  isUserRegisteredSuccessfully
  
}, [setMessageToDisplay])



  return (
    <div>



<div className="h-full bg-gray-400 dark:bg-gray-900">
	<div className="mx-auto">
		<div className="flex justify-center px-6 py-12">
			<div className="w-full xl:w-3/4 lg:w-11/12 flex">
				<div className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
					style={{ backgroundImage: "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"}}
          ></div>
				<div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
					<h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
          
					{disableRegisterbutton && <h3 className="py-4 text-2xl text-center text-red-500 dark:text-white">User Already Logged In, LogOut First to Proceed !!</h3>}

         { <h3 className={`py-4 text-2xl text-center  text-${isUserRegisteredSuccessfully ? "green" : "red"}-500 dark:text-white`}>{messageToDisplay}</h3> }

					<form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded">
						<div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                                    Full Name
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    name="fullName"
                                    type="text"
                                    onChange={onLoginChange}
                                    placeholder="First Name"
                                />
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="lastName">
                                    User Name
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    name="username"
                                    type="text"
                                    onChange={onLoginChange}
                                    placeholder="Last Name"
                                />
							</div>
						</div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                Email
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                onChange={onLoginChange}
                                placeholder="Email"
                            />
						</div>
						<div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="password">
                                    Password
                                </label>
								<input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={onLoginChange}
                                    placeholder="******************"
                                />
								<p className="text-xs italic text-red-500">Please choose a password.</p>
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="c_password">
                                    Confirm Password
                                </label>
								<input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="c_password"
                                    name="c_password"
                                    type="password"
                                    onChange={onLoginChange}
                                    placeholder="******************"
                                />
							</div>
						</div>
						<div className="mb-6 text-center">
							<button
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={createRegisterUser}
                                disabled={disableRegisterbutton}
                            >
                                Register Account
                            </button>
						</div>
						<hr className="mb-6 border-t" />
						<div className="text-center">
							<a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="#">
								Forgot Password?
							</a>
						</div>
						<div className="text-center">
							<a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="./index.html">
								Already have an account? Login!
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

    </div>
  )
}

export default register