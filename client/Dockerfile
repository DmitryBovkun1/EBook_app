# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the app source code into the container
COPY . .

# Build the application
RUN npm run build

# Command to run the app
CMD ["npm", "start"]
