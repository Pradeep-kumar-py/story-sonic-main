# Authentication Implementation

This document describes the authentication system implemented for StoryVerse using your Azure backend.

## Overview

The authentication system includes:
- JWT-based authentication with access tokens
- Automatic token refresh
- Protected and public routes
- User context management
- Error handling and loading states

## Backend Integration

Your Azure backend is configured at: `https://bedtimestorybackend.azurewebsites.net`

The following API endpoints are integrated:
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/logout` - User logout
- `POST /api/user/refresh-token` - Token refresh
- `POST /api/user/resend-email` - Resend verification email
- `GET /api/user/getalluser` - Get all users (admin)

## Components Created

### 1. Authentication Context (`src/contexts/AuthContext.tsx`)
- Manages global authentication state
- Provides login, register, logout, and refreshToken functions
- Automatically checks authentication on app startup

### 2. Auth Service (`src/services/authService.ts`)
- Handles all API calls to your backend
- Manages token storage in localStorage
- Provides typed interfaces for API responses

### 3. Protected Routes (`src/components/ProtectedRoute.tsx`)
- `ProtectedRoute`: Requires authentication, redirects to signin
- `PublicRoute`: Redirects authenticated users away (for signin/signup pages)

### 4. Updated Components
- **Header**: Shows user info when logged in, logout option
- **SignIn**: Integrated with auth context, shows loading states
- **SignUp**: Integrated with auth context, form validation
- **App**: Wrapped with AuthProvider and ErrorBoundary

### 5. Utility Components
- **LoadingSpinner**: Reusable loading component
- **ErrorBoundary**: Catches and displays errors gracefully
- **ApiClient**: Centralized API client (optional for future use)
- **Validation**: Form validation utilities

## Usage

### Using Authentication in Components

```tsx
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          Welcome, {user?.name}!
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Please sign in</div>
      )}
    </div>
  );
};
```

### Protected Routes
Routes are automatically protected based on authentication state:
- `/browse`, `/favorites`, `/explore`, `/story/:id` - Require authentication
- `/signin`, `/signup` - Redirect authenticated users to home

### API Calls with Authentication
```tsx
import { authService } from '@/services/authService';

// The service automatically includes authentication headers
const users = await authService.getAllUsers();
```

## Security Features

1. **Automatic Token Refresh**: Tokens are refreshed automatically when they expire
2. **Route Protection**: Sensitive routes require authentication
3. **Token Storage**: Tokens are stored in localStorage
4. **Error Handling**: Graceful error handling for network issues
5. **Loading States**: User-friendly loading indicators

## Environment Setup

Make sure your backend supports CORS for your frontend domain and returns the expected response format:

### Expected Login Response
```json
{
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

### Expected Register Response
```json
{
  "user": {
    "id": "user_id", 
    "name": "User Name",
    "email": "user@example.com"
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:8080`
3. Try creating an account at `/signup`
4. Sign in at `/signin`
5. Test protected routes like `/browse`

## Next Steps

1. **Email Verification**: Implement email verification flow if your backend supports it
2. **Password Reset**: Add forgot password functionality
3. **Profile Management**: Create user profile pages
4. **Remember Me**: Add option to keep users logged in longer
5. **Social Login**: Add Google/Facebook login if needed

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your Azure backend allows requests from your frontend domain
2. **Token Expiry**: The system automatically handles token refresh
3. **Network Errors**: Check if your backend is accessible
4. **Authentication Loops**: Clear localStorage if you encounter infinite redirects

### Debug Mode
Add this to your browser console to debug authentication:
```javascript
localStorage.getItem('accessToken') // Check current token
localStorage.removeItem('accessToken') // Clear token to reset auth state
```
