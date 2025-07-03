#!/bin/bash

echo "🔍 Testing your deployment..."

echo ""
echo "1. Testing Backend Health Check..."
BACKEND_RESPONSE=$(curl -s https://codefromscratch.onrender.com/api/health)
if [[ $BACKEND_RESPONSE == *"OK"* ]]; then
    echo "✅ Backend is working!"
    echo "Response: $BACKEND_RESPONSE"
else
    echo "❌ Backend is not responding correctly"
    echo "Response: $BACKEND_RESPONSE"
fi

echo ""
echo "2. Testing Frontend..."
FRONTEND_RESPONSE=$(curl -s -I https://codefromscratch.vercel.app | head -1)
if [[ $FRONTEND_RESPONSE == *"200"* ]]; then
    echo "✅ Frontend is working!"
else
    echo "❌ Frontend is not responding correctly"
    echo "Response: $FRONTEND_RESPONSE"
fi

echo ""
echo "3. Testing CORS..."
CORS_RESPONSE=$(curl -s -H "Origin: https://codefromscratch.vercel.app" -I https://codefromscratch.onrender.com/api/health | grep -i "access-control-allow-origin")
if [[ $CORS_RESPONSE == *"codefromscratch.vercel.app"* ]]; then
    echo "✅ CORS is configured correctly!"
else
    echo "❌ CORS might not be configured correctly"
    echo "Response: $CORS_RESPONSE"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Set environment variables in Render (see RENDER_ENV_SETUP.md)"
echo "2. Update OAuth callback URLs"
echo "3. Test authentication on your website" 