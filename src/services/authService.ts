import { BASE_URI } from '@/lib/constant';
import { User } from '@/contexts/AuthContext';

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  user: User;
  accessToken: string;
}

class AuthService {
  private getHeaders(includeAuth = false) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${BASE_URI}/api/user/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    const response = await fetch(`${BASE_URI}/api/user/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    const response = await fetch(`${BASE_URI}/api/user/logout`, {
      method: 'POST',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed');
    }
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const response = await fetch(`${BASE_URI}/api/user/refresh-token`, {
      method: 'POST',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Token refresh failed');
    }

    return response.json();
  }

  async resendEmail(email: string): Promise<void> {
    const response = await fetch(`${BASE_URI}/api/user/resend-email`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to resend email');
    }
  }

  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URI}/api/user/getalluser`, {
      method: 'GET',
      headers: this.getHeaders(true),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch users');
    }

    return response.json();
  }
}

export const authService = new AuthService();
