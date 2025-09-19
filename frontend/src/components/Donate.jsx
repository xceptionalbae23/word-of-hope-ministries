import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, CreditCard, Globe, Church, BookOpen, Users, Shield, Check, CheckCircle, AlertCircle } from 'lucide-react';
import { ministryInfo } from '../mock';
import { donationsAPI, handleAPIError } from '../services/api';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [donationType, setDonationType] = useState('one-time');
  const [selectedCause, setSelectedCause] = useState('general');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationStatus, setDonationStatus] = useState(null);
  const [donationMessage, setDonationMessage] = useState('');

  const donationAmounts = [25, 50, 100, 250, 500];
  
  const causes = [
    { id: 'general', name: 'General Ministry', icon: Heart, description: 'Support all areas of ministry' },
    { id: 'missions', name: 'International Missions', icon: Globe, description: 'Reaching the nations with the Gospel' },
    { id: 'church-planting', name: 'Church Planting', icon: Church, description: 'Establishing new churches worldwide' },
    { id: 'education', name: 'Bible Education', icon: BookOpen, description: 'Training ministers and leaders' },
    { id: 'youth', name: 'Youth Ministry', icon: Users, description: 'Investing in the next generation' }
  ];

  const benefits = [
    'Secure SSL encrypted donations',
    'Tax-deductible receipts provided',
    'Monthly ministry updates',
    'Prayer team coverage',
    'Impact reports and testimonies'
  ];

  const handleDonorInfoChange = (e) => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setDonationStatus(null);
    setDonationMessage('');

    try {
      const donationData = {
        donorName: `${donorInfo.firstName} ${donorInfo.lastName}`,
        email: donorInfo.email,
        amount: selectedAmount,
        currency: 'CAD',
        donationType: donationType === 'one-time' ? 'one-time' : 'monthly',
        cause: selectedCause
      };

      const response = await donationsAPI.createIntent(donationData);
      setDonationStatus('success');
      setDonationMessage(response.message);
      
      // Reset form on success (except amount and cause selection)
      setDonorInfo({
        firstName: '',
        lastName: '',
        email: ''
      });
    } catch (error) {
      setDonationStatus('error');
      setDonationMessage(handleAPIError(error));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="donate" className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-red-600 border-red-200">
            Give & Support
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Partner with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
              Our Mission
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your generous giving helps us reach the nations with the Gospel and transform lives for eternity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Donation Form */}
          <Card className="shadow-2xl border-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <Heart className="mr-3 text-red-600" size={28} />
                Make a Donation
              </h3>

              {/* Success/Error Messages */}
              {donationStatus && (
                <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  donationStatus === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {donationStatus === 'success' ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                  <p className="text-sm">{donationMessage}</p>
                </div>
              )}

              <form onSubmit={handleDonationSubmit} className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Donation Frequency
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setDonationType('one-time')}
                      disabled={isProcessing}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 disabled:cursor-not-allowed ${
                        donationType === 'one-time' 
                          ? 'border-red-600 bg-red-50 text-red-700' 
                          : 'border-slate-200 text-slate-600 hover:border-red-300'
                      }`}
                    >
                      One-time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setDonationType('monthly')}
                      disabled={isProcessing}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 disabled:cursor-not-allowed ${
                        donationType === 'monthly' 
                          ? 'border-red-600 bg-red-50 text-red-700' 
                          : 'border-slate-200 text-slate-600 hover:border-red-300'
                      }`}
                    >
                      Monthly Giving
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Donation Amount (CAD)
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setSelectedAmount(amount)}
                        disabled={isProcessing}
                        className={`py-3 px-4 rounded-lg border-2 font-medium transition-all duration-300 disabled:cursor-not-allowed ${
                          selectedAmount === amount 
                            ? 'border-red-600 bg-red-600 text-white' 
                            : 'border-slate-200 text-slate-600 hover:border-red-300'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <span className="text-slate-600 mr-2">$</span>
                    <input
                      type="number"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(Number(e.target.value))}
                      disabled={isProcessing}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Enter custom amount"
                      min="1"
                    />
                  </div>
                </div>

                {/* Cause Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Choose a Cause
                  </label>
                  <div className="space-y-3">
                    {causes.map((cause) => {
                      const IconComponent = cause.icon;
                      return (
                        <button
                          key={cause.id}
                          type="button"
                          onClick={() => setSelectedCause(cause.id)}
                          disabled={isProcessing}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 disabled:cursor-not-allowed ${
                            selectedCause === cause.id 
                              ? 'border-red-600 bg-red-50' 
                              : 'border-slate-200 hover:border-red-300'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <IconComponent 
                              className={`mt-1 ${
                                selectedCause === cause.id ? 'text-red-600' : 'text-slate-400'
                              }`} 
                              size={20} 
                            />
                            <div>
                              <p className={`font-medium ${
                                selectedCause === cause.id ? 'text-red-700' : 'text-slate-700'
                              }`}>
                                {cause.name}
                              </p>
                              <p className="text-sm text-slate-500">{cause.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Donor Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={donorInfo.firstName}
                    onChange={handleDonorInfoChange}
                    required
                    disabled={isProcessing}
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={donorInfo.lastName}
                    onChange={handleDonorInfoChange}
                    required
                    disabled={isProcessing}
                    className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="Last Name"
                  />
                </div>

                <input
                  type="email"
                  name="email"
                  value={donorInfo.email}
                  onChange={handleDonorInfoChange}
                  required
                  disabled={isProcessing}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed"
                  placeholder="Email Address"
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isProcessing}
                  className="w-full bg-red-600 hover:bg-red-700 text-white disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2" size={20} />
                      Donate ${selectedAmount} {donationType === 'monthly' ? 'Monthly' : 'Now'}
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <Shield size={16} />
                  <span>Secure payment processing</span>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Impact & Information */}
          <div className="space-y-8">
            {/* Impact Stats */}
            <Card className="shadow-lg border-l-4 border-l-red-600">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Your Impact</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">$25</span>
                    </div>
                    <p className="text-slate-600">Provides Bibles for 5 new believers</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">$50</span>
                    </div>
                    <p className="text-slate-600">Supports a missionary for one week</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">$100</span>
                    </div>
                    <p className="text-slate-600">Funds ministry training materials</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">$250</span>
                    </div>
                    <p className="text-slate-600">Helps plant a new church</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Partnership Benefits</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-green-100 w-6 h-6 rounded-full flex items-center justify-center">
                        <Check className="text-green-600" size={14} />
                      </div>
                      <p className="text-slate-600">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scripture */}
            <Card className="bg-gradient-to-br from-blue-800 to-blue-900 text-white shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-4">God's Promise</h3>
                <p className="text-blue-100 italic mb-4 text-lg">
                  "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap."
                </p>
                <p className="text-blue-200 font-medium">- Luke 6:38</p>
              </CardContent>
            </Card>

            {/* Other Ways to Give */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Other Ways to Give</h3>
                <div className="space-y-3 text-sm">
                  <p><strong>Bank Transfer:</strong> Contact us for banking details</p>
                  <p><strong>Check:</strong> Mail to our headquarters address</p>
                  <p><strong>Stock/Assets:</strong> Call {ministryInfo.contact.phone}</p>
                  <p><strong>International:</strong> PayPal available</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;