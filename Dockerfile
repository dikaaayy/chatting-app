# Build stage
FROM node:18-alpine AS build

# Set working directory to the project root
WORKDIR /app

# Copy package.json and package-lock.json (if it exists) from the root directory
COPY package*.json ./

# Install dependencies
RUN if [ -f package-lock.json ]; then npm ci; \
    else npm install; \
    fi

# Copy the backend folder
COPY server ./server

# Copy any other necessary files from the root (e.g., .env)
# COPY .env ./

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built node modules and backend files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server ./server

# Set NODE_ENV to production
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "server/index.js"]
