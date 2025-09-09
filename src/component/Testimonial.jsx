
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Testimonial data (random users giving feedback)
  const testimonialsData = [
    {
      name: "Sarah Mitchell",
      title: "Farm Owner",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=300&h=300&fit=crop&crop=face",
      rating: 5,
      text: "AgriConnect transformed my 500-acre farm operations. Crop yields increased by 30% in just one season!",
      role: "Organic Farmer",
      experience: "15+ Years Farming",
      icon: "🌱"
    },
    {
      name: "Michael Chen",
      title: "Agricultural Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      rating: 5,
      text: "The AI predictions are incredibly accurate. I recommend AgriConnect to all my farming clients.",
      role: "Agri Consultant",
      experience: "12+ Years Experience",
      icon: "📊"
    },
    {
      name: "Emily Rodriguez",
      title: "Sustainable Farmer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      rating: 5,
      text: "The smart irrigation system helped me save 40% water while maintaining excellent crop quality.",
      role: "Eco Farmer",
      experience: "8+ Years Farming",
      icon: "💧"
    },
    {
      name: "James Thompson", 
      title: "Dairy Farmer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      rating: 4,
      text: "Managing my dairy operations became so much easier with AgriConnect's comprehensive platform.",
      role: "Dairy Specialist",
      experience: "20+ Years Experience",
      icon: "🐄"
    },
    {
      name: "Lisa Park",
      title: "Greenhouse Manager",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      rating: 5,
      text: "The weather predictions and soil analysis features are game-changers for greenhouse farming.",
      role: "Greenhouse Expert",
      experience: "10+ Years Experience",
      icon: "🏠"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonialsData.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg transition-all duration-300 ${
          index < rating ? 'text-yellow-400' : 'text-gray-400'
        }`}
      >
        ★
      </span>
    ));
  };
  
  const navigate = useNavigate();

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-green-400/30">
          <span>🌾</span>
          <span className="text-white/90 font-medium">Customer Stories</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          Customer 
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h1>
        
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Hear from farmers who transformed their operations with AgriConnect
        </p>
      </div>

      {/* Stats */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {[
          { icon: '🌾', number: '1000+', label: 'Happy Farmers' },
          { icon: '⭐', number: '4.9', label: 'Average Rating' },
          { icon: '📈', number: '35%', label: 'Yield Increase' }
        ].map((stat, index) => (
          <div key={index} className="group">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Testimonial */}
      <div className={`mb-20 transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 relative overflow-hidden">
          <div className="absolute top-6 left-6 text-4xl text-green-400/30">"</div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400/50 shadow-xl">
                <img
                  src={testimonialsData[currentSlide].image}
                  alt={testimonialsData[currentSlide].name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-xl animate-pulse">
                {testimonialsData[currentSlide].icon}
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-4">
                {renderStars(testimonialsData[currentSlide].rating)}
              </div>
              
              <p className="text-2xl text-white/90 mb-6 italic">
                "{testimonialsData[currentSlide].text}"
              </p>
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {testimonialsData[currentSlide].name}
                </h3>
                <p className="text-green-400 font-medium mb-2">
                  {testimonialsData[currentSlide].title}
                </p>
                <div className="flex justify-center lg:justify-start gap-4 text-sm text-white/70">
                  <span>{testimonialsData[currentSlide].role}</span>
                  <span>•</span>
                  <span>{testimonialsData[currentSlide].experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)}
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 group"
            >
              <span className="text-white group-hover:scale-110 inline-block transition-transform duration-300">←</span>
            </button>

            <div className="flex gap-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-green-400 w-8' : 'bg-white/40 w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonialsData.length)}
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300 group"
            >
              <span className="text-white group-hover:scale-110 inline-block transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className={`text-center transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-md rounded-3xl p-12 border border-white/20">
          <div className="text-4xl mb-4 animate-bounce">🌾</div>
          <h3 className="text-3xl font-bold text-white mb-4">
            Join Our Agricultural Revolution!
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Ready to transform your farming experience with cutting-edge technology?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=>navigate("/login")} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
              Get Started Now
            </button>
            <button className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
