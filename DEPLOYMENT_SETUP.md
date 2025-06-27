# Deployment Setup Guide

## Frontend (Vercel) Environment Variables

Set these environment variables in your Vercel project settings:

```
VITE_API_URL=https://your-app-name.onrender.com
```

Replace `your-app-name` with your actual Render app name.

## Backend (Render) Environment Variables

Set these environment variables in your Render project settings:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=https://your-vercel-app.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## OAuth Configuration Updates

### Google OAuth
1. Go to Google Cloud Console
2. Update your OAuth 2.0 client credentials
3. Add these authorized redirect URIs:
   - `https://your-app-name.onrender.com/api/auth/google/callback`

### GitHub OAuth
1. Go to GitHub Developer Settings
2. Update your OAuth App
3. Add this callback URL:
   - `https://your-app-name.onrender.com/api/auth/github/callback`

## Steps to Deploy

1. **Backend (Render)**:
   - Connect your GitHub repository
   - Set environment variables
   - Deploy

2. **Frontend (Vercel)**:
   - Connect your GitHub repository
   - Set `VITE_API_URL` environment variable
   - Deploy

3. **Test Authentication**:
   - Try logging in with email/password
   - Try OAuth login (Google/GitHub)

## Common Issues

- **CORS errors**: Make sure `FRONTEND_URL` in backend matches your Vercel URL
- **OAuth errors**: Update callback URLs in Google/GitHub OAuth settings
- **Database connection**: Ensure `MONGO_URI` is correct and accessible 