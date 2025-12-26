FROM node:20.19.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
# We copy to conf.d so it gets included into the main http block automatically
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# DOCUMENTATION FIX: 
# 1. Move PID to /tmp (where we have permission)
# 2. Remove the "user nginx" line which causes the "warn" you saw
# 3. Grant global write access to Nginx's required folders
RUN sed -i 's|/var/run/nginx.pid|/tmp/nginx.pid|g' /etc/nginx/nginx.conf && \
    sed -i '/user  nginx;/d' /etc/nginx/nginx.conf && \
    chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
