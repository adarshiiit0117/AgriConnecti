import React from "react";
import { Outlet } from "react-router-dom";
const Layout = ({ children }) => {
  return (
<div className="min-h-screen relative overflow-hidden">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-black"></div>
      
      {/* Animated Liquid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 via-emerald-500/20 to-teal-600/30 animate-liquid-flow"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/20 via-transparent to-green-400/25 animate-liquid-reverse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/15 to-orange-500/10 animate-liquid-diagonal"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/15 via-transparent to-yellow-500/20 animate-liquid-wave"></div>
      </div>
      
      {/* Morphing Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-blob-morph"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-green-500/25 rounded-full blur-3xl animate-blob-float"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-teal-400/15 rounded-full blur-3xl animate-blob-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl animate-blob-drift"></div>
        <div className="absolute bottom-1/3 right-10 w-56 h-56 bg-lime-400/18 rounded-full blur-3xl animate-blob-wave"></div>
        <div className="absolute top-20 left-1/2 w-88 h-88 bg-purple-400/12 rounded-full blur-3xl animate-blob-spiral"></div>
        <div className="absolute bottom-40 right-1/2 w-76 h-76 bg-pink-400/15 rounded-full blur-3xl animate-blob-orbit"></div>
        <div className="absolute top-3/4 left-20 w-60 h-60 bg-indigo-400/18 rounded-full blur-3xl animate-blob-elastic"></div>
      </div>
      
      {/* Hexagon Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="10" height="8.66" patternUnits="userSpaceOnUse">
              <polygon points="5,0 9.33,2.5 9.33,7.5 5,10 0.67,7.5 0.67,2.5" fill="none" stroke="white" strokeWidth="0.2" className="animate-hex-pulse"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" className="animate-hex-shift"/>
        </svg>
      </div>
      
      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`geo-${i}`}
            className="absolute animate-geometric-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          >
            <div className={`w-${2 + Math.floor(Math.random() * 3)} h-${2 + Math.floor(Math.random() * 3)} ${
              Math.random() > 0.5 ? 'rounded-full' : ''
            } bg-white/20 backdrop-blur-sm border border-white/10`}></div>
          </div>
        ))}
      </div>
      
      {/* Neural Network Animation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
            </linearGradient>
          </defs>
          
          {/* Neural nodes */}
          <circle cx="200" cy="200" r="6" fill="url(#nodeGradient)" className="animate-neural-pulse"/>
          <circle cx="400" cy="150" r="8" fill="url(#nodeGradient)" className="animate-neural-pulse" style={{animationDelay: '0.5s'}}/>
          <circle cx="600" cy="300" r="5" fill="url(#nodeGradient)" className="animate-neural-pulse" style={{animationDelay: '1s'}}/>
          <circle cx="800" cy="200" r="7" fill="url(#nodeGradient)" className="animate-neural-pulse" style={{animationDelay: '1.5s'}}/>
          <circle cx="300" cy="400" r="6" fill="url(#nodeGradient)" className="animate-neural-pulse" style={{animationDelay: '2s'}}/>
          <circle cx="700" cy="500" r="9" fill="url(#nodeGradient)" className="animate-neural-pulse" style={{animationDelay: '2.5s'}}/>
          <circle cx="150" cy="600" r="4" fill="url(#nodeGradient)" className="animate-neural-pulse" style={{animationDelay: '3s'}}/>
          <circle cx="500" cy="700" r="7" fill="url(#nodeGradient)" className="animate-neural-pulse" style={{animationDelay: '0.3s'}}/>
          <circle cx="850" cy="650" r="6" fill="url(#nodeGradient)" className="animate-neural-pulse" style={{animationDelay: '1.8s'}}/>
          
          {/* Synaptic connections */}
          <line x1="200" y1="200" x2="400" y2="150" stroke="url(#synapseGradient)" strokeWidth="2" className="animate-synapse-fire"/>
          <line x1="400" y1="150" x2="600" y2="300" stroke="url(#synapseGradient)" strokeWidth="2" className="animate-synapse-fire" style={{animationDelay: '1s'}}/>
          <line x1="600" y1="300" x2="800" y2="200" stroke="url(#synapseGradient)" strokeWidth="2" className="animate-synapse-fire" style={{animationDelay: '2s'}}/>
          <line x1="300" y1="400" x2="700" y2="500" stroke="url(#synapseGradient)" strokeWidth="2" className="animate-synapse-fire" style={{animationDelay: '0.5s'}}/>
          <line x1="150" y1="600" x2="500" y2="700" stroke="url(#synapseGradient)" strokeWidth="2" className="animate-synapse-fire" style={{animationDelay: '1.5s'}}/>
          <line x1="500" y1="700" x2="850" y2="650" stroke="url(#synapseGradient)" strokeWidth="2" className="animate-synapse-fire" style={{animationDelay: '2.5s'}}/>
          <line x1="200" y1="200" x2="300" y2="400" stroke="url(#synapseGradient)" strokeWidth="1.5" className="animate-synapse-fire" style={{animationDelay: '3s'}}/>
          <line x1="800" y1="200" x2="700" y2="500" stroke="url(#synapseGradient)" strokeWidth="1.5" className="animate-synapse-fire" style={{animationDelay: '0.8s'}}/>
        </svg>
      </div>
      
      {/* Advanced Particle System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing particles */}
        {[...Array(80)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute bg-emerald-300/60 rounded-full animate-particle-flow"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              boxShadow: `0 0 ${2 + Math.random() * 4}px currentColor`
            }}
          ></div>
        ))}
        
        {/* Constellation connections */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`constellation-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-constellation-pulse"
            style={{
              width: `${100 + Math.random() * 300}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          ></div>
        ))}
        
        {/* Firefly effects */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`firefly-${i}`}
            className="absolute w-2 h-2 bg-yellow-300/80 rounded-full animate-firefly-dance"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
              filter: `blur(${Math.random() * 2}px)`,
              boxShadow: '0 0 8px currentColor'
            }}
          ></div>
        ))}
      </div>
      
      {/* Energy Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-energy-wave"></div>
        <div className="absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-cyan-400/50 to-transparent animate-energy-wave-reverse"></div>
        <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/40 to-transparent animate-energy-wave-delayed"></div>
      </div>
      
      {/* Circuit Board Lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981"/>
              <stop offset="50%" stopColor="#06b6d4"/>
              <stop offset="100%" stopColor="#84cc16"/>
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          <line x1="0" y1="200" x2="1000" y2="250" stroke="url(#circuitGradient)" strokeWidth="2" className="animate-circuit-pulse"/>
          <line x1="0" y1="400" x2="1000" y2="380" stroke="url(#circuitGradient)" strokeWidth="1.5" className="animate-circuit-pulse" style={{animationDelay: '1s'}}/>
          <line x1="0" y1="600" x2="1000" y2="650" stroke="url(#circuitGradient)" strokeWidth="2" className="animate-circuit-pulse" style={{animationDelay: '2s'}}/>
          <line x1="0" y1="800" x2="1000" y2="750" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-circuit-pulse" style={{animationDelay: '0.5s'}}/>
          
          {/* Vertical lines */}
          <line x1="200" y1="0" x2="250" y2="1000" stroke="url(#circuitGradient)" strokeWidth="1.5" className="animate-circuit-pulse" style={{animationDelay: '1.5s'}}/>
          <line x1="500" y1="0" x2="480" y2="1000" stroke="url(#circuitGradient)" strokeWidth="2" className="animate-circuit-pulse" style={{animationDelay: '2.5s'}}/>
          <line x1="800" y1="0" x2="820" y2="1000" stroke="url(#circuitGradient)" strokeWidth="1" className="animate-circuit-pulse" style={{animationDelay: '3s'}}/>
          
          {/* Junction nodes */}
          <circle cx="200" cy="250" r="4" fill="#10b981" className="animate-node-pulse"/>
          <circle cx="500" cy="400" r="6" fill="#06b6d4" className="animate-node-pulse" style={{animationDelay: '1s'}}/>
          <circle cx="800" cy="650" r="5" fill="#84cc16" className="animate-node-pulse" style={{animationDelay: '2s'}}/>
        </svg>
      </div>
      
      {/* Ambient Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-2 h-full bg-gradient-to-b from-emerald-300/40 via-emerald-400/20 to-transparent transform -rotate-12 animate-light-sweep"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-cyan-300/30 via-cyan-400/15 to-transparent transform rotate-12 animate-light-sweep-reverse"></div>
        <div className="absolute top-0 left-2/3 w-1.5 h-full bg-gradient-to-b from-green-300/35 via-green-400/18 to-transparent animate-light-sweep-delayed"></div>
      </div>
      
      {/* Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl animate-glow-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-green-400/8 rounded-full blur-2xl animate-glow-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <style jsx>{`
        @keyframes liquid-flow {
          0% { transform: scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 0.6; }
          100% { transform: scale(1) rotate(360deg); opacity: 0.3; }
        }
        @keyframes liquid-reverse {
          0% { transform: scale(1.1) rotate(360deg); opacity: 0.4; }
          50% { transform: scale(0.9) rotate(180deg); opacity: 0.7; }
          100% { transform: scale(1.1) rotate(0deg); opacity: 0.4; }
        }
        @keyframes blob-morph {
          0%, 100% { transform: scale(1) skew(0deg) rotate(0deg); }
          25% { transform: scale(1.2) skew(5deg) rotate(90deg); }
          50% { transform: scale(0.8) skew(-3deg) rotate(180deg); }
          75% { transform: scale(1.1) skew(2deg) rotate(270deg); }
        }
        @keyframes blob-float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(-30px) translateX(20px) scale(1.1); }
          66% { transform: translateY(20px) translateX(-15px) scale(0.9); }
        }
        @keyframes blob-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.15; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 0.25; }
        }
        @keyframes blob-drift {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(40px, -20px) rotate(90deg) scale(1.1); }
          50% { transform: translate(-30px, 30px) rotate(180deg) scale(0.9); }
          75% { transform: translate(20px, -40px) rotate(270deg) scale(1.05); }
          100% { transform: translate(0, 0) rotate(360deg) scale(1); }
        }
        @keyframes blob-wave {
          0%, 100% { transform: scale(1) skew(0deg); }
          50% { transform: scale(1.2) skew(10deg); }
        }
        @keyframes hex-pulse {
          0%, 100% { stroke-opacity: 0.2; }
          50% { stroke-opacity: 0.6; }
        }
        @keyframes hex-shift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(10px, 8.66px); }
        }
        @keyframes geometric-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.2; }
          25% { transform: translate(30px, -40px) rotate(90deg) scale(1.2); opacity: 0.6; }
          50% { transform: translate(-20px, -20px) rotate(180deg) scale(0.8); opacity: 0.4; }
          75% { transform: translate(-40px, 30px) rotate(270deg) scale(1.1); opacity: 0.8; }
        }
        @keyframes liquid-diagonal {
          0% { transform: scale(0.9) rotate(45deg); opacity: 0.1; }
          50% { transform: scale(1.2) rotate(225deg); opacity: 0.4; }
          100% { transform: scale(0.9) rotate(405deg); opacity: 0.1; }
        }
        @keyframes liquid-wave {
          0% { transform: scale(1.1) skew(10deg) rotate(0deg); opacity: 0.15; }
          50% { transform: scale(0.8) skew(-15deg) rotate(180deg); opacity: 0.35; }
          100% { transform: scale(1.1) skew(10deg) rotate(360deg); opacity: 0.15; }
        }
        @keyframes blob-spiral {
          0% { transform: rotate(0deg) scale(1) translate(0px); }
          25% { transform: rotate(90deg) scale(1.3) translate(30px); }
          50% { transform: rotate(180deg) scale(0.7) translate(0px); }
          75% { transform: rotate(270deg) scale(1.1) translate(-20px); }
          100% { transform: rotate(360deg) scale(1) translate(0px); }
        }
        @keyframes blob-orbit {
          0% { transform: rotate(0deg) translateX(50px) rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) translateX(50px) rotate(-360deg) scale(1.2); }
        }
        @keyframes blob-elastic {
          0%, 100% { transform: scaleX(1) scaleY(1) rotate(0deg); }
          25% { transform: scaleX(1.4) scaleY(0.6) rotate(15deg); }
          50% { transform: scaleX(0.8) scaleY(1.3) rotate(30deg); }
          75% { transform: scaleX(1.2) scaleY(0.8) rotate(45deg); }
        }
        @keyframes constellation-pulse {
          0%, 100% { opacity: 0; transform: scaleX(0.5); }
          50% { opacity: 0.8; transform: scaleX(1); }
        }
        @keyframes firefly-dance {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(40px, -30px) scale(1.5); opacity: 1; }
          50% { transform: translate(-20px, 50px) scale(0.8); opacity: 0.6; }
          75% { transform: translate(60px, 20px) scale(1.2); opacity: 0.9; }
        }
        @keyframes neural-pulse {
          0%, 100% { transform: scale(1); fill-opacity: 0.3; }
          50% { transform: scale(1.8); fill-opacity: 1; }
        }
        @keyframes synapse-fire {
          0% { stroke-dasharray: 0 100; stroke-opacity: 0; }
          50% { stroke-dasharray: 50 50; stroke-opacity: 1; }
          100% { stroke-dasharray: 100 0; stroke-opacity: 0; }
        }
        @keyframes particle-flow {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 0.6; }
          50% { transform: translate(200px, -100px) scale(1.5); opacity: 1; }
          90% { opacity: 0.4; }
          100% { transform: translate(400px, -200px) scale(0.5); opacity: 0; }
        }
        @keyframes energy-wave {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes energy-wave-reverse {
          0% { transform: translateX(100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes energy-wave-delayed {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes circuit-pulse {
          0%, 100% { stroke-opacity: 0.2; }
          50% { stroke-opacity: 0.8; }
        }
        @keyframes node-pulse {
          0%, 100% { transform: scale(1); fill-opacity: 0.5; }
          50% { transform: scale(1.5); fill-opacity: 1; }
        }
        @keyframes light-sweep {
          0% { opacity: 0; transform: translateX(-50px) rotate(-12deg); }
          50% { opacity: 0.6; }
          100% { opacity: 0; transform: translateX(50px) rotate(-12deg); }
        }
        @keyframes light-sweep-reverse {
          0% { opacity: 0; transform: translateX(50px) rotate(12deg); }
          50% { opacity: 0.4; }
          100% { opacity: 0; transform: translateX(-50px) rotate(12deg); }
        }
        @keyframes light-sweep-delayed {
          0% { opacity: 0; transform: translateX(-30px); }
          50% { opacity: 0.5; }
          100% { opacity: 0; transform: translateX(30px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.2); }
        }
        
        .animate-liquid-flow { animation: liquid-flow 20s ease-in-out infinite; }
        .animate-liquid-reverse { animation: liquid-reverse 25s ease-in-out infinite; }
        .animate-blob-morph { animation: blob-morph 15s ease-in-out infinite; }
        .animate-blob-float { animation: blob-float 12s ease-in-out infinite; }
        .animate-blob-pulse { animation: blob-pulse 8s ease-in-out infinite; }
        .animate-blob-drift { animation: blob-drift 18s ease-in-out infinite; }
        .animate-blob-wave { animation: blob-wave 10s ease-in-out infinite; }
        .animate-hex-pulse { animation: hex-pulse 3s ease-in-out infinite; }
        .animate-hex-shift { animation: hex-shift 30s linear infinite; }
        .animate-geometric-float { animation: geometric-float 12s ease-in-out infinite; }
        .animate-liquid-diagonal { animation: liquid-diagonal 18s ease-in-out infinite; }
        .animate-liquid-wave { animation: liquid-wave 22s ease-in-out infinite; }
        .animate-blob-spiral { animation: blob-spiral 16s ease-in-out infinite; }
        .animate-blob-orbit { animation: blob-orbit 14s linear infinite; }
        .animate-blob-elastic { animation: blob-elastic 11s ease-in-out infinite; }
        .animate-constellation-pulse { animation: constellation-pulse 8s ease-in-out infinite; }
        .animate-firefly-dance { animation: firefly-dance 12s ease-in-out infinite; }
        .animate-neural-pulse { animation: neural-pulse 4s ease-in-out infinite; }
        .animate-synapse-fire { animation: synapse-fire 6s ease-in-out infinite; }
        .animate-particle-flow { animation: particle-flow 15s ease-out infinite; }
        .animate-energy-wave { animation: energy-wave 8s linear infinite; }
        .animate-energy-wave-reverse { animation: energy-wave-reverse 10s linear infinite; }
        .animate-energy-wave-delayed { animation: energy-wave-delayed 12s linear infinite; }
        .animate-circuit-pulse { animation: circuit-pulse 4s ease-in-out infinite; }
        .animate-node-pulse { animation: node-pulse 3s ease-in-out infinite; }
        .animate-light-sweep { animation: light-sweep 15s ease-in-out infinite; }
        .animate-light-sweep-reverse { animation: light-sweep-reverse 18s ease-in-out infinite; }
        .animate-light-sweep-delayed { animation: light-sweep-delayed 22s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 6s ease-in-out infinite; }
      `}</style>

  <Outlet />
    </div>

     
  );
};

export default Layout;
