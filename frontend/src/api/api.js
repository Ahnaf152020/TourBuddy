import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor to attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function for handling API errors
const handleApiError = (error) => {
  if (error.response) {
    throw error.response.data;
  } else {
    throw new Error("Network error. Please try again.");
  }
};

// Register user
export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Logout user
export const logout = async () => {
  try {
    await api.post("/logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
  } catch (error) {
    handleApiError(error);
  }
};

// Register tour guide
export const registerTourGuide = async (tourGuideData) => {
  try {
    const response = await api.post("/tour_guides/register", tourGuideData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Login tour guide
export const loginTourGuide = async (credentials) => {
  try {
    const response = await api.post("/tour_guides/login", credentials);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);
    }
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Logout tour guide
export const logoutTourGuide = async () => {
  try {
    await api.post("/tour_guides/logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
  } catch (error) {
    handleApiError(error);
  }
};

// Get stored user role
export const getUserRole = () => localStorage.getItem("userRole") || null;

// Fetch all tour guides
export const getTourGuides = async () => {
  try {
    const response = await api.get("/tour_guides");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Fetch all packages
export const getPackages = async () => {
  try {
    const response = await api.get("/package");
    return response.data.packages;
  } catch (error) {
    handleApiError(error);
  }
};

// Create a package
export const createPackage = async (packageData) => {
  try {
    const response = await api.post("/package", packageData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Update a package
export const updatePackage = async (id, packageData) => {
  try {
    const response = await api.put(`/package/${id}`, packageData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Delete a package
export const deletePackage = async (id) => {
  try {
    const response = await api.delete(`/package/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export default api;

