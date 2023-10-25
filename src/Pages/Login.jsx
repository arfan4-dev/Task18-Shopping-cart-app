import React, { useState } from "react";
import NavbarLogin from "../Components/NavbarLogin";
import Loader from "../Components/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {FiAlertTriangle} from 'react-icons/fi'
const Login = () => {
  const [error,setError]=useState(null);
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const email=e.target[0].value;
        const password=e.target[1].value;
        setError(null)
        setLoader(true);
      try{

    await  signInWithEmailAndPassword(auth,email,password)
    navigate('/home')

      }catch(err){
        setError("Enter Correct Email / Password")
          console.log("Error in Login", err)
      }
      setLoader(false)

    }
  return (
    <div>
      <div className="bg-slate-800">
        {" "}
        <NavbarLogin />
      </div>{" "}

      <div className="flex justify-center items-center h-screen">
      <div className="w-96 bg-gray-800 rounded p-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="email" className="text-white block mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder='E-mail'

              id="email"
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-white block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder='Password'

              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
                {error &&<p className='bg-cyan-100 p-2 mb-2 flex items-center gap-x-2 font-semibold text-red-500'> <span><FiAlertTriangle/></span> <span>{error}</span> </p>
}
          </div>
          {
            (loader) ? (<button
            type="submit"
            className="w-full flex justify-center p-2 bg-blue-600 text-white rounded hover:bg-blue-600"
          >
            <Loader/>
          </button>):(<button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </button>)
          }
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
