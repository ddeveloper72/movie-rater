# Movie Rater Frontend - Backend Integration Guide

## Current Configuration

This Angular frontend is now configured to work with your Django MovieRaterApi backend.

### Environment Configuration

- **Development**: `http://127.0.0.1:8000/` (local Django server)
- **Production**: `https://ddeveloper72-movie-rater-api.herokuapp.com/` (Heroku deployment)

### API Endpoints Used

The frontend expects these endpoints from your Django backend:

1. **Authentication**
   - `POST /auth/` - User login (expects `{username, password}`, returns `{token}`)
   - `POST /api/users/` - User registration

2. **Movies**
   - `GET /api/movies/` - List all movies
   - `GET /api/movies/{id}/` - Get specific movie
   - `POST /api/movies/` - Create new movie
   - `PUT /api/movies/{id}/` - Update movie
   - `DELETE /api/movies/{id}/` - Delete movie
   - `POST /api/movies/{id}/rate_movie/` - Rate a movie (expects `{stars}`)

3. **Users**
   - `GET /api/users/` - List users (admin only)

### Required Backend Configuration

Your Django backend should have:

1. **CORS Settings** - Allow requests from `http://localhost:4200` (Angular dev server)
2. **Token Authentication** - Django REST framework token authentication
3. **Proper Serializers** - JSON responses matching the frontend models

### Frontend Models

The frontend expects these data structures:

**Movie Model**:
```typescript
{
  id: number;
  title: string;
  description: string;
  imagePath: string;
  ave_ratings: number;
  no_of_ratings: number;
}
```

**User Model**:
```typescript
{
  id?: number;
  username: string;
  password: string;
  token?: string;
}
```

### Authentication Flow

1. User enters credentials in frontend
2. Frontend sends POST to `/auth/` with `{username, password}`
3. Backend returns `{token}` 
4. Frontend stores token in localStorage
5. Subsequent requests include `Authorization: Token <token>` header

### Testing Connectivity

Run the test script to check if your backend is accessible:

```bash
node test-backend-connection.js
```

### Development Setup

1. Start your Django backend: `python manage.py runserver`
2. Start Angular frontend: `ng serve`
3. Navigate to `http://localhost:4200`

### Production Deployment

The frontend is configured to automatically use the Heroku URL in production builds.

### Common Issues

1. **CORS Errors**: Ensure Django has `django-cors-headers` installed and configured
2. **Authentication Errors**: Check token format and expiration handling
3. **404 Errors**: Verify all API endpoints have trailing slashes in Django URLs
4. **Network Errors**: Ensure backend is running and accessible

### Next Steps

1. Verify your Django backend has all required endpoints
2. Test authentication flow
3. Ensure CORS is properly configured
4. Test movie CRUD operations
5. Verify rating system works correctly