import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings, fetchLenderBookings, cancelBooking, markAsCompleted } from "../State/Auth/Action";


// SVG Icon Components (no external dependencies)
const User = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Calendar = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Clock = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

const MapPin = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Phone = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const Mail = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const Star = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon>
  </svg>
);

const LogOut = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16,17 21,12 16,7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const ChevronRight = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

const Package = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const IdCard = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
    <circle cx="9" cy="10" r="2"></circle>
    <path d="M15 8h2"></path>
    <path d="M15 12h2"></path>
    <path d="M7 16h10"></path>
  </svg>
);

const Globe = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const Home = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9,22 9,12 15,12 15,22"></polyline>
  </svg>
);

const Profile = () => {
  const dispatch = useDispatch();
  const { myBookings, lenderBookings, bookingLoading } = useSelector(
    (state) => state.auth
  );

  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  useEffect(() => {
    // Load profile info from localStorage
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          fullName: parsedUser.fullName || "Guest",
          email: parsedUser.email || "N/A",
          phoneNumber: parsedUser.phoneNumber || "N/A",
          country: parsedUser.country || "N/A",
          state: parsedUser.state || "N/A",
          pincode: parsedUser.pincode || "N/A",
          address: parsedUser.address || "N/A",
          id: parsedUser.id
            ? parsedUser.id
            : parsedUser.sub
            ? "USER-" + parsedUser.sub
            : "N/A",
          joinDate: parsedUser.createdAt
            ? new Date(parsedUser.createdAt).toLocaleDateString()
            : "N/A",
        });
      } catch (error) {
        console.error("❌ Error parsing userData:", error);
        setUserData({
          fullName: "Guest",
          email: "N/A",
          phoneNumber: "N/A",
          country: "N/A",
          state: "N/A",
          pincode: "N/A",
          address: "N/A",
          id: "GUEST",
          joinDate: "N/A",
        });
      }
    }

    // Fetch bookings from backend
    dispatch(fetchMyBookings());
    dispatch(fetchLenderBookings());
  }, [dispatch]);

  // Show loading until user data is ready
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('jwt');
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleCancelBooking = (bookingId) => {
    setCancellingBookingId(bookingId);

    setTimeout(() => {
      dispatch(cancelBooking(bookingId))
        .then(() => {
          setCancellingBookingId(null);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to cancel booking. Try again!");
          setCancellingBookingId(null);
        });
    }, 2000);
  };
const handleMarkAsCompleted = (bookingId) => {
  dispatch(markAsCompleted(bookingId))
    .then(() => {
      dispatch(fetchMyBookings());       // refresh renter’s bookings
      dispatch(fetchLenderBookings());   // refresh lender’s requests
    })
    .catch((err) => {
      console.error("❌ Failed to mark as completed:", err);
      alert("Something went wrong. Try again!");
    });
};

  const renderProfile = () => (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-5xl">{userData.fullName.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{userData.fullName}</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Mail className="text-blue-600 mr-3" size={20} />
            <span className="font-semibold text-gray-700">Email</span>
          </div>
          <p className="text-gray-800 break-all">{userData.email}</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Phone className="text-green-600 mr-3" size={20} />
            <span className="font-semibold text-gray-700">Phone Number</span>
          </div>
          <p className="text-gray-800">{userData.phoneNumber}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Globe className="text-purple-600 mr-3" size={20} />
            <span className="font-semibold text-gray-700">Country</span>
          </div>
          <p className="text-gray-800">{userData.country}</p>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <MapPin className="text-teal-600 mr-3" size={20} />
            <span className="font-semibold text-gray-700">State</span>
          </div>
          <p className="text-gray-800">{userData.state}</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <IdCard className="text-yellow-600 mr-3" size={20} />
            <span className="font-semibold text-gray-700">Pincode</span>
          </div>
          <p className="text-gray-800">{userData.pincode}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Home className="text-gray-600 mr-3" size={20} />
          <span className="font-semibold text-gray-700">Address</span>
        </div>
        <p className="text-gray-800">{userData.address}</p>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Welcome back, {userData.fullName.split(' ')[0]}!</h3>
        <p>Thank you for being a valued member. Enjoy exclusive benefits and premium services.</p>
      </div>
    </div>
  );

  const renderBookings = () => {
  // Sort myBookings by bookingTime descending (latest first)
  const sortedBookings = [...myBookings].sort(
    (a, b) => new Date(b.bookingTime) - new Date(a.bookingTime)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Calendar className="mr-3 text-blue-600" />
        My Bookings
      </h2>

      {bookingLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      ) : !sortedBookings || sortedBookings.length === 0 ? (
        <div className="text-center py-12">
          <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No bookings yet</h3>
          <p className="text-gray-500">Start exploring our services to make your first booking!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Package size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {booking.equipment?.title || "Equipment"}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(booking.bookingTime).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {new Date(booking.bookingTime).toLocaleTimeString()}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {booking.equipment?.address}, {booking.equipment?.state}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                      booking.status === "BOOKED"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : booking.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                  {booking.status === "BOOKED" && (
                    <div>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        disabled={cancellingBookingId === booking.id}
                      >
                        {cancellingBookingId === booking.id ? "Cancelling..." : "Cancel"}
                      </button>
                    </div>
                  )}
                  {booking.status === "CANCELLED" && (
                    <div className="text-sm text-red-600 font-medium">Booking Cancelled</div>
                  )}
                  {booking.status === "COMPLETED" && (
                    <div className="text-sm text-blue-600 font-medium">Booking Completed</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


 const renderRequestedServices = () => {
  // Sort lenderBookings by bookingTime descending (latest first)
  const sortedLenderBookings = [...lenderBookings].sort(
    (a, b) => new Date(b.bookingTime) - new Date(a.bookingTime)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Package className="mr-3 text-green-600" />
        Requested Services
      </h2>

      {bookingLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading requested services...</p>
        </div>
      ) : !sortedLenderBookings || sortedLenderBookings.length === 0 ? (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No requested services yet</h3>
          <p className="text-gray-500">Your equipment hasn't been booked by anyone yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {sortedLenderBookings.map((service) => {
            const statusClasses =
              service.status === 'BOOKED'
                ? 'bg-green-100 text-green-800'
                : service.status === 'CANCELLED'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800';

            return (
              <div
                key={service.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                    <Star size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {service.equipment?.title || 'Service'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Requested by: {service.renter?.fullName || 'Unknown'}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(service.bookingTime).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {new Date(service.bookingTime).toLocaleTimeString()}
                      </span>
                    </div>
                    <span
                      className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${statusClasses}`}
                    >
                      {service.status}
                    </span>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      ₹{service.equipment?.price}
                    </p>
                    {service.status === 'BOOKED' && (
                      <button
                        onClick={() => handleMarkAsCompleted(service.id)}
                        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-xl min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{userData.fullName.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{userData.fullName}</h3>
              </div>
            </div>
          </div>
          
          <nav className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  activeTab === 'profile' 
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="mr-3" size={20} />
                My Profile
              </button>
              
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  activeTab === 'bookings' 
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="mr-3" size={20} />
                My Bookings
              </button>
              
              <button
                onClick={() => setActiveTab('requestedServices')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                  activeTab === 'requestedServices'
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Package className="mr-3" size={20} />
                Requested Services
              </button>

              <div className="pt-4 mt-4 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center"
                >
                  <LogOut className="mr-3" size={20} />
                  Log Out
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'requestedServices' && renderRequestedServices()}
        </div>
      </div>
    </div>
  );
};

export default Profile;