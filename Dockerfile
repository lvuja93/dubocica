# Dockerfile

# 1. Base image
FROM node:24-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the app
COPY . .

# 5. Build the app
RUN npm run build

# 6. Expose port and run
EXPOSE 3000
CMD ["npm", "start"]
