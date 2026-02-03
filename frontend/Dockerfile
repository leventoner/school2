# Stage 1: Build the Angular app
FROM node:20-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine

COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html
# Some versions of Angular build directly to dist/frontend, check which one it is.
# If /app/dist/frontend/browser doesn't exist, it might be /app/dist/frontend

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
