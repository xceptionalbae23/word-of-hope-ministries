import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Crown, Users, Globe } from 'lucide-react';
import { ministryInfo } from '../mock';

const Leadership = () => {
  return (
    <section id="leadership" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-800 border-blue-200">
            Our Leadership
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Called to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
              Lead & Serve
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Meet the dedicated leaders who are committed to fulfilling the Great Commission worldwide
          </p>
        </div>

        {/* Executive Leadership */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-12">Executive Leadership</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryInfo.leadership.map((leader, index) => (
              <Card 
                key={index} 
                className="shadow-lg hover:shadow-xl transition-all duration-300 group border-l-4 border-l-blue-600"
              >
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-2 rounded-full">
                        <Crown size={16} />
                      </div>
                    )}
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-800 transition-colors">
                    {leader.name}
                  </h4>
                  
                  <p className="text-amber-600 font-medium mb-3">{leader.title}</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-500">{leader.country}</span>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {leader.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Representatives */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-12">Global Representatives</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministryInfo.representatives.map((rep, index) => (
              <Card 
                key={index} 
                className="shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={rep.image}
                      alt={rep.name}
                      className="w-28 h-28 rounded-full mx-auto object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white px-3 py-1 rounded-full text-xs">
                      {rep.membershipId}
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-800 transition-colors">
                    {rep.name}
                  </h4>
                  
                  <p className="text-amber-600 font-medium text-sm mb-3">{rep.title}</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-500">{rep.country}</span>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600">
                      Coordinating ministry operations and church planting activities in {rep.country}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ministry Reach */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Global Ministry Reach</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {ministryInfo.countries.map((country, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="text-blue-800" size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800">{country}</h4>
                  <p className="text-sm text-slate-500">Active Ministry</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-blue-800 to-blue-900 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              "We are servants before we become leaders. Leaders are servants. Our commitment is to raise up a people totally dedicated to Jesus and to fulfill the call of Christ worldwide."
            </p>
            <div className="flex justify-center items-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">6+</div>
                <div className="text-blue-200 text-sm">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">6</div>
                <div className="text-blue-200 text-sm">Leaders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">1</div>
                <div className="text-blue-200 text-sm">Mission</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;