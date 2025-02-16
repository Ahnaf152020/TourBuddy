import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  console.log("Retrieved Token from localStorage:", token); // Debugging

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register user
export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    console.log("API Response:", response.data); // Debugging

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role); // Store role in localStorage
      console.log("Token stored:", response.data.token);
      console.log("Role stored:", response.data.role);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await api.post("/logout");
    localStorage.removeItem("authToken"); // Remove token on logout
    localStorage.removeItem("userRole"); // Remove role on logout
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register tour guide
export const registerTourGuide = async (tourGuideData) => {
  try {
    const response = await api.post("/tour_guides/register", tourGuideData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login tour guide
export const loginTourGuide = async (credentials) => {
  try {
    const response = await api.post("/tour_guides/login", credentials);
    console.log("API Response:", response.data); // Debugging

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role); // Store role in localStorage
      console.log("Token stored:", response.data.token);
      console.log("Role stored:", response.data.role);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout tour guide
export const logoutTourGuide = async () => {
  try {
    const response = await api.post("/tour_guides/logout");
    localStorage.removeItem("authToken"); // Remove token on logout
    localStorage.removeItem("userRole"); // Remove role on logout
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Function to get stored user role
export const getUserRole = () => {
  return localStorage.getItem("userRole") || null;
};

export default api;
