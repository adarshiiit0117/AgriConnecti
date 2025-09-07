import Layout from './Layout'

import React, { useState, useEffect } from 'react';
import leftArrow from '../assets/left_arrow.svg';
import rightArrow from '../assets/right_arrow.svg';
 
 import agrilogo from "../assets/agrilogo.png";
 import tractor from "../assets/tractor.jpg";
 import harvester from "../assets/harvester.jpg";
 import tools from "../assets/tools.avif";
 import land from "../assets/land.jpg";
 import straw from "../assets/straw.jpg";
 import labour from "../assets/labour.jpeg";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Sample images - replace with your actual imports
  const rentalItems = [
    {
      id: 1,
      name: 'Tractor',
      image: tractor, // Replace with: tractor
      description: 'Heavy-duty tractors for all farming needs',
      price: '$50/day',
      features: ['GPS Enabled', '200HP Engine', 'Air Conditioned']
    },
    {
      id: 2,
      name: 'Harvester',
      image: harvester, // Replace with: harvester
      description: 'Efficient harvesting equipment',
      price: '$80/day',
      features: ['Auto-Pilot', 'High Capacity', 'Grain Tank']
    },
    {
      id: 3,
      name: "Labour",
      image: labour, // Replace with: labour
      description: 'Skilled agricultural workers',
      price: '$25/day',
      features: ['Experienced', '8hr Shifts', 'Insured']
    },
    {
      id: 4,
      name: 'Farm Tools',
      image: tools, // Replace with: tools
      description: 'Essential farming tools and equipment',
      price: '$15/day',
      features: ['Complete Set', 'Maintained', 'Portable']
    },
    {
      id: 5,
      name: 'Agricultural Land',
      image: land, // Replace with: land
      description: 'Fertile land for farming projects',
      price: '$100/month',
      features: ['Irrigated', 'Fertile Soil', 'Road Access']
    },
    {
      id: 6,
      name: 'Straw & Feed',
      image: straw, // Replace with: straw
      description: 'Quality straw and animal feed',
      price: '$20/ton',
      features: ['Organic', 'Fresh Stock', 'Bulk Orders']
    }
  ];

  // Responsive cards display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + cardsToShow >= rentalItems.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, rentalItems.length - cardsToShow) : prevIndex - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [cardsToShow]);

  return (
    <div>
      {/* Main Content */}
      <div className="relative z-10 px-4 py-8">
      
        {/* Header Section */}
        <div className="flex justify-center items-center flex-col mt-14 mb-12">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-white/90 text-sm font-semibold mb-4 border border-white/20">
              🚜 Agricultural Equipment Rental
            </span>
            <h1 className="font-extrabold text-5xl lg:text-6xl mb-6 text-white leading-tight">
              About The Project
              <span className="block text-3xl lg:text-4xl bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent mt-2">
                AgriConnect
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              This AgriConnect website makes farming simpler with AI-powered solutions and easy equipment rental services.
            </p>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="text-white/80 text-sm">
              {currentIndex + 1} - {Math.min(currentIndex + cardsToShow, rentalItems.length)} of {rentalItems.length}
            </div>
            <div className="flex space-x-1">
              {Array.from({ length: Math.ceil(rentalItems.length / cardsToShow) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * cardsToShow)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / cardsToShow) === index 
                      ? 'bg-white w-6' 
                      : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={prevSlide}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300 group"
            >
              <leftArrow className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/30 transition-all duration-300 group"
            >
              <rightArrow className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Rental Items Slider */}
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
              }}
            >
              {rentalItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex-shrink-0 px-4 ${
                    cardsToShow === 1 ? 'w-full' : 
                    cardsToShow === 2 ? 'w-1/2' : 'w-1/3'
                  }`}
                >
                  <div className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    
                    {/* Image Section */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                        {item.name}
                      </h2>
                      <p className="text-white/70 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white/80 mb-2">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="px-2 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/20"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              🌾 Why Choose AgriConnect?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
              We provide comprehensive agricultural solutions with modern equipment, skilled workforce, and AI-powered farming techniques to boost your productivity.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl mb-2">🤖</div>
                <h4 className="font-semibold text-white mb-2">AI-Powered</h4>
                <p className="text-white/70 text-sm">Smart farming solutions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-white mb-2">Fast Delivery</h4>
                <p className="text-white/70 text-sm">Equipment within 24 hours</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className="font-semibold text-white mb-2">Fully Insured</h4>
                <p className="text-white/70 text-sm">Complete coverage included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;