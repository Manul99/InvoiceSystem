# Stage 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies needed by some npm packages
RUN apk add --no-cache python3 make g++ bash

COPY package*.json ./

# Install dependencies, ignoring peer conflicts
RUN npm install --legacy-peer-deps

COPY . .

# Build Angular app in production mode
RUN npm run build -- --configuration production

# Stage 2: Serve app with nginx
FROM nginx:stable-alpine

# Copy built Angular app from build stage
COPY --from=build /app/dist/invoice-app /usr/share/nginx/html

# Expose port 80 for nginx
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
