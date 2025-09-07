import React, { useState, useRef, useEffect } from 'react';
import About from './About';
import Details from './Details';
import Testimonials from './Testimonial';
import Footer from './Footer';
import agrilogo from "../assets/agrilogo.png";
import rentImg from "../assets/rent.png";
import buyImg from "../assets/buy.png";
import assistantImg from "../assets/assistatn.png";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import Profile from './Profile';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm your AgriBot assistant. How can I help you with your farming needs today?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Mock user data - replace with your actual user data
  const userData = {
    fullName: "John Farmer", // Replace with actual user name
    avatar: null // This will use the auto-generated avatar
  };

  const fullText = "Welcome to AGRICONNECT";
  const userId = "user_123";

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('question', inputText);

      const response = await fetch('http://127.0.0.1:8004/ask', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const botReply = {
        sender: 'bot',
        text: data.answer || 'Sorry, I could not find an answer.',
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error contacting the assistant. Please try again.' },
      ]);
      console.error('Chat error:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-green-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Additional floating orbs */}
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-bounce delay-500"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-bounce delay-1500"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-1 h-1 bg-yellow-300/40' :
              i % 3 === 1 ? 'w-2 h-2 bg-white/30' : 'w-1.5 h-1.5 bg-green-300/40'
            } animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Avatar Dropdown - Fixed position in top-right */}
      <div className="fixed top-6 right-6 z-50">
        <div className="relative">
          {/* Avatar Button */}
          <button
            onClick={() => setOpen(!open)}
            className={`w-14 h-14 rounded-full overflow-hidden shadow-lg hover:shadow-2xl hover:scale-110 transition duration-300 ${
              open ? 'ring-4 ring-orange-300 ring-opacity-50' : ''
            }`}
          >
            <img
              src={
                userData?.avatar || 
                `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.fullName || "Guest")}&background=f97316&color=ffffff&size=128&rounded=true&bold=true`
              }
              alt="User Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to a different avatar service if ui-avatars fails
                e.target.src = `https://robohash.org/${encodeURIComponent(userData?.fullName || "Guest")}.png?size=128x128&set=set1`;
              }}
            />
          </button>
          
          {/* Dropdown Menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl p-6 text-center z-50 border border-gray-100"
                initial={{ scale: 0.8, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg"
                  >
                    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                
                {/* User Avatar in Dropdown */}
                <div className="mb-4">
                  <img
                    src={
                      userData?.avatar || 
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.fullName || "Guest")}&background=f97316&color=ffffff&size=80&rounded=true&bold=true`
                    }
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full mx-auto shadow-lg"
                    onError={(e) => {
                      e.target.src = `https://robohash.org/${encodeURIComponent(userData?.fullName || "Guest")}.png?size=80x80&set=set1`;
                    }}
                  />
                </div>
                
                {/* User Name - Removed since no name needed */}
                
                {/* Menu Buttons */}
                <ul className="flex flex-col gap-3">
                  <li>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 hover:bg-orange-100 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>View Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/");
                        setOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                    >
                      <svg className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chatbot Section with enhanced animations */}
      <div>
        <div className="fixed bottom-6 right-6 z-50">
          {isChatOpen && (
            <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transform animate-in slide-in-from-bottom-8 duration-500">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm">🌾</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">AgriBot</h3>
                    <p className="text-white/80 text-xs">Your Farming Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white/80 hover:text-white hover:rotate-90 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'items-start space-x-2'} animate-in fade-in slide-in-from-bottom-2 duration-300`} style={{ animationDelay: `${idx * 100}ms` }}>
                    {msg.sender === 'bot' && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 shadow-sm max-w-xs text-sm transform hover:scale-105 transition-transform duration-200 ${
                        msg.sender === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Chat Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:shadow-green-500/25 group animate-bounce"
          >
            {isChatOpen ? (
              <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div className={`relative z-40 flex flex-col items-center justify-center px-8 py-12 ${open ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="text-center text-white mb-16">
          {/* Animated Title */}
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-green-200 bg-clip-text text-transparent drop-shadow-2xl min-h-[1.2em]">
            {displayText}
            {isTyping && <span className="animate-pulse">|</span>}
          </h2>
          
          {/* Animated Subtitle */}
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-1000 hover:scale-105 transition-transform duration-300">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-green-100 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
              Revolutionizing agriculture with smart technology solutions for modern farmers
            </span>
          </p>
          
          {/* Animated Divider */}
          <div className="flex justify-center mt-8 animate-in fade-in duration-1000 delay-1500 hover:scale-110 transition-transform duration-300">
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 rounded-full animate-pulse hover:w-32 hover:h-2 transition-all duration-500 shadow-lg hover:shadow-xl"></div>
          </div>
        </div>

        {/* Enhanced Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          
          {/* Enhanced Rent Card */}
          <div 
            onClick={() => navigate("/rent")}
            className="group relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-left delay-500 hover:shadow-3xl hover:shadow-green-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Floating icon animation */}
            <div className="absolute top-4 right-4 text-2xl animate-bounce group-hover:animate-spin">🚜</div>
            
            <div className="relative p-8">
              <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:shadow-inner transition-all duration-300">
                <div className="text-6xl group-hover:scale-125 transition-transform duration-500 animate-pulse">🚜</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <span className="text-2xl group-hover:animate-pulse">🚜</span>
                </div>
                
                <h3 className="text-3xl font-bold text-green-700 mb-4 group-hover:text-green-800 transition-all duration-300 group-hover:scale-105">
                  <span className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent group-hover:from-green-500 group-hover:via-green-600 group-hover:to-green-700 transition-all duration-500 drop-shadow-sm">
                    Lend Equipment
                  </span>
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-sm">
                  Access modern farming equipment at affordable prices. Boost your productivity without high upfront costs.
                </p>
                
                <div className="inline-flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-md">
                  <span>Explore Rentals</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Buy Card */}
          <div 
            onClick={() => navigate("/buy")}
            className="group relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom delay-700 hover:shadow-3xl hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Floating icon animation */}
            <div className="absolute top-4 right-4 text-2xl animate-bounce group-hover:animate-pulse delay-200">🛒</div>
            
            <div className="relative p-8">
              <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:shadow-inner transition-all duration-300">
                <div className="text-6xl group-hover:scale-125 transition-transform duration-500 animate-pulse">🛒</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <span className="text-2xl group-hover:animate-pulse">🛒</span>
                </div>
                
                <h3 className="text-3xl font-bold text-blue-700 mb-4 group-hover:text-blue-800 transition-all duration-300 group-hover:scale-105">
                  <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-500 drop-shadow-sm">
                    Rent Products
                  </span>
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-sm">
                  Purchase quality agricultural tools, seeds, and machinery from trusted sellers with complete confidence.
                </p>
                
                <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-md">
                  <span>Shop Now</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Assistant Card */}
          <div 
            onClick={() => navigate("/assistant")}
            className="group relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-right delay-900 hover:shadow-3xl hover:shadow-orange-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Floating icon animation */}
            <div className="absolute top-4 right-4 text-2xl animate-bounce group-hover:animate-spin delay-300">🤖</div>
            
            <div className="relative p-8">
              <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center group-hover:shadow-inner transition-all duration-300">
                <div className="text-6xl group-hover:scale-125 transition-transform duration-500 animate-pulse">🤖</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                  <span className="text-2xl group-hover:animate-pulse">🤖</span>
                </div>
                
                <h3 className="text-3xl font-bold text-orange-700 mb-4 group-hover:text-orange-800 transition-all duration-300 group-hover:scale-105">
                  <span className="bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:via-orange-600 group-hover:to-orange-700 transition-all duration-500 drop-shadow-sm">
                    AI Assistant
                  </span>
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-sm">
                  Get AI-powered farming guidance, weather forecasts, and crop care tips for maximum yields.
                </p>
                
                <div className="inline-flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-md">
                  <span>Get Assistance</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-4xl">
          {[
            { number: "10K+", label: "Happy Farmers", delay: "delay-1000" },
            { number: "500+", label: "Equipment Available", delay: "delay-1200" },
            { number: "50+", label: "Cities Covered", delay: "delay-1400" },
            { number: "24/7", label: "Support Available", delay: "delay-1600" }
          ].map((stat, index) => (
            <div key={index} className={`text-center text-white animate-in fade-in slide-in-from-bottom duration-1000 ${stat.delay} group hover:scale-110 transition-transform duration-300`}>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-yellow-200 to-green-200 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-white group-hover:to-yellow-300 transition-all duration-500 drop-shadow-lg group-hover:scale-125 group-hover:drop-shadow-2xl">
                {stat.number}
              </div>
              <div className="text-sm opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:text-yellow-200 group-hover:drop-shadow-md">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.6s ease-out forwards;
        }
        
        .slide-in-from-top {
          transform: translateY(-16px);
        }
        
        .slide-in-from-bottom {
          transform: translateY(16px);
        }
        
        .slide-in-from-left {
          transform: translateX(-16px);
        }
        
        .slide-in-from-right {
          transform: translateX(16px);
        }
        
        .fade-in {
          opacity: 0;
        }
        
        .zoom-in {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};

export default Home;






// import React, { useState, useRef, useEffect } from 'react';
// import About from './About';
// import Details from './Details';
// import Testimonials from './Testimonial';
// import Footer from './Footer';
// import agrilogo from "../assets/agrilogo.png";
// import rentImg from "../assets/rent.png";
// import buyImg from "../assets/buy.png";
// import assistantImg from "../assets/assistatn.png";
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from "framer-motion";

// const Home = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       sender: 'bot',
//       text: "Hello! I'm your AgriBot assistant. How can I help you with your farming needs today?",
//     },
//   ]);
//   const [inputText, setInputText] = useState('');
//   const [displayText, setDisplayText] = useState('');
//   const [isTyping, setIsTyping] = useState(true);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const fullText = "Welcome to AGRICONNECT";
//   const userId = "user_123";

//   // Typewriter effect
//   useEffect(() => {
//     let currentIndex = 0;
//     const typingInterval = setInterval(() => {
//       if (currentIndex <= fullText.length) {
//         setDisplayText(fullText.slice(0, currentIndex));
//         currentIndex++;
//       } else {
//         setIsTyping(false);
//         clearInterval(typingInterval);
//       }
//     }, 100);

//     return () => clearInterval(typingInterval);
//   }, []);

//   const sendMessage = async () => {
//     if (!inputText.trim()) return;

//     const userMessage = { sender: 'user', text: inputText };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputText('');

//     try {
//       const formData = new FormData();
//       formData.append('user_id', userId);
//       formData.append('question', inputText);

//       const response = await fetch('http://127.0.0.1:8004/ask', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       const botReply = {
//         sender: 'bot',
//         text: data.answer || 'Sorry, I could not find an answer.',
//       };

//       setMessages((prev) => [...prev, botReply]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: 'bot', text: 'Error contacting the assistant. Please try again.' },
//       ]);
//       console.error('Chat error:', error);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') sendMessage();
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
//       {/* Enhanced Animated Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-60 right-32 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-green-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
//         {/* Additional floating orbs */}
//         <div className="absolute top-1/2 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-bounce delay-500"></div>
//         <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-bounce delay-1500"></div>
//       </div>

//       {/* Enhanced Floating Particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute rounded-full ${
//               i % 3 === 0 ? 'w-1 h-1 bg-yellow-300/40' :
//               i % 3 === 1 ? 'w-2 h-2 bg-white/30' : 'w-1.5 h-1.5 bg-green-300/40'
//             } animate-bounce`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 3}s`
//             }}
//           ></div>
//         ))}
//       </div>

//       {/* Chatbot Section with enhanced animations */}
//       <div>
//         <div className="fixed bottom-6 right-6 z-40">
//           {isChatOpen && (
//             <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transform animate-in slide-in-from-bottom-8 duration-500">
//               {/* Chat Header */}
//               <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 py-3 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
//                     <span className="text-white text-sm">🌾</span>
//                   </div>
//                   <div>
//                     <h3 className="text-white font-semibold text-sm">AgriBot</h3>
//                     <p className="text-white/80 text-xs">Your Farming Assistant</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setIsChatOpen(false)}
//                   className="text-white/80 hover:text-white hover:rotate-90 transition-all duration-300"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Chat Body */}
//               <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
//                 {messages.map((msg, idx) => (
//                   <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'items-start space-x-2'} animate-in fade-in slide-in-from-bottom-2 duration-300`} style={{ animationDelay: `${idx * 100}ms` }}>
//                     {msg.sender === 'bot' && (
//                       <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
//                         <span className="text-white text-xs">🤖</span>
//                       </div>
//                     )}
//                     <div
//                       className={`rounded-lg px-3 py-2 shadow-sm max-w-xs text-sm transform hover:scale-105 transition-transform duration-200 ${
//                         msg.sender === 'user'
//                           ? 'bg-green-500 text-white'
//                           : 'bg-white text-gray-800'
//                       }`}
//                     >
//                       {msg.text}
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Chat Input */}
//               <div className="border-t border-gray-200 p-3">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Type your message..."
//                     className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
//                   />
//                   <button
//                     onClick={sendMessage}
//                     className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 hover:shadow-lg"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Enhanced Chat Button */}
//           <button
//             onClick={() => setIsChatOpen(!isChatOpen)}
//             className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-2xl hover:shadow-green-500/25 group animate-bounce"
//           >
//             {isChatOpen ? (
//               <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Enhanced Navbar */}
//       <nav className="relative z-50 flex justify-between items-center px-8 py-6 animate-in slide-in-from-top duration-1000">
//         <div className="flex items-center space-x-4">
//           <img src={agrilogo} alt="AgriConnect" className="h-16 w-auto drop-shadow-lg hover:scale-110 transition-transform duration-300 animate-in zoom-in delay-300" />
//           <div className="text-white"></div>
//         </div>
        
//         <div>
//           {/* Enhanced Floating Logo Button */}
//           <button
//             onClick={() => setOpen(true)}
//             className="fixed bottom-8 right-8 w-16 h-16 flex items-center justify-center 
//                        bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full 
//                        shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 
//                        ring-4 ring-orange-200/50 hover:ring-orange-300/70 group relative overflow-hidden z-50"
//           >
//             {/* Animated background glow */}
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-700 rounded-full 
//                             opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-pulse"></div>
            
//             {/* Logo with subtle animation */}
//             <span className="text-2xl font-bold relative z-10 group-hover:rotate-12 transition-transform duration-300">
//               A
//             </span>
            
//             {/* Ripple effect on hover */}
//             <div className="absolute inset-0 rounded-full border-2 border-white/30 scale-75 
//                             group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
//           </button>

//           {/* Enhanced Modal */}
//           <AnimatePresence>
//             {open && (
//               <motion.div
//                 className="fixed inset-0 z-50 flex items-center justify-center p-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {/* Enhanced Blurred Background */}
//                 <motion.div
//                   className="absolute inset-0 backdrop-blur-md bg-black/50"
//                   onClick={() => setOpen(false)}
//                   initial={{ backdropFilter: "blur(0px)" }}
//                   animate={{ backdropFilter: "blur(12px)" }}
//                   exit={{ backdropFilter: "blur(0px)" }}
//                   transition={{ duration: 0.3 }}
//                 />

//                 {/* Enhanced Modal Container */}
//                 <motion.div
//                   className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl 
//                              w-full max-w-md max-h-[80vh] overflow-hidden z-10 border border-white/20"
//                   initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -15 }}
//                   animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
//                   exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 15 }}
//                   transition={{ 
//                     type: "spring", 
//                     stiffness: 300, 
//                     damping: 25,
//                     duration: 0.4 
//                   }}
//                 >
//                   {/* Header with gradient */}
//                   <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 p-6 text-center relative overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 animate-pulse"></div>
//                     <motion.h2 
//                       className="text-2xl font-bold text-white relative z-10 drop-shadow-lg"
//                       initial={{ y: -20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       Welcome Back! 👋
//                     </motion.h2>
//                     <motion.p 
//                       className="text-orange-100 text-sm mt-1 relative z-10"
//                       initial={{ y: -10, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                     >
//                       Choose an option below
//                     </motion.p>
                    
//                     {/* Decorative elements */}
//                     <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full animate-bounce delay-500"></div>
//                     <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full animate-bounce delay-700"></div>
//                   </div>

//                   {/* Menu Items Container */}
//                   <div className="p-6 space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
//                     {[
//                       {
//                         icon: "👤",
//                         title: "View Profile",
//                         description: "Manage your personal information",
//                         color: "from-blue-500 to-blue-600",
//                         hoverColor: "hover:bg-blue-50"
//                       },
//                       {
//                         icon: "📋",
//                         title: "Check Booking",
//                         description: "View your current reservations",
//                         color: "from-green-500 to-green-600",
//                         hoverColor: "hover:bg-green-50"
//                       },
//                       {
//                         icon: "📦",
//                         title: "Get My Booking",
//                         description: "Download booking details",
//                         color: "from-purple-500 to-purple-600",
//                         hoverColor: "hover:bg-purple-50"
//                       },
//                       {
//                         icon: "🌟",
//                         title: "My Reviews",
//                         description: "View and manage your reviews",
//                         color: "from-yellow-500 to-yellow-600",
//                         hoverColor: "hover:bg-yellow-50"
//                       },
//                       {
//                         icon: "⚙️",
//                         title: "Settings",
//                         description: "Customize your preferences",
//                         color: "from-gray-500 to-gray-600",
//                         hoverColor: "hover:bg-gray-50"
//                       },
//                       {
//                         icon: "🚪",
//                         title: "Logout",
//                         description: "Sign out of your account",
//                         color: "from-red-500 to-red-600",
//                         hoverColor: "hover:bg-red-50",
//                         isLogout: true
//                       }
//                     ].map((item, index) => (
//                       <motion.div
//                         key={item.title}
//                         initial={{ x: -50, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: 0.1 * (index + 1) }}
//                         onClick={() => {
//                           console.log(`${item.title} clicked`);
//                           if (item.title === "Logout") {
//                             navigate("/");
//                           }
//                           setOpen(false);
//                         }}
//                         className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 
//                                    transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]
//                                    ${item.hoverColor} 
//                                    ${item.isLogout ? 'bg-red-50/80 border border-red-100' : 'bg-gray-50/80 border border-gray-100'}
//                                    hover:border-opacity-50`}
//                       >
//                         {/* Background gradient on hover */}
//                         <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 
//                                          group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                        
//                         <div className="relative flex items-center space-x-4">
//                           {/* Icon with animation */}
//                           <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl 
//                                            flex items-center justify-center text-white text-lg
//                                            group-hover:rotate-6 group-hover:scale-110 transition-all duration-300
//                                            shadow-lg group-hover:shadow-xl`}>
//                             <span className="group-hover:animate-pulse">{item.icon}</span>
//                           </div>
                          
//                           {/* Text content */}
//                           <div className="flex-1">
//                             <h3 className={`font-semibold text-gray-800 group-hover:text-gray-900 
//                                             transition-colors duration-300 ${item.isLogout ? 'text-red-600 group-hover:text-red-700' : ''}`}>
//                               {item.title}
//                             </h3>
//                             <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 mt-1">
//                               {item.description}
//                             </p>
//                           </div>
                          
//                           {/* Arrow indicator */}
//                           <div className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 
//                                           transition-all duration-300 opacity-0 group-hover:opacity-100">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                             </svg>
//                           </div>
//                         </div>
                        
//                         {/* Hover shine effect */}
//                         <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 
//                                         bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full 
//                                         group-hover:translate-x-full transform transition-transform duration-1000"></div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Footer */}
//                   <div className="p-4 bg-gray-50/30 border-t border-gray-200/50">
//                     <motion.button
//                       onClick={() => setOpen(false)}
//                       className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 
//                                text-white text-sm font-semibold hover:from-orange-600 hover:to-orange-700 
//                                transition-all duration-300 transform hover:scale-105 hover:shadow-md 
//                                active:scale-95"
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       Close Menu
//                     </motion.button>
//                   </div>

//                   {/* Close button in top-right */}
//                   <button
//                     onClick={() => setOpen(false)}
//                     className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center 
//                              text-white/80 hover:text-white hover:bg-white/20 rounded-full 
//                              transition-all duration-300 hover:rotate-90 hover:scale-110 z-20"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </nav>

//       {/* Enhanced Hero Section */}
//       <div className="relative z-40 flex flex-col items-center justify-center px-8 py-12">
//         <div className="text-center text-white mb-16">
//           {/* Animated Title */}
//           <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-green-200 bg-clip-text text-transparent drop-shadow-2xl min-h-[1.2em]">
//             {displayText}
//             {isTyping && <span className="animate-pulse">|</span>}
//           </h2>
          
//           {/* Animated Subtitle */}
//           <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-1000 hover:scale-105 transition-transform duration-300">
//             <span className="bg-gradient-to-r from-white via-yellow-100 to-green-100 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
//               Revolutionizing agriculture with smart technology solutions for modern farmers
//             </span>
//           </p>
          
//           {/* Animated Divider */}
//           <div className="flex justify-center mt-8 animate-in fade-in duration-1000 delay-1500 hover:scale-110 transition-transform duration-300">
//             <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 rounded-full animate-pulse hover:w-32 hover:h-2 transition-all duration-500 shadow-lg hover:shadow-xl"></div>
//           </div>
//         </div>

//         {/* Enhanced Service Cards */}
//         <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          
//           {/* Enhanced Rent Card */}
//           <div 
//             onClick={() => navigate("/rent")}
//             className="group relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-left delay-500 hover:shadow-3xl hover:shadow-green-500/20"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
//             {/* Floating icon animation */}
//             <div className="absolute top-4 right-4 text-2xl animate-bounce group-hover:animate-spin">🚜</div>
            
//             <div className="relative p-8">
//               <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:shadow-inner transition-all duration-300">
//                 <div className="text-6xl group-hover:scale-125 transition-transform duration-500 animate-pulse">🚜</div>
//               </div>
              
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
//                   <span className="text-2xl group-hover:animate-pulse">🚜</span>
//                 </div>
                
//                 <h3 className="text-3xl font-bold text-green-700 mb-4 group-hover:text-green-800 transition-all duration-300 group-hover:scale-105">
//                   <span className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent group-hover:from-green-500 group-hover:via-green-600 group-hover:to-green-700 transition-all duration-500 drop-shadow-sm">
//                     Lend Equipment
//                   </span>
//                 </h3>
                
//                 <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-sm">
//                   Access modern farming equipment at affordable prices. Boost your productivity without high upfront costs.
//                 </p>
                
//                 <div className="inline-flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-md">
//                   <span>Explore Rentals</span>
//                   <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Buy Card */}
//           <div 
//             onClick={() => navigate("/buy")}
//             className="group relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:rotate-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-bottom delay-700 hover:shadow-3xl hover:shadow-blue-500/20"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
//             {/* Floating icon animation */}
//             <div className="absolute top-4 right-4 text-2xl animate-bounce group-hover:animate-pulse delay-200">🛒</div>
            
//             <div className="relative p-8">
//               <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:shadow-inner transition-all duration-300">
//                 <div className="text-6xl group-hover:scale-125 transition-transform duration-500 animate-pulse">🛒</div>
//               </div>
              
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
//                   <span className="text-2xl group-hover:animate-pulse">🛒</span>
//                 </div>
                
//                 <h3 className="text-3xl font-bold text-blue-700 mb-4 group-hover:text-blue-800 transition-all duration-300 group-hover:scale-105">
//                   <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-500 drop-shadow-sm">
//                     Rent Products
//                   </span>
//                 </h3>
                
//                 <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-sm">
//                   Purchase quality agricultural tools, seeds, and machinery from trusted sellers with complete confidence.
//                 </p>
                
//                 <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-md">
//                   <span>Shop Now</span>
//                   <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced Assistant Card */}
//           <div 
//             onClick={() => navigate("/assistant")}
//             className="group relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer animate-in fade-in slide-in-from-right delay-900 hover:shadow-3xl hover:shadow-orange-500/20"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
//             {/* Floating icon animation */}
//             <div className="absolute top-4 right-4 text-2xl animate-bounce group-hover:animate-spin delay-300">🤖</div>
            
//             <div className="relative p-8">
//               <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center group-hover:shadow-inner transition-all duration-300">
//                 <div className="text-6xl group-hover:scale-125 transition-transform duration-500 animate-pulse">🤖</div>
//               </div>
              
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
//                   <span className="text-2xl group-hover:animate-pulse">🤖</span>
//                 </div>
                
//                 <h3 className="text-3xl font-bold text-orange-700 mb-4 group-hover:text-orange-800 transition-all duration-300 group-hover:scale-105">
//                   <span className="bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent group-hover:from-orange-500 group-hover:via-orange-600 group-hover:to-orange-700 transition-all duration-500 drop-shadow-sm">
//                     AI Assistant
//                   </span>
//                 </h3>
                
//                 <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-sm">
//                   Get AI-powered farming guidance, weather forecasts, and crop care tips for maximum yields.
//                 </p>
                
//                 <div className="inline-flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-all duration-300 group-hover:translate-x-1 group-hover:drop-shadow-md">
//                   <span>Get Assistance</span>
//                   <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//         </div>

//         {/* Enhanced Stats Section */}
//         <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-4xl">
//           {[
//             { number: "10K+", label: "Happy Farmers", delay: "delay-1000" },
//             { number: "500+", label: "Equipment Available", delay: "delay-1200" },
//             { number: "50+", label: "Cities Covered", delay: "delay-1400" },
//             { number: "24/7", label: "Support Available", delay: "delay-1600" }
//           ].map((stat, index) => (
//             <div key={index} className={`text-center text-white animate-in fade-in slide-in-from-bottom duration-1000 ${stat.delay} group hover:scale-110 transition-transform duration-300`}>
//               <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-yellow-200 to-green-200 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:via-white group-hover:to-yellow-300 transition-all duration-500 drop-shadow-lg group-hover:scale-125 group-hover:drop-shadow-2xl">
//                 {stat.number}
//               </div>
//               <div className="text-sm opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:text-yellow-200 group-hover:drop-shadow-md">
//                 {stat.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes animate-in {
//           from {
//             opacity: 0;
//             transform: translateY(16px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-in {
//           animation: animate-in 0.6s ease-out forwards;
//         }
        
//         .slide-in-from-top {
//           transform: translateY(-16px);
//         }
        
//         .slide-in-from-bottom {
//           transform: translateY(16px);
//         }
        
//         .slide-in-from-left {
//           transform: translateX(-16px);
//         }
        
//         .slide-in-from-right {
//           transform: translateX(16px);
//         }
        
//         .fade-in {
//           opacity: 0;
//         }
        
//         .zoom-in {
//           transform: scale(0.9);
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #f97316, #ea580c);
//           border-radius: 10px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #ea580c, #dc2626);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;