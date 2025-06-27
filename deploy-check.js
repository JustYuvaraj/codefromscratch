#!/usr/bin/env node

// Simple deployment checker
// Run this after deployment to verify everything is working

const https = require('https');

console.log('🚀 Checking your deployment...\n');

// Replace these URLs with your actual deployed URLs
const FRONTEND_URL = 'https://your-app.vercel.app';
const BACKEND_URL = 'https://your-backend.onrender.com';

function checkURL(url, description) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ ${description}: ${url}`);
        resolve(true);
      } else {
        console.log(`❌ ${description}: ${url} (Status: ${res.statusCode})`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`❌ ${description}: ${url} (Error: ${err.message})`);
      resolve(false);
    });
  });
}

async function checkDeployment() {
  console.log('📋 Checking URLs...\n');
  
  const results = await Promise.all([
    checkURL(FRONTEND_URL, 'Frontend (Vercel)'),
    checkURL(`${BACKEND_URL}/api/dsa/plan`, 'Backend API (Render)'),
    checkURL(`${FRONTEND_URL}/dsa-plan`, 'DSA Plan Route')
  ]);
  
  console.log('\n📊 Results:');
  const successCount = results.filter(Boolean).length;
  const totalCount = results.length;
  
  if (successCount === totalCount) {
    console.log(`🎉 All ${totalCount} checks passed! Your deployment is working.`);
  } else {
    console.log(`⚠️  ${successCount}/${totalCount} checks passed. Some issues found.`);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if your URLs are correct');
    console.log('2. Verify environment variables are set');
    console.log('3. Check deployment logs in Vercel/Render');
    console.log('4. Ensure MongoDB connection is working');
  }
}

// Instructions
console.log('📝 Instructions:');
console.log('1. Replace the URLs in this file with your actual deployed URLs');
console.log('2. Run: node deploy-check.js');
console.log('3. Check the results below\n');

// Uncomment the line below after updating URLs
// checkDeployment();

console.log('💡 To run the check:');
console.log('1. Edit this file and replace the URLs');
console.log('2. Uncomment the last line');
console.log('3. Run: node deploy-check.js'); 