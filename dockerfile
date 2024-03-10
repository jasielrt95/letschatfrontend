# Build stage
FROM node:18-alpine as build-stage

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app
RUN npm run build
