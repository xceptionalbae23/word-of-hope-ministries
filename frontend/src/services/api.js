import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Contact API
export const contactAPI = {
  submit: async (formData) => {
    const response = await apiClient.post('/contact', formData);
    return response.data;
  },
  
  getSubmissions: async () => {
    const response = await apiClient.get('/contact');
    return response.data;
  }
};

// Newsletter API
export const newsletterAPI = {
  subscribe: async (email) => {
    const response = await apiClient.post('/newsletter/subscribe', { email });
    return response.data;
  },
  
  unsubscribe: async (email) => {
    const response = await apiClient.post('/newsletter/unsubscribe', { email });
    return response.data;
  }
};

// Events API
export const eventsAPI = {
  getEvents: async () => {
    const response = await apiClient.get('/events');
    return response.data;
  },
  
  register: async (registrationData) => {
    const response = await apiClient.post('/events/register', registrationData);
    return response.data;
  }
};

// Donations API
export const donationsAPI = {
  createIntent: async (donationData) => {
    const response = await apiClient.post('/donations/intent', donationData);
    return response.data;
  },
  
  getStats: async () => {
    const response = await apiClient.get('/donations/stats');
    return response.data;
  }
};

// Prayer Requests API
export const prayerAPI = {
  submit: async (prayerData) => {
    const response = await apiClient.post('/prayer-requests', prayerData);
    return response.data;
  },
  
  getRequests: async (includePrivate = false) => {
    const response = await apiClient.get('/prayer-requests', {
      params: { include_private: includePrivate }
    });
    return response.data;
  }
};

// Content API
export const contentAPI = {
  getMinistryInfo: async () => {
    const response = await apiClient.get('/ministry-info');
    return response.data;
  },
  
  getSermons: async () => {
    const response = await apiClient.get('/sermons');
    return response.data;
  },
  
  getBlogPosts: async () => {
    const response = await apiClient.get('/blog-posts');
    return response.data;
  }
};

// Utility function to handle API errors
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.detail || error.response.data?.message || 'Server error occurred';
    return message;
  } else if (error.request) {
    // Request was made but no response
    return 'Unable to connect to server. Please check your internet connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

export default apiClient;