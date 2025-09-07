import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import agrilogo from "../assets/agrilogo.png";
import tractor from "../assets/tractor.jpg";
import harvester from "../assets/harvester.jpg";
import tools from "../assets/tools.avif";
import land from "../assets/land.jpg";
import straw from "../assets/straw.jpg";
import labour from "../assets/labour.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { createEquipment } from "../State/Auth/Action.js";
import { motion, AnimatePresence } from "framer-motion";




const Rent = () => {

// handle booking
  // ✅ NEW: Handle profile view
  const handleViewProfile = () => {
    setOpen(false);
    alert("Profile view functionality will be implemented here");
  };






//handle booking over
const [showCheckBooking, setShowCheckBooking] = useState(false);
  const [bookingId, setBookingId] = useState("");

 const [showMyBookings, setShowMyBookings] = useState(false);


  // ✅ Sample booking data (replace with actual API calls)
  const myBookingsData = [
    {
      id: "BK001",
      item: "John Deere Tractor",
      category: "TRACTOR",
      renterName: "Rajesh Kumar",
      renterPhone: "+91 9876543210",
      startDate: "2025-01-15",
      endDate: "2025-01-18",
      totalAmount: "₹12,000",
      status: "Active",
      location: "Palakkad, Kerala"
    },
    {
      id: "BK002",
      item: "Combine Harvester",
      category: "HARVESTOR",
      renterName: "Priya Menon",
      renterPhone: "+91 8765432109",
      startDate: "2025-01-10",
      endDate: "2025-01-12",
      totalAmount: "₹25,000",
      status: "Completed",
      location: "Thrissur, Kerala"
    },
    {
      id: "BK003",
      item: "Farm Labour (5 workers)",
      category: "LABOUR",
      renterName: "Arun Nair",
      renterPhone: "+91 7654321098",
      startDate: "2025-01-20",
      endDate: "2025-01-25",
      totalAmount: "₹15,000",
      status: "Pending",
      location: "Kottayam, Kerala"
    }
  ];

  const myRentalsData = [
    {
      id: "RT001",
      item: "Rotary Tiller",
      provider: "AgriEquip Solutions",
      providerPhone: "+91 9123456789",
      startDate: "2025-01-12",
      endDate: "2025-01-14",
      totalAmount: "₹8,000",
      status: "Active",
      location: "Kozhikode, Kerala"
    },
    {
      id: "RT002",
      item: "Agricultural Land (2 acres)",
      provider: "Green Fields Farm",
      providerPhone: "+91 8123456789",
      startDate: "2025-01-01",
      endDate: "2025-06-01",
      totalAmount: "₹50,000",
      status: "Active",
      location: "Wayanad, Kerala"
    }
  ];
  
// ✅ Utility for status badge
    const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

const searchBookingById = () => {
    // In real implementation, you would call an API here
    const booking = [...myBookingsData, ...myRentalsData].find(b => b.id === bookingId);
    if (booking) {
      alert(`Booking found: ${booking.item} - Status: ${booking.status}`);
    } else {
      alert("Booking not found. Please check your booking ID.");
    }
  };

// ✅ UPDATED: Booking handlers with auto-close menu
   const handleCheckBooking = () => {
    setShowCheckBooking(true);
    setOpen(false); // Auto-close menu
  };


  const handleGetMyBookings = () => {
    setShowMyBookings(true);
    setOpen(false); // Auto-close menu
  };

  const closeBookingModals = () => {
    setShowMyBookings(false);
    setShowCheckBooking(false);
    setBookingId("");
  };

  // ✅ NEW: Handle logout
  const handleLogout = () => {
    setOpen(false);
    alert("Logout functionality will be implemented here");
  };

  const dispatch = useDispatch();
  const { equipmentLoading, equipmentError } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    pricingUnit: "",
    country: "",
    state: "",
    pincode: "",
    address: "",
  });

  const rentalItems = [
    {
      id: 1,
      name: "Tractor",
      image: tractor,
      description: "Heavy-duty tractors for all farming needs",
      category: "TRACTOR",
    },
    {
      id: 2,
      name: " HARVESTOR",
      image: harvester,
      description: "Efficient harvesting equipment",
      category: "HARVESTOR",
    },
    {
      id: 3,
      name: "Labour Services",
      image: labour,
      description: "Skilled agricultural workers",
      category: "LABOUR",
    },
    {
      id: 4,
      name: "Farm Tools",
      image: tools,
      description: "Essential farming tools and equipment",
      category: "TOOLS",
    },
    {
      id: 5,
      name: "Agricultural Land",
      image: land,
      description: "Fertile land for farming projects",
      category: "LAND",
    },
    {
      id: 6,
      name: "Straw & Feed",
      image: straw,
      description: "Quality straw and animal feed",
      category: " FODDER",
    },
  ];

  const categories = [
    "TRACTOR",
    " HARVESTOR",
    "LABOUR",
    "TOOLS",
    "LAND",
    " FODDER",
    "SEEDS",
    "FERTILIZER",
    "OTHER",
  ];

  const pricingUnits = [
    "PER_DAY",
    "PER_HOUR",
    
  ];

  const handleRentClick = (item) => {
    setSelectedItem(item);
    setFormData((prev) => ({
      ...prev,
      title: item.name,
      category: item.category,
      description: item.description,
    }));
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedItem(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      pricingUnit: "",
      country: "",
      state: "",
      pincode: "",
      address: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createEquipment(formData))
      .then(() => {
        alert("✅ Equipment listed successfully!");
        closeForm();
      })
      .catch(() => {
        alert("❌ Failed to list equipment. Please try again.");
      });
  };

  const [open, setOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm your AgriBot assistant. How can I help you with your farming needs today?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const userId = "user_123"; // Replace this with dynamic user ID if needed

  const sendMessage = async () => {
  if (!inputText.trim()) return;

  const userMessage = { sender: 'user', text: inputText };
  setMessages((prev) => [...prev, userMessage]);
  setInputText('');
  setIsTyping(true); // <-- Start typing

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
  } finally {
    setIsTyping(false); // <-- Stop typing
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
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Chatbot Section with enhanced animations */}
    <div>
      {/* Floating Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen && (
          <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🌾</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">AgriBot</h3>
                  <p className="text-white/80 text-xs">Your Farming Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'items-start space-x-2'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">🤖</span>
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-3 py-2 shadow-sm max-w-xs text-sm ${
                      msg.sender === 'user'
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
  <div className="flex items-start space-x-2">
    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-white text-xs">🤖</span>
    </div>
    <div className="rounded-lg px-3 py-2 shadow-sm max-w-xs text-sm bg-white text-gray-800 italic">
      Agent is typing...
    </div>
  </div>
)}

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
                  className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 transition-colors"
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

        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          {isChatOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      {/* Navbar
      <nav className="relative z-50 flex justify-between items-center px-8 py-6 animate-in slide-in-from-top duration-1000">
        
     
        <div className={`flex items-center space-x-4 transition-all duration-300 ${open ? 'blur-sm' : ''}`}>
          <img 
            src={agrilogo} 
            alt="AgriConnect" 
            className="h-16 w-auto drop-shadow-lg hover:scale-110 transition-transform duration-300 animate-in zoom-in delay-300" 
          />
        </div>

       
        <div className="relative">
      
          <button
            onClick={() => setOpen(!open)}
            className={`w-14 h-14 flex items-center justify-center 
                       bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full 
                       shadow-lg hover:shadow-2xl hover:scale-110 transition duration-300 ${
                         open ? 'ring-4 ring-orange-300 ring-opacity-50' : ''
                       }`}
          >
            <span className="text-2xl font-bold">A</span>
          </button>

        
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl p-6 text-center z-50 border border-gray-100"
                initial={{ scale: 0.8, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">A</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-6 text-orange-700">User Menu</h2>

                <ul className="flex flex-col gap-3">
                  <li>
                    <button 
                     onClick={()=>navigate("/profile")}
                     // onClick={handleViewProfile}
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
                      onClick={handleCheckBooking} 
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 hover:bg-orange-100 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <span>Check Booking</span>
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={handleGetMyBookings} 
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 hover:bg-orange-100 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>My Bookings</span>
                    </button>
                  </li>
                  
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                    >
                      <svg className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>

                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg"
                >
                  Close Menu
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav> */}

{/* 
      new nav bar */}
                        <nav className="relative z-50 flex justify-between items-center px-8 py-6 animate-in slide-in-from-top duration-1000">
                          
                          {/* Left Logo */}
                          <div className={`flex items-center space-x-4 transition-all duration-300 ${open ? 'blur-sm' : ''}`}>
                            <img 
                              src={agrilogo} 
                              alt="AgriConnect" 
                              className="h-16 w-auto drop-shadow-lg hover:scale-110 transition-transform duration-300 animate-in zoom-in delay-300" 
                            />
                          </div>
                  
                          {/* Right Logo Button + Dropdown */}
                          <div className="relative">
                            {/* Logo Button */}
                            <button
                              onClick={() => setOpen(!open)}
                              className={`w-14 h-14 flex items-center justify-center 
                                         bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full 
                                         shadow-lg hover:shadow-2xl hover:scale-110 transition duration-300 ${
                                           open ? 'ring-4 ring-orange-300 ring-opacity-50' : ''
                                         }`}
                            >
                              <span className="text-2xl font-bold">A</span>
                            </button>
                  
                            {/* Dropdown Menu */}
                            <AnimatePresence>
                              {open && (
                                <motion.div
                                  className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl p-6 text-center z-50 border border-gray-100"
                                  initial={{ scale: 0.8, opacity: 0, y: -10 }}
                                  animate={{ scale: 1, opacity: 1, y: 0 }}
                                  exit={{ scale: 0.8, opacity: 0, y: -10 }}
                                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-orange-700">User Menu</h2>
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
      
                                   <div className="w-full mb-4 h-12 bg-gradient-to-br from-orange-500 to-orange-600  flex items-center justify-center">
                                      <span className="text-white text-xl font-bold">Hi Gaurav</span>
                                    </div>
                                   
                                  <ul className="flex flex-col gap-3">
                                    <li>
                                      <button 
                                       // onClick={handleViewProfile}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 hover:bg-orange-100 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                                      >
                                        <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span  onClick={() => navigate("/profile")}>View Profile</span>
                                      </button>
                                    </li>
                                    
                                    {/* <li>
                                      <button 
                                        //onClick={handleCheckBooking} 
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 hover:bg-orange-100 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                                      >
                                        <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                        <span>Check Booking</span>
                                      </button>
                                    </li>
                                    
                                    <li>
                                      <button 
                                        //onClick={handleGetMyBookings} 
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 hover:bg-orange-100 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                                      >
                                        <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <span>My Bookings</span>
                                      </button>
                                    </li> */}
                                    
                                    <li>
                                      <button 
                                       // onClick={handleLogout}
                                       onClick={()=>navigate("/")}
                                        className="w-full px-4 py-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                                      >
                                        <svg className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Logout</span>
                                      </button>
                                    </li>
                                  </ul>
                  
      
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </nav>


      {/* Main Content */}
      <div className={`relative z-10 px-8 pb-8 transition-all duration-300 ${open ? 'blur-sm pointer-events-none' : ''}`}>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            What would you like to lend today?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Choose from our wide range of agricultural equipment and services
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full mx-auto mt-6"></div>
        </div>

        {/* Rental Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {rentalItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-500"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition duration-300">
                  {item.name}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Rent Button */}
                <button
                  onClick={() => handleRentClick(item)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Lend Now
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Rental Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      List {selectedItem?.name} for Rent
                    </h3>
                    <p className="text-green-100">Fill out the details below</p>
                  </div>
                  <button
                    onClick={closeForm}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition duration-300"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                      placeholder="Enter item title"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                      rows="3"
                      placeholder="Detailed description of the item"
                      required
                    ></textarea>
                  </div>

                  {/* Price and Pricing Unit */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pricing Unit *
                      </label>
                      <select
                        name="pricingUnit"
                        value={formData.pricingUnit}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                        required
                      >
                        <option value="">Select pricing unit</option>
                        {pricingUnits.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit
                              .replace("_", " ")
                              .toLowerCase()
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category
                            .toLowerCase()
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                        placeholder="Enter country"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                        placeholder="Enter state"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pin Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                      placeholder="Enter pin code"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition duration-300"
                      rows="3"
                      placeholder="Enter complete address"
                      required
                    ></textarea>
                  </div>

                  {/* Form Actions */}
                  <div className="flex space-x-4 pt-6">
                    <button
                      type="submit"
                      disabled={equipmentLoading}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
             text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300
             disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {equipmentLoading
                        ? "Submitting..."
                        : "Submit Rental Listing"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-sm opacity-80">Equipment Available</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-sm opacity-80">Service Support</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-sm opacity-80">Cities Covered</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div className="text-sm opacity-80">Happy Farmers</div>
          </div>
        </div>
      </div>

      {/* ✅ Modals remain at highest z-index to stay above blur */}
      
            {/* My Bookings Modal */}
      {showMyBookings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white">My Bookings</h3>
                  <p className="text-blue-100">Manage your equipment rentals and bookings</p>
                </div>
                <button 
                  onClick={closeBookingModals}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition duration-300 hover:rotate-90"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[70vh] p-6">
              {/* Items I've Rented Out */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Items I've Rented Out ({myBookingsData.length})
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renter Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {myBookingsData.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{booking.item}</div>
                            <div className="text-sm text-gray-500">{booking.location}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{booking.renterName}</div>
                            <div className="text-sm text-gray-500">{booking.renterPhone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{booking.startDate}</div>
                            <div className="text-sm text-gray-500">to {booking.endDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{booking.totalAmount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Items I've Rented */}
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Items I've Rented ({myRentalsData.length})
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rental ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {myRentalsData.map((rental) => (
                        <tr key={rental.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rental.id}</td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{rental.item}</div>
                            <div className="text-sm text-gray-500">{rental.location}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{rental.provider}</div>
                            <div className="text-sm text-gray-500">{rental.providerPhone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{rental.startDate}</div>
                            <div className="text-sm text-gray-500">to {rental.endDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">{rental.totalAmount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rental.status)}`}>
                              {rental.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


              {/* Check Booking Modal */}
      {showCheckBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white">Check Booking Status</h3>
                  <p className="text-orange-100">Enter your booking ID to check status</p>
                </div>
                <button 
                  onClick={closeBookingModals}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition duration-300 hover:rotate-90"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex flex-col space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booking ID
                  </label>
                  <input
                    type="text"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    placeholder="Enter your booking ID (e.g., BK001, RT001)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <button
                  onClick={searchBookingById}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Check Status
                </button>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Sample Booking IDs:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>BK001:</strong> Tractor rental (Active)</p>
                    <p><strong>BK002:</strong> Harvester rental (Completed)</p>
                    <p><strong>RT001:</strong> Tiller rental (Active)</p>
                    <p><strong>RT002:</strong> Land rental (Active)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}





    </div>
  );
};

export default Rent;
