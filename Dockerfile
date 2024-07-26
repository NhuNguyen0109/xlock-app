# node image
FROM node:20-alpine

# set the working directory
WORKDIR /app

# copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of project
COPY . . 

# Build the application 
RUN npm run build

# Use an official nginx image to serve the static files
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]