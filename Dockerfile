FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build


FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/xlock-app.conf
COPY --from=builder --chown=www-data:www-data /app/dist /usr/share/nginx/html
RUN chmod 777 -R /usr/share/nginx/html/assets
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]