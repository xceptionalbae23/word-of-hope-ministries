import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Quote, Star, MapPin } from 'lucide-react';
import { ministryInfo } from '../mock';

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-800 border-blue-200">
            Testimonials
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Lives{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
              Transformed
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hear from those whose lives have been touched by God's love through our ministry
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ministryInfo.testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white border-none relative overflow-hidden"
            >
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 text-blue-100">
                <Quote size={32} />
              </div>
              
              <CardContent className="p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-current" size={16} />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="text-slate-600 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Person info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-slate-500 flex items-center">
                      <MapPin size={12} className="mr-1" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-8">
          <Card className="text-center shadow-lg border-none bg-white">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-blue-800 mb-2">1000+</div>
              <p className="text-slate-600">Lives Transformed</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg border-none bg-white">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-amber-600 mb-2">10+</div>
              <p className="text-slate-600">Churches Planted</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg border-none bg-white">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">5+</div>
              <p className="text-slate-600">Countries Reached</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-lg border-none bg-white">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <p className="text-slate-600">Years of Ministry</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;