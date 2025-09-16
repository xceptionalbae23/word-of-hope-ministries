import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { ministryInfo, servicesTimes } from '../mock';

const Events = () => {
  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' })
    };
  };

  return (
    <section id="events" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-800 border-blue-200">
            Events & Services
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Join Us in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
              Fellowship
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Come together in worship, learning, and service as we build God's kingdom worldwide
          </p>
        </div>

        {/* Service Times */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-8">Regular Service Times</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {servicesTimes.map((service, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-600">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="text-blue-800" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{service.day}</h4>
                  <p className="text-amber-600 font-medium mb-2">{service.service}</p>
                  <p className="text-slate-600 mb-1">{service.time}</p>
                  <p className="text-sm text-slate-500">{service.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;