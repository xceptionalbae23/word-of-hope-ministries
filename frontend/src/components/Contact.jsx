import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Youtube, Facebook, Instagram } from 'lucide-react';
import { ministryInfo, socialLinks, servicesTimes } from '../mock';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    requestType: 'general'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      requestType: 'general'
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      content: ministryInfo.contact.address,
      subContent: 'International Headquarters'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      content: ministryInfo.contact.phone,
      subContent: 'Available during office hours'
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: ministryInfo.contact.email,
      subContent: 'We respond within 24 hours'
    }
  ];

  const socialMedia = [
    { icon: Youtube, name: 'YouTube', url: socialLinks.youtube, color: 'text-red-600' },
    { icon: Facebook, name: 'Facebook', url: socialLinks.facebook, color: 'text-blue-600' },
    { icon: Instagram, name: 'Instagram', url: socialLinks.instagram, color: 'text-pink-600' },
    { icon: MessageCircle, name: 'WhatsApp', url: socialLinks.whatsapp, color: 'text-green-600' }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-blue-800 border-blue-200">
            Get In Touch
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Connect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-amber-600">
              With Us
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out for prayer, partnership, or to learn more about our ministry
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Request Type
                  </label>
                  <select
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="partnership">Ministry Partnership</option>
                    <option value="missions">Missions Support</option>
                    <option value="education">Bible Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Please share your message, prayer request, or inquiry..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white"
                >
                  <Send className="mr-2" size={20} />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="text-blue-800" size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-slate-800 mb-2">{info.title}</h4>
                          <p className="text-slate-600 mb-1">{info.content}</p>
                          <p className="text-sm text-slate-500">{info.subContent}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Service Times */}
            <Card className="shadow-lg border-l-4 border-l-amber-600">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-amber-600" size={24} />
                  <h4 className="text-lg font-bold text-slate-800">Service Times</h4>
                </div>
                <div className="space-y-3">
                  {servicesTimes.map((service, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-slate-800">{service.day} - {service.service}</p>
                        <p className="text-sm text-slate-500">{service.location}</p>
                      </div>
                      <p className="text-blue-800 font-medium">{service.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-slate-800 mb-4">Follow Us</h4>
                <div className="grid grid-cols-2 gap-4">
                  {socialMedia.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-300"
                      >
                        <IconComponent className={`${social.color}`} size={20} />
                        <span className="text-sm font-medium text-slate-700">{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-100 to-slate-100 h-64 lg:h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-blue-800 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Our Location</h3>
                <p className="text-slate-600">{ministryInfo.contact.address}</p>
                <Button className="mt-4 bg-blue-800 hover:bg-blue-900">
                  View on Google Maps
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;