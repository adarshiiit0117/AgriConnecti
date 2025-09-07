import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    services: [
      { name: 'Smart Farming', href: '#smart-farming' },
      { name: 'Equipment Rental', href: '#equipment' },
      { name: 'AI Crop Analysis', href: '#ai-analysis' },
      { name: 'Weather Prediction', href: '#weather' },
      { name: 'Soil Testing', href: '#soil-testing' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Career', href: '#career' },
      { name: 'Contact', href: '#contact' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Documentation', href: '#docs' },
      { name: 'API Reference', href: '#api' },
      { name: 'Community', href: '#community' },
      { name: 'Status Page', href: '#status' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#facebook' },
    { name: 'Twitter', icon: '🐦', href: '#twitter' },
    { name: 'Instagram', icon: '📷', href: '#instagram' },
    { name: 'LinkedIn', icon: '💼', href: '#linkedin' },
    { name: 'YouTube', icon: '📹', href: '#youtube' }
  ];

  const stats = [
    { number: '50K+', label: 'Farmers Served' },
    { number: '500+', label: 'Equipment Types' },
    { number: '15+', label: 'Countries' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <footer className="relative bg-black border-t border-green-500/20">
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-400/5 rounded-full blur-2xl"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(34,197,94) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        
        {/* Stats Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent mb-4">
              🌾 AgriConnect Impact
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Transforming agriculture worldwide with innovative technology solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2 group-hover:from-green-300 group-hover:to-emerald-400 transition-all duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-2xl mr-3 shadow-lg shadow-green-500/30">
                  🌱
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AgriConnect</h2>
                  <p className="text-green-400 text-sm font-medium">Growing Tomorrow</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Revolutionizing agriculture through AI-powered solutions, smart equipment rental, and sustainable farming practices for a greener future.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300 group">
                  <span className="mr-3 group-hover:scale-110 transition-transform duration-300">📍</span>
                  <span>123 Agriculture Valley, Farm City, FC 12345</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300 group">
                  <span className="mr-3 group-hover:scale-110 transition-transform duration-300">📞</span>
                  <span>+1 (555) AGRI-CONNECT</span>
                </div>
                <div className="flex items-center text-gray-300 hover:text-green-400 transition-colors duration-300 group">
                  <span className="mr-3 group-hover:scale-110 transition-transform duration-300">✉️</span>
                  <span>hello@agriconnect.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Our Services
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-all duration-300 text-sm flex items-center group hover:translate-x-2"
                  >
                    <span className="mr-2 text-green-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Company
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-all duration-300 text-sm flex items-center group hover:translate-x-2"
                  >
                    <span className="mr-2 text-green-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              Support
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-all duration-300 text-sm flex items-center group hover:translate-x-2"
                  >
                    <span className="mr-2 text-green-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all duration-300">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-3xl p-8 border border-green-500/30 shadow-2xl shadow-green-500/10 hover:shadow-green-500/20 transition-all duration-500">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">
                📬 Stay Updated with Agricultural Innovation
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Get the latest updates on farming technology, equipment releases, and agricultural trends delivered to your inbox.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-green-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <button
                  onClick={handleNewsletterSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
                >
                  Subscribe
                </button>
              </div>
              
              {subscribed && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-lg text-green-400 text-sm backdrop-blur-sm animate-pulse">
                    <span className="mr-2">✅</span>
                    Thank you for subscribing to AgriConnect updates!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Links & Bottom */}
        <div className="border-t border-green-500/30 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Social Media */}
            <div className="flex items-center gap-6">
              <span className="text-gray-300 text-sm font-medium">Follow Us:</span>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-xl border border-green-500/30 flex items-center justify-center hover:border-green-400/50 transition-all duration-300 hover:scale-110 group shadow-lg hover:shadow-green-500/20"
                    title={social.name}
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform duration-300 filter group-hover:brightness-125">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Awards/Certifications */}
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <div className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300">
                <span>🏆</span>
                <span>Best AgTech 2024</span>
              </div>
              <div className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300">
                <span>🌱</span>
                <span>Eco Certified</span>
              </div>
              <div className="flex items-center gap-2 hover:text-green-400 transition-colors duration-300">
                <span>🛡️</span>
                <span>ISO 9001</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-green-500/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <div>
                <p>&copy; 2024 AgriConnect. All rights reserved. Made with 💚 for farmers worldwide.</p>
              </div>
              <div className="flex gap-6">
                <a href="#privacy" className="hover:text-green-400 transition-colors duration-300 hover:underline">Privacy Policy</a>
                <a href="#terms" className="hover:text-green-400 transition-colors duration-300 hover:underline">Terms of Service</a>
                <a href="#cookies" className="hover:text-green-400 transition-colors duration-300 hover:underline">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-full shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 z-50 backdrop-blur-sm border border-green-500/30"
        title="Back to Top"
      >
        <span className="text-xl font-bold">↑</span>
      </button>
    </footer>
  );
};

export default Footer;