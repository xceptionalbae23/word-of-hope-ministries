import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, Heart, Play, Calendar, Phone } from 'lucide-react';
import { ministryInfo } from '../mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Sermons', href: '#sermons' },
    { label: 'Ministries', href: '#ministries' },
    { label: 'Events', href: '#events' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="border-b border-gray-100 py-2 hidden md:block">
          <div className="flex justify-between items-center text-sm text-slate-600">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Phone size={14} className="mr-1" />
                {ministryInfo.contact.phone}
              </span>
              <span>{ministryInfo.contact.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
              >
                <Heart size={14} className="mr-1" />
                Donate
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <Play size={14} className="mr-1" />
                Watch Live
              </Button>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src={ministryInfo.logo} 
                alt="WOHI Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">
                  {ministryInfo.name}
                </h1>
                <p className="text-xs text-amber-600 font-medium">
                  In Collaboration With Life-Giving Word Mission Nigeria
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-slate-700 hover:text-amber-600 font-medium transition duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="lg:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 bg-white">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={toggleMenu}
                  className="text-slate-700 hover:text-amber-600 font-medium transition duration-300 py-2"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Heart size={14} className="mr-1" />
                  Donate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <Play size={14} className="mr-1" />
                  Watch Live
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;