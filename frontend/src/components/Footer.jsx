import React from 'react';
import { Button } from './ui/button';
import { Heart, MapPin, Phone, Mail, Youtube, Facebook, Instagram, MessageCircle, ArrowUp } from 'lucide-react';
import { ministryInfo, socialLinks } from '../mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Sermons', href: '#sermons' },
    { label: 'Ministries', href: '#ministries' },
    { label: 'Events', href: '#events' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' }
  ];

  const ministryLinks = [
    { label: 'International Missions', href: '#' },
    { label: 'Church Planting', href: '#' },
    { label: 'Bible Education', href: '#' },
    { label: 'Youth Ministry', href: '#' },
    { label: 'Women\'s Ministry', href: '#' },
    { label: 'Prayer Ministry', href: '#' }
  ];

  const supportLinks = [
    { label: 'Donate', href: '#' },
    { label: 'Partner with Us', href: '#' },
    { label: 'Volunteer', href: '#' },
    { label: 'Prayer Requests', href: '#' },
    { label: 'Testimonies', href: '#' },
    { label: 'Ministry Updates', href: '#' }
  ];

  const socialMedia = [
    { icon: Youtube, url: socialLinks.youtube, name: 'YouTube', color: 'hover:text-red-500' },
    { icon: Facebook, url: socialLinks.facebook, name: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Instagram, url: socialLinks.instagram, name: 'Instagram', color: 'hover:text-pink-500' },
    { icon: MessageCircle, url: socialLinks.whatsapp, name: 'WhatsApp', color: 'hover:text-green-500' }
  ];

  return (
    <footer className="bg-slate-900 text-white relative">
      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <ArrowUp size={20} />
      </button>

      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Ministry Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={ministryInfo.logo} 
                alt="WOHI Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-lg font-bold">Word of Hope International</h3>
                <p className="text-amber-400 text-sm">Ministries Worldwide</p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              {ministryInfo.mandate}
            </p>
            
            <div className="bg-blue-800 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-100 italic">
                "Planting and pruning for effective Ministry"
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                <p className="text-slate-300">{ministryInfo.contact.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-amber-400" />
                <p className="text-slate-300">{ministryInfo.contact.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400" />
                <p className="text-slate-300">{ministryInfo.contact.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:bg-amber-400 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="text-xl font-bold mb-6">Our Ministries</h4>
            <ul className="space-y-3">
              {ministryLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:bg-amber-400 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Connect */}
          <div>
            <h4 className="text-xl font-bold mb-6">Support & Connect</h4>
            <ul className="space-y-3 mb-6">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-slate-300 hover:text-amber-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 group-hover:bg-amber-400 transition-colors"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <div className="flex gap-3">
                {socialMedia.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-slate-800 p-3 rounded-full text-slate-300 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-slate-700`}
                      aria-label={social.name}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Donation CTA */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-8 mb-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Support Our Global Mission</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Your generous giving helps us reach the nations with the Gospel of Jesus Christ. Every donation makes an eternal difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8">
              <Heart className="mr-2" size={20} />
              Donate Now
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800">
              Monthly Giving
            </Button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              <p>&copy; 2025 Word of Hope International Ministries Worldwide. All rights reserved.</p>
              <p className="mt-1">Founded by Apostle Sandra Ross & David Murray Ross</p>
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition-colors">Site Map</a>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-slate-800">
            <p className="text-slate-500 text-sm">
              Built with ❤️ for the Kingdom of God | "WINNING SOULS FOR JESUS UNTIL HE COMES"
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;