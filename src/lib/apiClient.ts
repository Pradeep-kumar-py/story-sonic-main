import { BASE_URI } from '@/lib/constant';

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = BASE_URI;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('accessToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      // Handle no content responses
      if (response.status === 204) {
        return {} as T;
      }

      return response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  private async authenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const authHeaders = this.getAuthHeaders();
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        ...authHeaders,
      },
    });
  }

  // Public methods
  async get<T>(endpoint: string, authenticated = false): Promise<T> {
    return authenticated
      ? this.authenticatedRequest<T>(endpoint, { method: 'GET' })
      : this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    authenticated = false
  ): Promise<T> {
    const options: RequestInit = {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    };

    return authenticated
      ? this.authenticatedRequest<T>(endpoint, options)
      : this.request<T>(endpoint, options);
  }

  async put<T>(
    endpoint: string,
    data?: any,
    authenticated = false
  ): Promise<T> {
    const options: RequestInit = {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    };

    return authenticated
      ? this.authenticatedRequest<T>(endpoint, options)
      : this.request<T>(endpoint, options);
  }

  async delete<T>(endpoint: string, authenticated = true): Promise<T> {
    return this.authenticatedRequest<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
