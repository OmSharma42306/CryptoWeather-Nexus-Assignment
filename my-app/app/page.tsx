"use client"
import React from 'react';
import { Bitcoin, Cloud, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Bitcoin className="w-12 h-12 text-yellow-500" />
            <Cloud className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            CryptoWeather Nexus
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Your all-in-one dashboard for real-time cryptocurrency insights and global weather updates.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            title="Real-Time Crypto Tracking"
            description="Live updates on Bitcoin, Ethereum, and more with instant price notifications."
            image="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=400"
          />
          <FeatureCard 
            title="Global Weather Monitoring"
            description="Track weather conditions across major cities worldwide with detailed forecasts."
            image="https://images.unsplash.com/photo-1561484930-998b6a7b22e8?auto=format&fit=crop&w=400"
          />
          <FeatureCard 
            title="Crypto News Feed"
            description="Stay informed with the latest cryptocurrency news and market trends."
            image="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400"
          />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button 
            onClick={() => window.location.href = '/dashboard'}
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, image }:{title:any, description:any, image:any}) {
  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-200">
      <img 
        src={image} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  );
}

