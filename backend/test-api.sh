#!/bin/bash

# Test script for TaskBoard Authentication API
# Make sure the server is running on port 3001 before running this script

echo "🧪 Testing TaskBoard Authentication API"
echo "======================================="

# Test health check
echo -e "\n1. Testing health check endpoint..."
curl -s http://localhost:3001/ | jq '.' || echo "Health check failed"

# Test signup
echo -e "\n2. Testing signup endpoint..."
SIGNUP_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}')

echo "$SIGNUP_RESPONSE" | jq '.' || echo "Signup failed"

# Extract token from signup response
TOKEN=$(echo "$SIGNUP_RESPONSE" | jq -r '.token' 2>/dev/null)

# Test login
echo -e "\n3. Testing login endpoint..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}')

echo "$LOGIN_RESPONSE" | jq '.' || echo "Login failed"

# Test protected profile route
if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
  echo -e "\n4. Testing protected profile endpoint..."
  curl -s -X GET http://localhost:3001/api/auth/profile \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" | jq '.' || echo "Profile request failed"
else
  echo -e "\n4. Skipping profile test - no token available"
fi

echo -e "\n✅ Tests completed!"