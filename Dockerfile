# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip ghostscript libturbojpeg && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to install Node.js dependencies
COPY package*.json ./

# Run the build script to install dependencies and create necessary directories
RUN npm run build

# Copy application code to the container
COPY . .

# Install Python dependencies
RUN pip3 install Pillow

# Set the environment variable for the port
ENV PORT=4450

# Expose the port
EXPOSE 4450

# Start the application
CMD ["npm", "start"]
