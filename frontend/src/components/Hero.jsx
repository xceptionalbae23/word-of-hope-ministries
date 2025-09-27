import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Users, Heart, Play, Star } from 'lucide-react';
import { ministryInfo, isYouTubeLive } from '../mock';
import SocialMediaLinks from './SocialMediaLinks';

const Hero = () => {
  const handleJoinCommunity = () => {
    // Scroll to the social media section or show social links
    document.getElementById('leadership')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchLive = () => {
    if (isYouTubeLive) {
      // Open YouTube live stream
      window.open(ministryInfo.contact.youtube, '_blank', 'noopener,noreferrer');
    } else {
      // Navigate to sermons section
      document.getElementById('sermons')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://customer-assets.emergentagent.com/job_gracepath/artifacts/mklr3pn2_WhatsApp%20Image%202025-09-22%20at%2014.34.30.jpeg')`
        }}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/70 to-purple-800/80"></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Star size={Math.random() * 4 + 2} className="text-yellow-300" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content - Left Side */}
          <div className="text-center lg:text-left space-y-8">
            {/* Live Badge */}
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium backdrop-blur-md border ${
              isYouTubeLive 
                ? 'bg-red-500/20 border-red-400/30 text-red-100 animate-pulse' 
                : 'bg-amber-500/20 border-amber-400/30 text-amber-100'
            }`}>
              <div className={`w-3 h-3 rounded-full mr-3 ${
                isYouTubeLive ? 'bg-red-400 animate-pulse' : 'bg-amber-400'
              }`}></div>
              {isYouTubeLive ? 'LIVE NOW on YouTube' : 'Live Streaming Available'}
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-white drop-shadow-2xl">Welcome to </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 drop-shadow-lg animate-pulse">
                  WOHI Ministries
                </span>
              </h1>
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-yellow-200 drop-shadow-lg">
                Worldwide Canada
              </h2>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <p className="text-xl lg:text-2xl text-white/90 drop-shadow-md font-light">
                {ministryInfo.tagline}
              </p>
              
              <p className="text-lg text-yellow-100/80 drop-shadow-md">
                In Collaboration With Life-Giving Word Mission Nigeria
              </p>
            </div>

            {/* Mission Statement */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
                <div className="text-center">
                  <p className="text-xl lg:text-2xl font-bold text-white mb-2">
                    "{ministryInfo.mandate}"
                  </p>
                  <p className="text-yellow-200 font-medium">Matthew 28:19-20</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                onClick={handleJoinCommunity}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl border border-white/20 backdrop-blur-md transform hover:scale-105 transition-all duration-300"
              >
                <Users className="mr-3" size={24} />
                Join Our Community
                <ArrowRight className="ml-3" size={24} />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleWatchLive}
                className={`border-2 backdrop-blur-md px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  isYouTubeLive 
                    ? 'border-red-400/50 bg-red-500/20 text-red-100 hover:bg-red-500/30' 
                    : 'border-amber-400/50 bg-amber-500/20 text-amber-100 hover:bg-amber-500/30'
                }`}
              >
                <Play className="mr-3" size={24} />
                {isYouTubeLive ? 'Watch Live Now' : 'Watch Services'}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                  <p className="text-4xl font-bold text-yellow-300 drop-shadow-lg mb-2">8</p>
                  <p className="text-sm text-white/80 font-medium">Countries Reached</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                  <p className="text-4xl font-bold text-yellow-300 drop-shadow-lg mb-2">25+</p>
                  <p className="text-sm text-white/80 font-medium">Years Ministry</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                  <p className="text-4xl font-bold text-yellow-300 drop-shadow-lg mb-2">1000+</p>
                  <p className="text-sm text-white/80 font-medium">Lives Transformed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Showcase - Right Side */}
          <div className="relative">
            {/* Main Leadership Card */}
            <div className="relative">
              {/* Apostle Sandra Ross - Featured */}
              <div className="relative bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-3 rounded-full shadow-xl">
                  <Star size={24} className="animate-pulse" />
                </div>
                
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={ministryInfo.leadership[0].image}
                      alt="Apostle Sandra Ross"
                      className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-2xl leadership-photo-president border-4 border-white/30"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                      President & Founder
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{ministryInfo.leadership[0].name}</h3>
                  <p className="text-yellow-200 font-semibold mb-3">Leading missions worldwide since 1996</p>
                  <div className="flex justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Supporting Leadership Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {/* Co-Founder David */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <img
                    src={ministryInfo.leadership[2].image}
                    alt="David Murray Ross"
                    className="w-full h-24 object-cover rounded-lg mb-3 border-2 border-white/20"
                  />
                  <div className="text-center text-white">
                    <h4 className="text-lg font-bold mb-1">{ministryInfo.leadership[2].name}</h4>
                    <p className="text-yellow-200 text-sm font-medium">{ministryInfo.leadership[2].title}</p>
                  </div>
                </div>
                
                {/* Vice President */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-all duration-300">
                  <img
                    src={ministryInfo.leadership[1].image}
                    alt="Bishop Elect Dr. Lawyer Isiwekpeni Ekpaah, PhD"
                    className="w-full h-24 object-cover rounded-lg mb-3 leadership-photo-vice-president border-2 border-white/20"
                  />
                  <div className="text-center text-white">
                    <h4 className="text-lg font-bold mb-1">Bishop Elect Dr. Lawyer</h4>
                    <p className="text-yellow-200 text-sm font-medium">Vice President</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-2xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;