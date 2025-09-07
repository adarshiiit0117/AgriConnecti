import React from 'react'
  import { useNavigate } from 'react-router-dom';
import agrilogo from "../assets/agrilogo.png";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="relative z-50 flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-4">
          <img src={agrilogo} alt="AgriConnect" className="h-16 w-auto drop-shadow-lg" />
          <div className="text-white">
          
          </div>
        </div>
        <div className='space-x-10'>
         <button onClick={()=>navigate("/signup")} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300 font-semibold">
          Signup
        </button>
        
        <button onClick={()=>navigate("/login")} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300 font-semibold">
          Log In
        </button>
        </div>
      
      </nav>
    </div>
  )
}

export default Navbar

