import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Mail, 
  Heart, 
  Calendar, 
  MessageSquare, 
  Upload, 
  BarChart3, 
  LogOut,
  FileImage,
  FileVideo,
  FileAudio,
  BookOpen,
  Eye,
  Download,
  Trash2
} from 'lucide-react';
import { handleAPIError } from '../services/api';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = ({ onLogout }) => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard stats
      const statsResponse = await axios.get(`${API}/admin/dashboard`);
      setDashboardStats(statsResponse.data);
      
      // Load all data based on active tab
      if (activeTab === 'contacts') {
        const contactsResponse = await axios.get(`${API}/admin/contacts`);
        setContacts(contactsResponse.data);
      } else if (activeTab === 'donations') {
        const donationsResponse = await axios.get(`${API}/admin/donations`);
        setDonations(donationsResponse.data);
      }
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTabData = async (tab) => {
    try {
      setLoading(true);
      let response;
      
      switch (tab) {
        case 'contacts':
          response = await axios.get(`${API}/admin/contacts`);
          setContacts(response.data);
          break;
        case 'donations':
          response = await axios.get(`${API}/admin/donations`);
          setDonations(response.data);
          break;
        case 'subscribers':
          response = await axios.get(`${API}/admin/subscribers`);
          setSubscribers(response.data);
          break;
        case 'registrations':
          response = await axios.get(`${API}/admin/registrations`);
          setRegistrations(response.data);
          break;
        case 'prayers':
          response = await axios.get(`${API}/admin/prayer-requests`);
          setPrayers(response.data);
          break;
      }
    } catch (error) {
      console.error(`Error loading ${tab} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadTabData(tab);
  };

  const DashboardOverview = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-800">
                  {dashboardStats?.contacts?.total || 0}
                </p>
                <p className="text-slate-600">Total Contacts</p>
                {dashboardStats?.contacts?.new > 0 && (
                  <Badge variant="outline" className="mt-1 text-green-700 border-green-200">
                    {dashboardStats.contacts.new} new
                  </Badge>
                )}
              </div>
              <Mail className="text-blue-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-800">
                  ${dashboardStats?.donations?.total || 0}
                </p>
                <p className="text-slate-600">Total Donations</p>
                <Badge variant="outline" className="mt-1 text-green-700 border-green-200">
                  {dashboardStats?.donations?.count || 0} donations
                </Badge>
              </div>
              <Heart className="text-green-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-800">
                  {dashboardStats?.subscribers || 0}
                </p>
                <p className="text-slate-600">Newsletter Subscribers</p>
              </div>
              <Users className="text-purple-600" size={32} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-800">
                  {dashboardStats?.registrations || 0}
                </p>
                <p className="text-slate-600">Event Registrations</p>
              </div>
              <Calendar className="text-amber-600" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="text-blue-600" size={20} />
              <div className="flex-1">
                <p className="text-slate-800 font-medium">New contact submission</p>
                <p className="text-slate-600 text-sm">Someone reached out through the contact form</p>
              </div>
              <Badge variant="outline" className="text-blue-600">New</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Heart className="text-green-600" size={20} />
              <div className="flex-1">
                <p className="text-slate-800 font-medium">New donation received</p>
                <p className="text-slate-600 text-sm">Ministry support donation processed</p>
              </div>
              <Badge variant="outline" className="text-green-600">Recent</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ContactsTable = () => (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Contact Submissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 text-slate-600">Name</th>
                <th className="text-left p-3 text-slate-600">Email</th>
                <th className="text-left p-3 text-slate-600">Subject</th>
                <th className="text-left p-3 text-slate-600">Type</th>
                <th className="text-left p-3 text-slate-600">Date</th>
                <th className="text-left p-3 text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-800">{contact.name}</td>
                  <td className="p-3 text-slate-600">{contact.email}</td>
                  <td className="p-3 text-slate-600">{contact.subject}</td>
                  <td className="p-3">
                    <Badge variant="outline">{contact.requestType}</Badge>
                  </td>
                  <td className="p-3 text-slate-600">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const DonationsTable = () => (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Donations</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 text-slate-600">Donor</th>
                <th className="text-left p-3 text-slate-600">Amount</th>
                <th className="text-left p-3 text-slate-600">Type</th>
                <th className="text-left p-3 text-slate-600">Cause</th>
                <th className="text-left p-3 text-slate-600">Date</th>
                <th className="text-left p-3 text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-medium text-slate-800">{donation.donorName}</td>
                  <td className="p-3 text-slate-600">${donation.amount} {donation.currency}</td>
                  <td className="p-3">
                    <Badge variant="outline">{donation.donationType}</Badge>
                  </td>
                  <td className="p-3 text-slate-600">{donation.cause}</td>
                  <td className="p-3 text-slate-600">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <Badge 
                      variant={donation.paymentStatus === 'completed' ? 'default' : 'secondary'}
                      className={donation.paymentStatus === 'completed' ? 'bg-green-600' : ''}
                    >
                      {donation.paymentStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const MediaUpload = () => {
    const [uploadType, setUploadType] = useState('image');
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);
      formData.append('description', `Uploaded ${uploadType} file`);

      try {
        const response = await axios.post(`${API}/admin/upload/${uploadType}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert(`${uploadType} uploaded successfully!`);
      } catch (error) {
        alert(`Failed to upload ${uploadType}: ${handleAPIError(error)}`);
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Upload Media</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Type
                </label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Choose File
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept={uploadType === 'image' ? 'image/*' : uploadType === 'video' ? 'video/*' : 'audio/*'}
                  className="w-full p-3 border border-slate-300 rounded-lg"
                  disabled={uploading}
                />
              </div>

              {uploading && (
                <div className="text-center">
                  <div className="inline-flex items-center">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Uploading {uploadType}...
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (loading && !dashboardStats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">WOHI Admin Dashboard</h1>
              <p className="text-slate-600">Ministry Management Portal</p>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">
              <BarChart3 size={16} className="mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="contacts">
              <Mail size={16} className="mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="donations">
              <Heart size={16} className="mr-2" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="subscribers">
              <Users size={16} className="mr-2" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="prayers">
              <MessageSquare size={16} className="mr-2" />
              Prayers
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload size={16} className="mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactsTable />
          </TabsContent>

          <TabsContent value="donations">
            <DonationsTable />
          </TabsContent>

          <TabsContent value="subscribers">
            <div className="text-center py-8">
              <p className="text-slate-600">Subscribers data will be loaded here</p>
            </div>
          </TabsContent>

          <TabsContent value="prayers">
            <div className="text-center py-8">
              <p className="text-slate-600">Prayer requests will be displayed here</p>
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <MediaUpload />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;