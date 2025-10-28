import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Calendar, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { ministryInfo } from '../mock';

const Sermons = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Sermons' },
    { id: 'recent', label: 'Recent' },
    { id: 'missions', label: 'Missions' },
    { id: 'faith', label: 'Faith Building' }
  ];

  return (
    <section id="sermons" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-800 border-blue-200">
            Sermons & Media
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Messages of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
              Hope & Truth
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience powerful messages that will strengthen your faith and equip you for ministry
          </p>
        </div>

        {/* Featured Sermon */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <Badge variant="secondary" className="bg-amber-500 text-white mb-4">
                    Featured Message
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4">
                    {ministryInfo.sermons[0].title}
                  </h3>
                  <div className="flex items-center gap-4 mb-6 text-blue-200">
                    <span className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(ministryInfo.sermons[0].date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {ministryInfo.sermons[0].duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen size={16} className="mr-1" />
                      {ministryInfo.sermons[0].scripture}
                    </span>
                  </div>
                  <p className="text-blue-100 mb-8 text-lg">
                    Discover God's calling for your life and learn how to fulfill the Great Commission in today's world.
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-800 hover:bg-blue-50"
                    >
                      <Play className="mr-2" size={20} />
                      Watch Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:text-blue-800"
                    >
                      Download Audio
                    </Button>
                  </div>
                </div>
                <div className="relative bg-blue-700 flex items-center justify-center p-8">
                  <div className="bg-white bg-opacity-10 rounded-2xl p-8 text-center">
                    <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="text-white" size={32} />
                    </div>
                    <p className="text-blue-200 mb-2">Speaker</p>
                    <p className="text-white font-bold text-lg">{ministryInfo.sermons[0].speaker}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`${
                activeFilter === filter.id 
                  ? "bg-blue-800 text-white hover:bg-blue-900" 
                  : "text-slate-600 hover:text-blue-800"
              } transition-colors duration-300`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Sermon Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ministryInfo.sermons.map((sermon) => (
            <Card key={sermon.id} className="shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 h-48 flex items-center justify-center">
                    <div className="bg-white bg-opacity-10 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="text-white" size={32} />
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-amber-500 text-white">
                    New
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-800 transition-colors">
                    {sermon.title}
                  </h4>
                  
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-4">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(sermon.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {sermon.duration}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-4">Speaker: {sermon.speaker}</p>
                  <p className="text-blue-800 font-medium mb-4">{sermon.scripture}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-800 hover:bg-blue-900 flex-1"
                    >
                      <Play className="mr-1" size={14} />
                      Watch
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-slate-600 hover:text-blue-800"
                    >
                      Audio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Streaming Section */}
        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-500 w-3 h-3 rounded-full animate-pulse mr-2"></div>
              <Badge variant="destructive" className="bg-red-500">Live Streaming</Badge>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Join Our Live Services</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Experience worship and receive the Word of God in real-time. Our services are streamed live every Sunday and Wednesday.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <Play className="mr-2" size={20} />
                Watch Live on YouTube
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                View All Messages
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Sermons;