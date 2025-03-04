# Use Official Node.js Image
FROM node:18-alpine 

# Set Working Directory inside Container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy All Project Files into Container
COPY . .

# Expose Port 5000
EXPOSE 5000

# Start the Application
CMD ["npm", "run", "dev"]
