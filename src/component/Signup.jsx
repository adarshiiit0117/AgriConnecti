import React, { useState } from "react";
import {useDispatch}from "react-redux"
import { register } from "../State/Auth/Action";
import { data } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch=useDispatch()

  // const navigate = () => console.log('Navigate to login');
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    country: 'India',
    state: '',
    pincode: '',
    address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [buttonState, setButtonState] = useState('idle'); // 'idle', 'creating', 'success'

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set button to creating state
    setButtonState('creating');
    
    dispatch(register(formData));
    console.log('Form Data:', formData);
    
    // After 2 seconds, show success message
    setTimeout(() => {
      setButtonState('success');
      
      // After showing success for 1 second, navigate to login
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }, 2000);
  };

  const getButtonContent = () => {
    switch (buttonState) {
      case 'creating':
        return (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Account...
          </span>
        );
      case 'success':
        return (
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Account Created Successfully!
          </span>
        );
      default:
        return (
          <span className="flex items-center justify-center">
            <span>Create Account</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        );
    }
  };

  const getButtonStyles = () => {
    switch (buttonState) {
      case 'creating':
        return "w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg cursor-not-allowed";
      case 'success':
        return "w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg cursor-not-allowed";
      default:
        return "w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-[1.02] hover:shadow-xl transition duration-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-green-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Left Side - Form */}
            <div className="lg:w-2/3 flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-12 w-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xl font-bold">A</span>
                    </div>
                    <h1 className="text-4xl mb-2 font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Join AgriConnect
                    </h1>
                  </div>
                  <p className="text-gray-600 text-lg">
                    Create your account and start your smart farming journey
                  </p>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mt-4"></div>
                </div>

          {/* Signup Form */}
<form onSubmit={handleSubmit} className="space-y-6">
  {/* Personal Information Section */}
  <div className="bg-gray-50/70 rounded-2xl p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <span className="text-2xl mr-2">👤</span>
      Personal Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300 group-hover:border-gray-300"
          required
          disabled={buttonState !== 'idle'}
        />
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="farmer@example.com"
          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300 group-hover:border-gray-300"
          required
          disabled={buttonState !== 'idle'}
        />
      </div>

      <div className="group md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="+91 9876543210"
          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300 group-hover:border-gray-300"
          required
          disabled={buttonState !== 'idle'}
        />
      </div>
    </div>
  </div>

  {/* Security Section */}
  <div className="bg-blue-50/70 rounded-2xl p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <span className="text-2xl mr-2">🔒</span>
      Security
    </h3>
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Create a strong password"
          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-green-500 transition duration-300 group-hover:border-gray-300"
          required
          disabled={buttonState !== 'idle'}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
          disabled={buttonState !== 'idle'}
        >
          <span className="text-xl">{showPassword ? '🙈' : '👁️'}</span>
        </button>
      </div>
    </div>
  </div>

  {/* Location Section */}
  <div className="bg-green-50/70 rounded-2xl p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <span className="text-2xl mr-2">📍</span>
      Location Details
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Country
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300 group-hover:border-gray-300"
          required
          disabled={buttonState !== 'idle'}
        />
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          State
        </label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          placeholder="e.g., Maharashtra"
          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300 group-hover:border-gray-300"
          required
          disabled={buttonState !== 'idle'}
        />
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Pincode
        </label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          placeholder="123456"
          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300 group-hover:border-gray-300"
          required
          disabled={buttonState !== 'idle'}
        />
      </div>

      <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Street, City"
          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300 group-hover:border-gray-300"
          required
          disabled={buttonState !== 'idle'}
        />
      </div>
    </div>
  </div>

  {/* Terms and Submit */}
  <div className="space-y-6">
    <label className="flex items-start space-x-3">
      <input 
        type="checkbox" 
        className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 mt-1"
        required
        disabled={buttonState !== 'idle'}
      />
      <span className="text-sm text-gray-600 leading-relaxed">
        I agree to the{' '}
        <button type="button" className="text-green-600 hover:underline font-semibold">
          Terms of Service
        </button>{' '}
        and{' '}
        <button type="button" className="text-green-600 hover:underline font-semibold">
          Privacy Policy
        </button>
      </span>
    </label>

    <button
      type="submit"
      className={getButtonStyles()}
      disabled={buttonState !== 'idle'}
    >
      {getButtonContent()}
    </button>
  </div>
</form>


                {/* Login Link */}
                <div className="text-center mt-8">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-green-600 hover:text-green-700 font-semibold transition duration-300 hover:underline"
                      disabled={buttonState !== 'idle'}
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Features */}
            <div className="lg:w-1/3 bg-gradient-to-br from-green-500 via-green-600 to-blue-600 relative overflow-hidden flex items-center justify-center p-8">
              {/* Decorative Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-10 w-24 h-24 bg-white/15 rounded-full blur-xl"></div>
              </div>

              <div className="relative text-center text-white z-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">Join 10,000+ Farmers</h2>
                  <p className="text-lg opacity-90">Start your smart farming journey today!</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-3">🚜</div>
                    <h3 className="font-bold text-lg mb-2">Equipment Rental</h3>
                    <p className="text-sm opacity-90">Access 500+ modern farming equipment at your fingertips</p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-3">🤖</div>
                    <h3 className="font-bold text-lg mb-2">AI-Powered Insights</h3>
                    <p className="text-sm opacity-90">Get personalized farming recommendations and market trends</p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-3">🌱</div>
                    <h3 className="font-bold text-lg mb-2">Smart Analytics</h3>
                    <p className="text-sm opacity-90">Track your farm performance with data-driven insights</p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition duration-300">
                    <div className="text-4xl mb-3">🌍</div>
                    <h3 className="font-bold text-lg mb-2">50+ Cities</h3>
                    <p className="text-sm opacity-90">Nationwide network with 24/7 support coverage</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/30">
                  <p className="text-sm opacity-75">Trusted by farmers across India</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">4.9★</div>
                      <div className="text-xs">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">99%</div>
                      <div className="text-xs">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-xs">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;