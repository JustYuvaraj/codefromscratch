# Render Environment Variables Setup Guide

## Step-by-Step Instructions

### 1. Go to Render Dashboard
- Visit: https://dashboard.render.com
- Click on your backend app: `codefromscratch`

### 2. Navigate to Environment Tab
- Click on the **Environment** tab in your app dashboard

### 3. Add These Environment Variables

#### Required Variables:
```
Key: MONGO_URI
Value: mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?retryWrites=true&w=majority
```

```
Key: JWT_SECRET
Value: your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters
```

```
Key: FRONTEND_URL
Value: https://codefromscratch.vercel.app
```

```
Key: NODE_ENV
Value: production
```

#### OAuth Variables (since you have Google and GitHub set up):
```
Key: GOOGLE_CLIENT_ID
Value: your_google_client_id_from_google_cloud_console
```

```
Key: GOOGLE_CLIENT_SECRET
Value: your_google_client_secret_from_google_cloud_console
```

```
Key: GITHUB_CLIENT_ID
Value: your_github_client_id_from_github_developer_settings
```

```
Key: GITHUB_CLIENT_SECRET
Value: your_github_client_secret_from_github_developer_settings
```

### 4. Save and Redeploy
- Click **Save Changes**
- Render will automatically redeploy your app

### 5. Update OAuth Callback URLs

#### Google OAuth:
- Go to: https://console.cloud.google.com
- Find your OAuth 2.0 client
- Add this authorized redirect URI:
  ```
  https://codefromscratch.onrender.com/api/auth/google/callback
  ```

#### GitHub OAuth:
- Go to: https://github.com/settings/developers
- Click on your OAuth App
- Update the callback URL to:
  ```
  https://codefromscratch.onrender.com/api/auth/github/callback
  ```

### 6. Test the Connection
After deployment, test with:
```bash
curl https://codefromscratch.onrender.com/api/health
```

You should get a JSON response like:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Common Issues:
- ❌ Don't use `localhost` in production
- ❌ Don't use `CLIENT_URL` (use `FRONTEND_URL` instead)
- ✅ Use your actual Vercel URL: `https://codefromscratch.vercel.app`
- ✅ Use your actual Render URL: `https://codefromscratch.onrender.com` 