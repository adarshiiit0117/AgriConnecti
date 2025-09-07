import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipments } from "../State/Auth/Action";
import agrilogo from "../assets/agrilogo.png";
import tractor from "../assets/tractor.jpg";
import harvester from "../assets/harvester.jpg";
import tools from "../assets/tools.avif";
import land from "../assets/land.jpg";
import straw from "../assets/straw.jpg";
import labour from "../assets/labour.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import Profile from './Profile';
import { bookEquipment } from "../State/Auth/Action"; 

const Buy = () => {
  const [open, setOpen] = useState(false);
  
  // ✅ NEW: State for tracking booking status of each equipment
  const [bookingStates, setBookingStates] = useState({});

  // ✅ Redux setup
  const dispatch = useDispatch();
  
  // ✅ UPDATED: Handle booking with state transitions
  const handleBook = (equipmentId) => {
    // Set booking state to "booking"
    setBookingStates(prev => ({
      ...prev,
      [equipmentId]: 'booking'
    }));

    dispatch(bookEquipment(equipmentId))
      .then(() => {
        // After 2 seconds, change to "booked"
        setTimeout(() => {
          setBookingStates(prev => ({
            ...prev,
            [equipmentId]: 'booked'
          }));
          
          alert("✅ Booking confirmed! Your requested Service will reach to your address within 30 mins. See Profile for booking details");
          dispatch(fetchEquipments(selectedCategory.key)); // refresh list
        }, 2000);
      })
      .catch(() => {
        // Reset state if booking fails
        setBookingStates(prev => ({
          ...prev,
          [equipmentId]: 'available'
        }));
      });
  };

  const { equipments, equipmentLoading, equipmentError } = useSelector(
    (state) => state.auth
  );

  // ✅ Chatbot states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your AgriBot assistant. How can I help you with your farming needs today?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const userId = "user_123";
  const navigate = useNavigate();

  // ✅ UI states
  const [showProductTable, setShowProductTable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // ✅ NEW: Booking modal states
  const [showMyBookings, setShowMyBookings] = useState(false);
  const [showCheckBooking, setShowCheckBooking] = useState(false);
  const [bookingId, setBookingId] = useState("");

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

  // ✅ NEW: Function to get button text and style based on booking state
  const getButtonConfig = (equipmentId) => {
    const state = bookingStates[equipmentId] || 'available';
    
    switch (state) {
      case 'booking':
        return {
          text: 'Booking...',
          className: 'bg-orange-500 text-white px-3 py-1 rounded-lg cursor-not-allowed',
          disabled: true
        };
      case 'booked':
        return {
          text: 'Booked',
          className: 'bg-gray-500 text-white px-3 py-1 rounded-lg cursor-not-allowed',
          disabled: true
        };
      default:
        return {
          text: 'Rent Now',
          className: 'bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700',
          disabled: false
        };
    }
  };
  
  // ✅ Chat logic
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { sender: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("question", inputText);

      const response = await fetch("http://127.0.0.1:8001/ask", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const botReply = {
        sender: "bot",
        text: data.answer || "Sorry, I could not find an answer.",
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error contacting the assistant. Please try again." },
      ]);
      console.error("Chat error:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Fetch equipments on mount
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchEquipments(selectedCategory.key));
    }
  }, [selectedCategory, dispatch]);

  // ✅ Rental categories
  const rentalItems = [
    { id: 1, key: "TRACTOR", name: "Tractor", image: tractor, description: "Heavy-duty tractors for all farming needs" },
    { id: 2, key: "HARVESTOR", name: "Harvester", image: harvester, description: "Efficient harvesting equipment" },
    { id: 3, key: "LABOUR", name: "Labour Services", image: labour, description: "Skilled agricultural workers" },
    { id: 4, key: "TOOLS", name: "Farm Tools", image: tools, description: "Essential farming tools and equipment" },
    { id: 5, key: "LAND", name: "Agricultural Land", image: land, description: "Fertile land for farming projects" },
    { id: 6, key: "FODDER", name: "Straw & Feed", image: straw, description: "Quality straw and animal feed" },
  ];

  // ✅ UI handlers
  const handleRentClick = (item) => {
    setSelectedCategory(item);
    setShowProductTable(true);
  };

  const closeTable = () => {
    setShowProductTable(false);
    setSelectedCategory(null);
    // Reset booking states when closing table
    setBookingStates({});
  };

  // ✅ UPDATED: Booking handlers with auto-close menu
  const handleGetMyBookings = () => {
    setShowMyBookings(true);
    setOpen(false); // Auto-close menu
  };

  const handleCheckBooking = () => {
    setShowCheckBooking(true);
    setOpen(false); // Auto-close menu
  };

  const closeBookingModals = () => {
    setShowMyBookings(false);
    setShowCheckBooking(false);
    setBookingId("");
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

  // ✅ NEW: Handle profile view
  const handleViewProfile = () => {
    setOpen(false);
    alert("Profile view functionality will be implemented here");
  };

  // ✅ NEW: Handle logout
  const handleLogout = () => {
    setOpen(false);
    alert("Logout functionality will be implemented here");
  };

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
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* ✅ UPDATED: Blur Overlay - appears when menu is open */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Animated Background Elements */}
      <div className={`absolute inset-0 transition-all duration-300 ${open ? 'blur-sm' : ''}`}>
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-32 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-green-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating Particles */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-all duration-300 ${open ? 'blur-sm' : ''}`}>
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

      {/* Chatbot Section */}
      <div className={`transition-all duration-300 ${open ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="fixed bottom-6 right-6 z-30">
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

      {/* ✅ UPDATED: Navbar - no blur when menu is open */}
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
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 hover:bg-orange-100 hover:shadow-md cursor-pointer transition-all duration-300 font-medium flex items-center justify-center space-x-2 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span  onClick={() => navigate("/profile")}>View Profile</span>
                    </button>
                  </li>
                  
                  <li>
                    <button 
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

      {/* ✅ UPDATED: Main Content - blur when menu is open */}
      <div className={`relative z-10 px-8 pb-8 transition-all duration-300 ${open ? 'blur-sm pointer-events-none' : ''}`}>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            What would you like to rent today?
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
                  View Available Items
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

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

      {/* Product Table Modal */}
      {showProductTable && selectedCategory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white">Available {selectedCategory.name}</h3>
                  <p className="text-green-100">Choose from our verified providers</p>
                </div>
                <button 
                  onClick={closeTable}
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition duration-300 hover:rotate-90"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto max-h-[70vh]">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {equipments
                    ?.filter((eq) => eq.category === selectedCategory.key && eq.available)
                    .map((eq) => {
                      const buttonConfig = getButtonConfig(eq.id);
                      return (
                        <tr
                          key={eq.id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{eq.description}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-green-600">₹{eq.price}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-700">{eq.pricingUnit}</div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => !buttonConfig.disabled && handleBook(eq.id)}
                              disabled={buttonConfig.disabled}
                              className={`${buttonConfig.className} transition-all duration-300 ${
                                !buttonConfig.disabled && 'hover:shadow-md transform hover:scale-105'
                              }`}
                            >
                              {buttonConfig.text}
                              {bookingStates[eq.id] === 'booking' && (
                                <svg className="animate-spin -mr-1 ml-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;