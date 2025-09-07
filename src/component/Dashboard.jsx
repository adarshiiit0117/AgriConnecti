

import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import About from "./About";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
  import { useNavigate } from 'react-router-dom';
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1dd1a1] to-[#48dbfb] bg-fixed bg-cover">

      


      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <motion.div
          className="text-center py-20 px-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-6xl font-bold text-white mb-6">
            Smart Agriculture
            <span className="block text-4xl bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
              Growing Tomorrow
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Revolutionizing farming with AI-powered solutions, sustainable
            practices, and modern technology
          </p>
          <div className="flex gap-4 justify-center">
            <motion.button
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
 onClick={()=>navigate("/signup")} >
              Start Farming Smart
            </motion.button>
            <motion.button
              className="border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Agriculture Stats */}
        <motion.div
          className="px-6 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "👥", value: "50K+", label: "Farmers", color: "bg-green-400" },
              { icon: "🌾", value: "500+", label: "Crop Types", color: "bg-yellow-400" },
              { icon: "🌍", value: "15+", label: "Countries", color: "bg-blue-400" },
              { icon: "🏆", value: "25+", label: "Awards", color: "bg-purple-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
              >
                <div
                  className={`w-8 h-8 ${stat.color} rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold`}
                >
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="px-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-12"
              variants={fadeInUp}
            >
              Our Agricultural Solutions
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🌱",
                  title: "Smart Farming",
                  desc: "AI-powered crop monitoring, precision agriculture, and automated farming solutions for maximum yield.",
                  color: "bg-green-400",
                },
                {
                  icon: "💧",
                  title: "Water Management",
                  desc: "Efficient irrigation systems, soil moisture monitoring, and water conservation techniques.",
                  color: "bg-blue-400",
                },
                {
                  icon: "🌾",
                  title: "Crop Analytics",
                  desc: "Real-time crop health analysis, yield prediction, and harvest optimization strategies.",
                  color: "bg-yellow-400",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 ${feature.color} rounded-xl mb-4 flex items-center justify-center text-2xl`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="px-6 pb-20"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Farm? 🌾
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of farmers who are already using our smart
                agriculture solutions to increase yields and reduce costs.
              </p>
              <motion.button
                className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <About />
        </motion.div>

        {/* Testimonial */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Testimonial />
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
