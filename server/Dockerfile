# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the server source code into the container
COPY . .

# Expose port 3001
EXPOSE 3001

# Command to run the server
CMD ["node", "index.js"]
