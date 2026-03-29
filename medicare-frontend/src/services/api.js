import axios from 'axios';

const API_BASE_URL = 'https://ttdeployment-r2ah.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// USER
export const loginUser = async (data) => {
  const res = await api.post('/users/login', data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await api.post('/users/register', data);
  return res.data;
};

// REMINDERS
export const addReminder = (data) => api.post('/reminders/add', data);
export const getUserReminders = (userId) =>
  api.get(`/reminders/user/${userId}`);

// MEDICINES
export const addMedicine = (data) => api.post('/medicines/add', data);
export const getUserMedicines = (userId) =>
  api.get(`/medicines/user/${userId}`);
export const deleteMedicine = (id) =>
  api.delete(`/medicines/${id}`);

// HEALTH
export const addHealthRecord = (data) =>
  api.post('/health/add', data);

export const getUserHealthRecords = (userId) =>
  api.get(`/health/user/${userId}`);

export default api;