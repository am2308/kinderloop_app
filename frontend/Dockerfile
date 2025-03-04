# Use official Node.js image
FROM node:18-alpine 

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy All Project Files into Container
COPY . .

# Build the app
RUN npm run build

# Expose Port 5173 (Vite default port)
EXPOSE 5173

# Start App
CMD ["npm", "run", "dev", "--", "--host"]