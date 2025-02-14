# Stage 1: Build the Vite React App
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package files first (to use Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# ✅ Build the Vite app
RUN npm run build

# Stage 2: Serve the App with Nginx
FROM nginx:alpine

# Remove the default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# ✅ Copy the custom Nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# ✅ Copy Vite build output (`dist/` instead of `build/`)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
