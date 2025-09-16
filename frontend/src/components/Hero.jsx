import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Users, Heart, Play } from 'lucide-react';
import { ministryInfo } from '../mock';

const Hero = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
              Live Streaming Available
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
                WOHI Ministries
              </span>
            </h1>
            
            <h2 className="text-xl lg:text-2xl text-slate-600 mb-4 font-medium">
              Worldwide Canada
            </h2>
            
            <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto lg:mx-0">
              {ministryInfo.tagline}
            </p>

            <p className="text-base text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              In Collaboration With Life-Giving Word Mission Nigeria
            </p>

            <div className="bg-blue-900 text-white px-6 py-4 rounded-lg mb-8 inline-block">
              <p className="text-lg font-bold">
                "{ministryInfo.mandate}"
              </p>
              <p className="text-sm text-blue-200 mt-1">Matthew 28:19-20</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Users className="mr-2" size={20} />
                Join Our Community
                <ArrowRight className="ml-2" size={20} />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2" size={20} />
                Watch Live Service
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Heart className="mr-2" size={20} />
                Support Missions
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-800">6+</p>
                <p className="text-sm text-slate-600">Countries Reached</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">25+</p>
                <p className="text-sm text-slate-600">Years of Ministry</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">1000+</p>
                <p className="text-sm text-slate-600">Lives Transformed</p>
              </div>
            </div>
          </div>

          {/* Leadership Showcase */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Apostle Sandra Ross - Main */}
              <div className="col-span-2 relative bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
                <img
                  src={ministryInfo.leadership[0].image}
                  alt="Apostle Sandra Ross"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-800">{ministryInfo.leadership[0].name}</h3>
                  <p className="text-amber-600 font-medium">{ministryInfo.leadership[0].title}</p>
                  <p className="text-sm text-slate-600 mt-2">
                    Leading missions worldwide since 1996
                  </p>
                </div>
              </div>
              
              {/* Co-Founder David */}
              <div className="relative bg-white rounded-2xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-500">
                <img
                  src={ministryInfo.leadership[2].image}
                  alt="David Murray Ross"
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <div className="text-center">
                  <h4 className="text-lg font-bold text-slate-800">{ministryInfo.leadership[2].name}</h4>
                  <p className="text-amber-600 text-sm font-medium">{ministryInfo.leadership[2].title}</p>
                </div>
              </div>
              
              {/* Vice President */}
              <div className="relative bg-white rounded-2xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-500">
                <img
                  src={ministryInfo.leadership[1].image}
                  alt="Bishop Dr. Lawyer Isiwekpeni Ekpaah"
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <div className="text-center">
                  <h4 className="text-lg font-bold text-slate-800">Bishop Dr. Lawyer</h4>
                  <p className="text-amber-600 text-sm font-medium">Vice President</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 bg-amber-400 text-white p-3 rounded-full shadow-lg animate-bounce">
              <Heart size={24} />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-800 text-white p-3 rounded-full shadow-lg animate-pulse">
              <Users size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;