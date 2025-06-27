# 🚀 Step-by-Step Deployment Guide

## Step 1: MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/atlas
2. Click "Try Free"
3. Fill in your details and create account

### 1.2 Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider (AWS/Google Cloud/Azure)
4. Select region (closest to you)
5. Click "Create"

### 1.3 Set Up Database Access
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `codefromscratch`
4. Password: Create a strong password (save it!)
5. Select "Read and write to any database"
6. Click "Add User"

### 1.4 Set Up Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go back to "Database" tab
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `codefromscratch`

**Your connection string will look like:**
```
mongodb+srv://codefromscratch:yourpassword@cluster0.xxxxx.mongodb.net/codefromscratch
```

---

## Step 2: Render (Backend)

### 2.1 Create Render Account
1. Go to: https://render.com
2. Click "Get Started"
3. Sign up with GitHub

### 2.2 Deploy Backend
1. Click "New" → "Web Service"
2. Connect your GitHub repository: `JustYuvaraj/codefromscratch`
3. Configure the service:
   - **Name**: `codefromscratch-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2.3 Add Environment Variables
Click "Environment" tab and add:
```
MONGO_URI=mongodb+srv://codefromscratch:yourpassword@cluster0.xxxxx.mongodb.net/codefromscratch
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL (e.g., `https://codefromscratch-backend.onrender.com`)

---

## Step 3: Vercel (Frontend)

### 3.1 Create Vercel Account
1. Go to: https://vercel.com
2. Click "Continue with GitHub"
3. Authorize Vercel

### 3.2 Deploy Frontend
1. Click "New Project"
2. Import your repository: `JustYuvaraj/codefromscratch`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Add Environment Variable
Add this environment variable:
```
VITE_API_URL=https://your-render-backend-url.onrender.com
```

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Copy your frontend URL

---

## Step 4: Update Backend with Frontend URL

### 4.1 Update Render Environment Variable
1. Go back to Render dashboard
2. Click on your backend service
3. Go to "Environment" tab
4. Update `FRONTEND_URL` with your Vercel URL
5. Click "Save Changes"
6. Service will automatically redeploy

---

## Step 5: Test Your Deployment

### 5.1 Test Frontend
- Visit your Vercel URL
- Navigate to `/dsa-plan`
- Check if DSA plan loads

### 5.2 Test Backend API
- Visit: `https://your-backend.onrender.com/api/dsa/plan`
- Should return JSON data

### 5.3 Test Database
- Check if problems can be marked as solved
- Progress should be saved

---

## Troubleshooting

### Common Issues:

1. **CORS Error**
   - Make sure `FRONTEND_URL` in backend matches your Vercel URL exactly

2. **Database Connection Error**
   - Check if MongoDB password is correct
   - Verify IP whitelist includes `0.0.0.0/0`

3. **Environment Variables Not Working**
   - Redeploy after adding environment variables
   - Check variable names are exact (case-sensitive)

4. **Build Failures**
   - Check if all dependencies are in package.json
   - Verify build commands are correct

---

## Your Live URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **DSA Plan**: `https://your-app.vercel.app/dsa-plan`

---

## Need Help?

If you encounter any issues:
1. Check the deployment logs in Render/Vercel
2. Verify all environment variables are set
3. Test API endpoints directly
4. Check browser console for errors 