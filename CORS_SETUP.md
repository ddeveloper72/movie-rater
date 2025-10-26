# CORS Configuration for Django Backend

To ensure your Angular frontend can communicate with your Django backend, you need to configure CORS (Cross-Origin Resource Sharing) properly.

## Required Django Configuration

### 1. Install django-cors-headers

```bash
pip install django-cors-headers
```

### 2. Add to INSTALLED_APPS in settings.py

```python
INSTALLED_APPS = [
    # ... other apps
    'corsheaders',
    # ... rest of your apps
]
```

### 3. Add CORS Middleware in settings.py

```python
MIDDLEWARE = [
    # ... other middleware
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... rest of middleware
]
```

### 4. Configure CORS Settings in settings.py

For development, add:

```python
# CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

# Or for development only (less secure):
# CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
```

### 5. For Production

Update `CORS_ALLOWED_ORIGINS` to include your production domain:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",  # Development
    "http://127.0.0.1:4200",  # Development
    "https://your-angular-app.com",  # Production
    "https://angular-movie-rater.web.app",  # Your deployed app
]
```

## Testing CORS

After configuring CORS, restart your Django server and test:

1. Start Django backend: `python manage.py runserver`
2. Start Angular frontend: `ng serve`
3. Open browser to `http://localhost:4200`
4. Check browser console for CORS errors

## Common CORS Issues

1. **Missing trailing slashes**: Ensure Django URLs have trailing slashes
2. **Wrong origin**: Check that localhost:4200 is in allowed origins
3. **Missing headers**: Ensure 'authorization' is in allowed headers
4. **Credentials**: Set `CORS_ALLOW_CREDENTIALS = True` for token auth

## Testing CORS from Command Line

```bash
# Test if CORS headers are present
curl -H "Origin: http://localhost:4200" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Authorization" \
     -X OPTIONS \
     http://127.0.0.1:8000/api/movies/
```

You should see CORS headers in the response.