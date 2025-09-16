import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Globe, Church, BookOpen, Users, Heart, HandHeart, ArrowRight } from 'lucide-react';
import { ministryInfo } from '../mock';

const Ministries = () => {
  const iconMap = {
    Globe,
    Church,
    Book: BookOpen,
    Users,
    Heart,
    HandHeart
  };

  return (
    <section id="ministries" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-800 border-blue-200">
            Our Ministries
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Serving{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
              God's Kingdom
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Through diverse ministries, we reach every heart and transform every life for the glory of God
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {ministryInfo.ministries.map((ministry) => {
            const IconComponent = iconMap[ministry.icon] || Globe;
            return (
              <Card 
                key={ministry.id} 
                className="shadow-lg hover:shadow-xl transition-all duration-300 group border-l-4 border-l-blue-600 hover:border-l-amber-600"
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-blue-100 group-hover:bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                    <IconComponent className="text-blue-800 group-hover:text-amber-600 transition-colors duration-300" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-800 transition-colors">
                    {ministry.name}
                  </h3>
                  <p className="text-slate-600 mb-6">{ministry.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group-hover:bg-blue-800 group-hover:text-white group-hover:border-blue-800 transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2" size={14} />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Ministry Spotlight */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-gradient-to-br from-blue-800 to-blue-900 text-white shadow-2xl">
            <CardContent className="p-8">
              <Badge variant="secondary" className="bg-amber-500 text-white mb-4">
                Ministry Spotlight
              </Badge>
              <h3 className="text-3xl font-bold mb-4">International Missions</h3>
              <p className="text-blue-100 mb-6 text-lg">
                Our heart beats for the nations. From India to Nigeria, Kenya to Pakistan, we're taking the Gospel to the ends of the earth.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">5+</p>
                  <p className="text-blue-200 text-sm">Countries Reached</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">10+</p>
                  <p className="text-blue-200 text-sm">Churches Planted</p>
                </div>
              </div>
              <Button className="bg-white text-blue-800 hover:bg-blue-50">
                <Globe className="mr-2" size={20} />
                Support Missions
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Bible Education & Training</h3>
              <p className="text-slate-600 mb-6">
                Equipping saints for the work of ministry through comprehensive Bible education and practical ministry training.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700">Minister Training & Ordination</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700">Non-Profit Bible Schools</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700">Leadership Development</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-slate-700">Missionary Preparation</span>
                </div>
              </div>
              
              <Button className="bg-blue-800 hover:bg-blue-900 text-white">
                <BookOpen className="mr-2" size={20} />
                Enroll Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Called to Serve?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              God is calling laborers into His harvest field. Whether locally or internationally, there's a place for you in God's ministry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Heart className="mr-2" size={20} />
                Get Involved
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Ministry Partnership
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Ministries;