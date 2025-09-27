import React from 'react';
import { Button } from './ui/button';
import { Youtube, Facebook, Instagram, MessageCircle, ExternalLink, Radio } from 'lucide-react';
import { socialLinks } from '../mock';

const SocialMediaLinks = ({ showJoinButton = true, isYouTubeLive = false }) => {
  const socialMedia = [
    { 
      icon: Youtube, 
      name: 'YouTube', 
      url: socialLinks.youtube, 
      color: 'bg-red-600 hover:bg-red-700',
      isLive: isYouTubeLive
    },
    { 
      icon: Facebook, 
      name: 'Facebook', 
      url: socialLinks.facebook, 
      color: 'bg-blue-600 hover:bg-blue-700' 
    },
    { 
      icon: Instagram, 
      name: 'Instagram', 
      url: socialLinks.instagram, 
      color: 'bg-pink-600 hover:bg-pink-700' 
    },
    { 
      icon: MessageCircle, 
      name: 'WhatsApp', 
      url: socialLinks.whatsapp, 
      color: 'bg-green-600 hover:bg-green-700' 
    }
  ];

  const handleSocialClick = (social) => {
    if (social.url && social.url !== '#') {
      window.open(social.url, '_blank', 'noopener,noreferrer');
    } else {
      // For placeholder links, show a message
      alert(`${social.name} link will be available soon! Please contact us for the latest updates.`);
    }
  };

  if (!showJoinButton) {
    return (
      <div className="flex gap-3">
        {socialMedia.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <Button
              key={index}
              onClick={() => handleSocialClick(social)}
              className={`${social.color} text-white p-3 rounded-full relative`}
              title={social.name}
            >
              <IconComponent size={20} />
              {social.isLive && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full animate-pulse flex items-center gap-1">
                  <Radio size={8} />
                  LIVE
                </div>
              )}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Join Our Community</h3>
      <p className="text-slate-600 mb-6">
        Connect with us on social media for daily inspiration, live services, and ministry updates
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {socialMedia.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <Button
              key={index}
              onClick={() => handleSocialClick(social)}
              className={`${social.color} text-white px-6 py-3 flex items-center gap-3 relative group`}
            >
              <IconComponent size={20} />
              <span>{social.name}</span>
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {social.isLive && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                  <Radio size={10} />
                  LIVE
                </div>
              )}
            </Button>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 mt-4">
        Follow us to stay updated with our global ministry activities and join thousands of believers worldwide
      </p>
    </div>
  );
};

export default SocialMediaLinks;