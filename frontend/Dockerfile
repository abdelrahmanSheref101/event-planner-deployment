# source code build STAGE
FROM node:20.19.0-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# deployment STAGE
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R g+w /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

