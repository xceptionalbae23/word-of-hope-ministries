import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Calendar as CalendarIcon, Clock, MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { ministryInfo, servicesTimes } from '../mock';

const Events = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

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

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Calendar */}
          <div>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Event Calendar</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-none"
                />
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'Select a date'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Upcoming Events</h3>
            <div className="space-y-6">
              {ministryInfo.upcomingEvents.map((event) => {
                const eventDate = formatEventDate(event.date);
                return (
                  <Card key={event.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Date Display */}
                        <div className="bg-blue-800 text-white p-4 rounded-lg text-center min-w-[80px]">
                          <p className="text-2xl font-bold">{eventDate.day}</p>
                          <p className="text-sm">{eventDate.month}</p>
                        </div>
                        
                        {/* Event Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-xl font-bold text-slate-800">{event.title}</h4>
                            {event.id === 2 && (
                              <Badge className="bg-amber-500 text-white">Featured</Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-3">
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {event.time}
                            </span>
                            <span className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {event.location}
                            </span>
                            <span className="flex items-center">
                              <CalendarIcon size={14} className="mr-1" />
                              {eventDate.weekday}
                            </span>
                          </div>
                          
                          <p className="text-slate-600 mb-4">{event.description}</p>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-blue-800 hover:bg-blue-900">
                              <Users className="mr-1" size={14} />
                              Register
                            </Button>
                            <Button variant="outline" size="sm" className="text-slate-600">
                              <ExternalLink className="mr-1" size={14} />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
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

        {/* Special Event Highlight */}
        <Card className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-2xl">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="secondary" className="bg-amber-500 text-white mb-4">
                  Special Event
                </Badge>
                <h3 className="text-3xl font-bold mb-4">Leadership Conference 2025</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Join us October 15-18, 2025 for "Raising Leaders for Global Impact" - A powerful conference featuring international speakers and ministry leaders.
                </p>
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-400">15-18</p>
                    <p className="text-blue-200 text-sm">October 2025</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-400">4</p>
                    <p className="text-blue-200 text-sm">Days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-400">Global</p>
                    <p className="text-blue-200 text-sm">Speakers</p>
                  </div>
                </div>
                <Button className="bg-white text-blue-800 hover:bg-blue-50">
                  <Users className="mr-2" size={20} />
                  Register Now
                </Button>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-10 rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-4">Guest Speakers Include:</h4>
                  <div className="space-y-2 text-blue-100">
                    <p>• Apostle Sandra Ross (Canada)</p>
                    <p>• Bishop Elect Dr. Law Isiwekpeni Ekpaah (Nigeria)</p>
                    <p>• Apostle Lambert Iku (United Kingdom)</p>
                    <p>• Pastor Darlington Okoro (Nigeria)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Events;