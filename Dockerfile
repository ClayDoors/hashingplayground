# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Install system dependencies and additional libraries for MuPDF
RUN apt-get update && \
    apt-get install -y python3 python3-pip ghostscript libjpeg-turbo-progs git build-essential \
    libjpeg-dev zlib1g-dev xorg-dev libxcursor-dev libxrandr-dev libxinerama-dev \
    mesa-common-dev libgl1-mesa-dev libglu1-mesa-dev liblcms2-dev && \
    rm -rf /var/lib/apt/lists/*

# Clone and build MuPDF (command-line tools only, skipping GUI/OpenGL viewer)
RUN git clone https://github.com/ArtifexSoftware/mupdf.git /tmp/mupdf && \
    cd /tmp/mupdf && \
    make HAVE_X11=no HAVE_GLUT=no && \
    make HAVE_X11=no HAVE_GLUT=no prefix=/usr/local install && \
    rm -rf /tmp/mupdf

# Copy package.json and package-lock.json to install Node.js dependencies
COPY package*.json ./

# Run the build script to install dependencies and create necessary directories
RUN npm run build

# Copy application code to the container
COPY . .

# Install Python dependencies
RUN pip3 install Pillow --break-system-packages

# Set the environment variable for the port
ENV PORT=4450

# Expose the port
EXPOSE 4450

# Start the application
CMD ["npm", "start"]
