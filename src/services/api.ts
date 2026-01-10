import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  logout: () => api.post('/auth/logout'),
};

// Profile endpoints
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (profileData: {
    allergies: string[];
    conditions: string[];
    dietaryPreference: string;
  }) => api.put('/profile', profileData),
};

// Food analysis endpoints
export const analysisAPI = {
  uploadImage: (formData: FormData) =>
    api.post('/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getHistory: () => api.get('/analysis/history'),
  getAnalysis: (id: string) => api.get(`/analysis/${id}`),
};

export default api;
