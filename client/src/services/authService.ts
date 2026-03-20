import api from "./api";

type AuthUser = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

// API functions for authentication
export const authService = {
  // Login user
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Register user
  register: async (name: string, email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/register", { name, email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
  },
};
