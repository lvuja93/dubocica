import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// (opciono) globalni error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.error || err?.message || 'Network/Server error';
    return Promise.reject(new Error(msg));
  }
);
