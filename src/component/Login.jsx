import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import agrilogo from '../assets/agrilogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../State/Auth/Action';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwt, loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // ✅ NEW: State for login button
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // ✅ Set loading state immediately
    setIsLoggingIn(true);
    
    const loginData = { email, password };
    dispatch(login(loginData))
      .then(() => {
        // Keep loading state until navigation happens
        // The useEffect will handle navigation when jwt is received
      })
      .catch(() => {
        // Reset loading state on error
        setIsLoggingIn(false);
      });
  };


useEffect(() => {
  if (jwt) {
    localStorage.setItem("accessToken", jwt);

    // ✅ Do NOT overwrite userData here
    setTimeout(() => {
      navigate("/home");
      setIsLoggingIn(false);
    }, 500);
  }
}, [jwt, navigate]);



  // ✅ Reset loading state when there's an error
  useEffect(() => {
    if (error) {
      setIsLoggingIn(false);
    }
  }, [error]);

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
        {[...Array(15)].map((_, i) => (
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-6xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            
            {/* Left Side - Visual Section */}
            <div className="lg:w-1/2 bg-gradient-to-br from-green-500 via-green-600 to-blue-600 relative overflow-hidden flex items-center justify-center p-12">
              {/* Decorative Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300/20 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-20 w-24 h-24 bg-white/15 rounded-full blur-xl"></div>
              </div>

              <div className="relative text-center text-white z-10">
                {/* Logo */}
                <div className="mb-8">
                  <img 
                    src={agrilogo} 
                    alt="AgriConnect" 
                    className="h-20 w-auto mx-auto drop-shadow-lg mb-4" 
                  />
                  <h1 className="text-4xl font-bold mb-2">AgriConnect</h1>
                  <p className="text-xl opacity-90">Smart Farming Solutions</p>
                </div>

                {/* Feature Cards */}
                <div className="space-y-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition duration-300">
                    <div className="text-3xl mb-3">🚜</div>
                    <h3 className="font-semibold mb-2">Equipment Rental</h3>
                    <p className="text-sm opacity-90">Access modern farming equipment at affordable prices</p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition duration-300">
                    <div className="text-3xl mb-3">🤖</div>
                    <h3 className="font-semibold mb-2">AI Assistant</h3>
                    <p className="text-sm opacity-90">Get smart farming guidance and insights</p>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition duration-300">
                    <div className="text-3xl mb-3">🌱</div>
                    <h3 className="font-semibold mb-2">Crop Management</h3>
                    <p className="text-sm opacity-90">Optimize your harvest with data-driven insights</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="lg:w-1/2 flex items-center justify-center p-12">
              <div className="w-full max-w-md">
                {/* Welcome Text */}
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                    Welcome Back!
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Enter your credentials to access your farming dashboard
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mt-4"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Email Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="farmer@example.com"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 group-hover:border-gray-300"
                        required
                        disabled={isLoggingIn}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                        <span className="text-2xl">📧</span>
                      </div>
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-green-500 focus:bg-white transition duration-300 group-hover:border-gray-300"
                        required
                        disabled={isLoggingIn}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoggingIn}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="text-xl">{showPassword ? '🙈' : '👁️'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <button 
                      type="button" 
                      className="text-sm text-green-600 hover:text-green-700 font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoggingIn}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* ✅ UPDATED: Login Button with Dynamic States */}
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition duration-300 ${
                      isLoggingIn
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transform hover:scale-[1.02] hover:shadow-xl'
                    } text-white`}
                  >
                    <span className="flex items-center justify-center">
                      {isLoggingIn ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Letting You In...</span>
                        </>
                      ) : (
                        <>
                          <span>Login to Dashboard</span>
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>

                  {/* ✅ Error Display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error.message || 'Login failed. Please try again.'}
                    </div>
                  )}
                </form>

                {/* Divider */}
                <div className="flex items-center my-8">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500 text-sm">or</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 mt-8">
                  New to AgriConnect?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    disabled={isLoggingIn}
                    className="text-green-600 hover:text-green-700 font-semibold transition duration-300 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create an account
                  </button>
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">10K+</div>
                    <div className="text-xs text-gray-500">Farmers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">500+</div>
                    <div className="text-xs text-gray-500">Equipment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">50+</div>
                    <div className="text-xs text-gray-500">Cities</div>
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

export default Login;