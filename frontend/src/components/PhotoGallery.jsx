import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

const PhotoGallery = ({ country, photos, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || !photos || photos.length === 0) return null;

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-800" size={24} />
            <div>
              <h3 className="text-2xl font-bold text-slate-800">{country} Ministry Gallery</h3>
              <p className="text-slate-600">Photo {currentIndex + 1} of {photos.length}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-800"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Photo Display */}
        <div className="relative">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="w-full h-96 object-cover"
          />
          
          {/* Navigation Buttons */}
          {photos.length > 1 && (
            <>
              <Button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-slate-800 rounded-full p-2"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-slate-800 rounded-full p-2"
              >
                <ChevronRight size={20} />
              </Button>
            </>
          )}

          {/* Photo indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Photo Info */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="outline" className="text-blue-800 border-blue-200">
              <Calendar size={14} className="mr-1" />
              {currentPhoto.date}
            </Badge>
            <Badge variant="outline" className="text-green-800 border-green-200">
              {currentPhoto.location}
            </Badge>
          </div>
          <h4 className="text-xl font-bold text-slate-800 mb-2">{currentPhoto.title}</h4>
          <p className="text-slate-600">{currentPhoto.description}</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;